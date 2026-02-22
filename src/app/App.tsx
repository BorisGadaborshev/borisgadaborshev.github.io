import styled from '@emotion/styled';
import { FC, useMemo, useState } from 'react';
import { useImageUpload } from '@entities/image-upload';
import { FlowStep, ScaledViewport } from '@shared/ui';
import { MainScreen } from '@widgets/main-screen';
import {
  PromptQualityImprovedScreen,
  PromptQualityResultData,
  PromptQualityResultScreen,
  PromptQualityScreen,
} from '@widgets/prompt-quality-screen';
import { PromptScreen } from '@widgets/prompt-screen';
import { PaymentStatusScreen } from '@widgets/payment-screen';
import { AppProviders } from './providers';

const APP_MODE = import.meta.env.VITE_APP_MODE === 'prompt-check' ? 'prompt-check' : 'livpic';
const IS_PROMPT_CHECK_MODE = APP_MODE === 'prompt-check';

const ScreenStack = styled.div`
  position: absolute;
  inset: 0;
`;

const ScreenLayer = styled.div<{ active: boolean; direction: 'forward' | 'back' }>`
  position: absolute;
  inset: 0;
  transition: opacity 280ms ease, transform 280ms ease;
  will-change: opacity, transform;

  opacity: ${({ active }) => (active ? 1 : 0)};
  pointer-events: ${({ active }) => (active ? 'auto' : 'none')};
  transform: ${({ active, direction }) => {
    if (active) return 'translate3d(0, 0, 0)';
    return direction === 'forward'
      ? 'translate3d(-16px, 0, 0)'
      : 'translate3d(16px, 0, 0)';
  }};
`;

const ModalOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 15;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const ModalCard = styled.div`
  width: 353px;
  border-radius: 20px;
  background: rgba(14, 17, 22, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 18px;
  color: #fff;
`;

const ModalTitle = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 18px;
  margin: 0 0 10px 0;
`;

const ModalText = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 14px 0;
`;

const ModalRow = styled.div`
  display: flex;
  gap: 10px;
`;

const ModalButton = styled.button<{ primary?: boolean }>`
  flex: 1;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: ${({ primary }) => (primary ? 'rgba(32, 121, 204, 0.25)' : 'rgba(255,255,255,0.06)')};
  color: #fff;
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
`;

export const App: FC = () => {
  const { image, handleFileSelect, clearImage } = useImageUpload();
  const [prompt, setPrompt] = useState('');
  const [qualityPrompt, setQualityPrompt] = useState('');
  const [qualityLoading, setQualityLoading] = useState(false);
  const [qualityError, setQualityError] = useState<string | null>(null);
  const [qualityResult, setQualityResult] = useState<PromptQualityResultData | null>(null);
  const [showQualityImproved, setShowQualityImproved] = useState(false);
  const [qualityCopied, setQualityCopied] = useState(false);
  const [creatingPayment, setCreatingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [showQualityScreen, setShowQualityScreen] = useState(IS_PROMPT_CHECK_MODE);

  const search = typeof window !== 'undefined' ? window.location.search : '';
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const isYooKassaReturn = useMemo(() => {
    return params.get('yookassaReturn') === '1';
  }, [params]);

  const paymentIdFromStorage =
    typeof window !== 'undefined' ? sessionStorage.getItem('yookassa_payment_id') : null;
  const showPaymentStatus = Boolean(isYooKassaReturn && paymentIdFromStorage);

  const showPrompt = !IS_PROMPT_CHECK_MODE && Boolean(image) && !showQualityScreen;
  const showMain = !IS_PROMPT_CHECK_MODE && !showPrompt && !showQualityScreen;
  const showQualityInput = showQualityScreen && !qualityResult && !showQualityImproved;
  const showQualityResult = showQualityScreen && Boolean(qualityResult) && !showQualityImproved;
  const showQualityImprovedScreen = showQualityScreen && showQualityImproved;
  const direction = useMemo(
    () => (showPrompt || showQualityScreen ? 'forward' : 'back'),
    [showPrompt, showQualityScreen],
  );
  const currentStep: FlowStep = IS_PROMPT_CHECK_MODE
    ? 'quality'
    : showQualityScreen
    ? 'quality'
    : showPaymentStatus || paymentModalOpen
      ? 'payment'
      : showPrompt
        ? 'prompt'
        : 'select';

  const startPayment = async () => {
    setCreatingPayment(true);
    setPaymentError(null);
    try {
      const resp = await fetch('/api/yookassa/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: '10.00',
          description: `Liv Pic — тестовая оплата. Промпт: ${prompt || '-'}`,
          returnUrl: `${window.location.origin}/?yookassaReturn=1`,
        }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data?.error ? JSON.stringify(data) : 'HTTP error');
      }

      const { paymentId, confirmationUrl } = data || {};
      if (!paymentId || !confirmationUrl) {
        throw new Error('Bad response from server');
      }

      sessionStorage.setItem('yookassa_payment_id', paymentId);
      window.location.href = confirmationUrl;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setPaymentError(msg);
      setCreatingPayment(false);
    }
  };

  const handleBackToMain = () => {
    setShowQualityScreen(false);
    setShowQualityImproved(false);
    setQualityCopied(false);
    setQualityResult(null);
    setQualityError(null);
    setQualityLoading(false);
    setPrompt('');
    setPaymentModalOpen(false);
    setPaymentError(null);
    clearImage();
  };

  const handleStepSelect = (step: FlowStep) => {
    if (step === 'quality') {
      setQualityError(null);
      setShowQualityImproved(false);
      setQualityCopied(false);
      setQualityResult(null);
      setQualityPrompt((prev) => prev || prompt);
      setPaymentModalOpen(false);
      setPaymentError(null);
      setShowQualityScreen(true);
      return;
    }

    if (step === 'select') {
      handleBackToMain();
      return;
    }

    if (step === 'prompt') {
      if (!image) return;
      setShowQualityScreen(false);
      setShowQualityImproved(false);
      setQualityCopied(false);
      setQualityResult(null);
      setPaymentModalOpen(false);
      setPaymentError(null);
      return;
    }

    if (!image) return;
    setShowQualityScreen(false);
    setPaymentError(null);
    setPaymentModalOpen(true);
  };

  const handleAnalyzeQualityPrompt = async () => {
    const trimmed = qualityPrompt.trim();
    if (!trimmed) {
      setQualityError('Введите промпт перед проверкой.');
      return;
    }

    setQualityLoading(true);
    setQualityError(null);
    try {
      const resp = await fetch('/api/prompt-quality/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: trimmed }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data?.message || data?.error || 'Не удалось проанализировать промпт.');
      }

      setQualityResult({
        score: Number(data?.score ?? 0),
        verdict: String(data?.verdict ?? 'Результат анализа готов.'),
        weaknesses: String(data?.weaknesses ?? ''),
        recommendations: Array.isArray(data?.recommendations) ? data.recommendations : [],
        improvedPrompt: String(data?.improvedPrompt ?? ''),
      });
      setShowQualityImproved(false);
      setQualityCopied(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setQualityError(msg);
    } finally {
      setQualityLoading(false);
    }
  };

  const handleImprovePrompt = () => {
    if (!qualityResult?.improvedPrompt) return;
    setPrompt(qualityResult.improvedPrompt);
    setQualityPrompt(qualityResult.improvedPrompt);
    setShowQualityImproved(true);
  };

  const handleCopyImprovedPrompt = async () => {
    if (!qualityResult?.improvedPrompt) return;
    try {
      await navigator.clipboard.writeText(qualityResult.improvedPrompt);
      setQualityCopied(true);
    } catch {
      setQualityCopied(false);
    }
  };

  return (
    <AppProviders>
      <ScaledViewport>
        <ScreenStack>
          <ScreenLayer active={showMain} direction={direction}>
            <MainScreen
              onImageSelect={handleFileSelect}
              currentStep={currentStep}
              onStepSelect={handleStepSelect}
              canOpenPrompt={Boolean(image)}
              canOpenPayment={Boolean(image)}
              canOpenQuality
            />
          </ScreenLayer>
          <ScreenLayer active={showPrompt} direction={direction}>
            <PromptScreen
              prompt={prompt}
              onPromptChange={setPrompt}
              onSubmit={() => setPaymentModalOpen(true)}
              currentStep={currentStep}
              onStepSelect={handleStepSelect}
              canOpenPrompt={Boolean(image)}
              canOpenPayment={Boolean(image)}
              canOpenQuality
            />
          </ScreenLayer>
          <ScreenLayer active={showQualityInput} direction={direction}>
            <PromptQualityScreen
              promptValue={qualityPrompt}
              onPromptChange={setQualityPrompt}
              onAnalyze={() => void handleAnalyzeQualityPrompt()}
              loading={qualityLoading}
              error={qualityError}
              currentStep={currentStep}
              onStepSelect={handleStepSelect}
              canOpenPrompt={Boolean(image)}
              canOpenPayment={Boolean(image)}
              canOpenQuality
            />
          </ScreenLayer>
          <ScreenLayer active={showQualityResult} direction={direction}>
            {qualityResult ? (
              <PromptQualityResultScreen
                result={qualityResult}
                onImprovePrompt={handleImprovePrompt}
                currentStep={currentStep}
                onStepSelect={handleStepSelect}
                canOpenPrompt={Boolean(image)}
                canOpenPayment={Boolean(image)}
                canOpenQuality
              />
            ) : null}
          </ScreenLayer>
          <ScreenLayer active={showQualityImprovedScreen} direction={direction}>
            {qualityResult ? (
              <PromptQualityImprovedScreen
                improvedPrompt={qualityResult.improvedPrompt}
                copied={qualityCopied}
                onCopy={() => void handleCopyImprovedPrompt()}
                currentStep={currentStep}
                onStepSelect={handleStepSelect}
                canOpenPrompt={Boolean(image)}
                canOpenPayment={Boolean(image)}
                canOpenQuality
              />
            ) : null}
          </ScreenLayer>
        </ScreenStack>

        {paymentModalOpen ? (
          <ModalOverlay
            onClick={() => {
              if (!creatingPayment) setPaymentModalOpen(false);
            }}
          >
            <ModalCard onClick={(e) => e.stopPropagation()}>
              <ModalTitle>Оплата</ModalTitle>
              <ModalText>
                Сумма: <b>10 ₽</b>
                <br />
                Метод: тестовая оплата ЮKassa
                <br />
                После оплаты мы продолжим создание видео.
              </ModalText>
              <ModalRow>
                <ModalButton
                  type="button"
                  disabled={creatingPayment}
                  onClick={() => setPaymentModalOpen(false)}
                >
                  Закрыть
                </ModalButton>
                <ModalButton
                  type="button"
                  primary
                  disabled={creatingPayment}
                  onClick={() => void startPayment()}
                >
                  Оплатить
                </ModalButton>
              </ModalRow>
            </ModalCard>
          </ModalOverlay>
        ) : null}

        {showPaymentStatus && paymentIdFromStorage ? (
          <PaymentStatusScreen
            paymentId={paymentIdFromStorage}
            onDone={() => {
              const url = new URL(window.location.href);
              url.searchParams.delete('yookassaReturn');
              window.history.replaceState({}, '', url.toString());
            }}
          />
        ) : null}

        {paymentError ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 24,
              textAlign: 'center',
              color: '#fff',
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
            }}
            onClick={() => setPaymentError(null)}
          >
            Ошибка оплаты: {paymentError}
          </div>
        ) : null}
      </ScaledViewport>
    </AppProviders>
  );
};
