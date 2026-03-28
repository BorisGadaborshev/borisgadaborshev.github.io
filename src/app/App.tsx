import styled from '@emotion/styled';
import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react';
import { useImageUpload } from '@entities/image-upload';
import { FlowStep, ScaledViewport } from '@shared/ui';
import { MainEntryScreen, MainScreen, MainUploadLoadingScreen } from '@widgets/main-screen';
import {
  PromptQualityImprovedScreen,
  PromptQualityResultData,
  PromptQualityResultScreen,
  PromptQualityScreen,
} from '@widgets/prompt-quality-screen';
import {
  PromptDescriptionFinalScreen,
  PromptDescriptionScreen,
  PromptScreen,
} from '@widgets/prompt-screen';
import {
  CreateImageLoadingScreen,
  CreateImagePromptScreen,
  CreateImageResultScreen,
} from '@widgets/image-generation-screen';
import {
  EditImageLoadingScreen,
  EditImageMainScreen,
  EditImagePromptScreen,
  EditImageResultScreen,
} from '@widgets/image-edit-screen';
import {
  EnhanceImageLoadingScreen,
  EnhanceImageMainScreen,
  EnhanceImageResultScreen,
} from '@widgets/image-enhance-screen';
import { UserAgreementScreen } from '@widgets/user-agreement-screen';
import { PaymentStatusScreen, PaymentTopUpScreen } from '@widgets/payment-screen';
import { VideoFinalScreen } from '@widgets/video-final-screen';
import { AppProviders } from './providers';

const APP_MODE = import.meta.env.VITE_APP_MODE === 'prompt-check' ? 'prompt-check' : 'livpic';
const IS_PROMPT_CHECK_MODE = APP_MODE === 'prompt-check';
const API_BASE_URL = String(import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

const apiUrl = (path: string) => (API_BASE_URL ? `${API_BASE_URL}${path}` : path);

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
  const { image, isLoading, handleFileSelect, setImageFromFile, clearImage } = useImageUpload();
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
  const [showAgreementScreen, setShowAgreementScreen] = useState(!IS_PROMPT_CHECK_MODE);
  const [showTopUpScreen, setShowTopUpScreen] = useState(false);
  const [showQualityScreen, setShowQualityScreen] = useState(IS_PROMPT_CHECK_MODE);
  const [showUploadScreen, setShowUploadScreen] = useState(false);
  const [showMainUploadDelay, setShowMainUploadDelay] = useState(false);
  const [showVideoLoadingScreen, setShowVideoLoadingScreen] = useState(false);
  const [showVideoFinalScreen, setShowVideoFinalScreen] = useState(false);
  const [showDescriptionPromptScreen, setShowDescriptionPromptScreen] = useState(false);
  const [showDescriptionLoadingScreen, setShowDescriptionLoadingScreen] = useState(false);
  const [showDescriptionFinalScreen, setShowDescriptionFinalScreen] = useState(false);
  const [showCreateImagePromptScreen, setShowCreateImagePromptScreen] = useState(false);
  const [showCreateImageLoadingScreen, setShowCreateImageLoadingScreen] = useState(false);
  const [showCreateImageResultScreen, setShowCreateImageResultScreen] = useState(false);
  const [showEditImageMainScreen, setShowEditImageMainScreen] = useState(false);
  const [showEditImagePromptScreen, setShowEditImagePromptScreen] = useState(false);
  const [showEditImageLoadingScreen, setShowEditImageLoadingScreen] = useState(false);
  const [showEditImageResultScreen, setShowEditImageResultScreen] = useState(false);
  const [showEnhanceImageMainScreen, setShowEnhanceImageMainScreen] = useState(false);
  const [showEnhanceImageLoadingScreen, setShowEnhanceImageLoadingScreen] = useState(false);
  const [showEnhanceImageResultScreen, setShowEnhanceImageResultScreen] = useState(false);
  const mainUploadDelayTimerRef = useRef<number | null>(null);

  const search = typeof window !== 'undefined' ? window.location.search : '';
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const isYooKassaReturn = useMemo(() => {
    return params.get('yookassaReturn') === '1';
  }, [params]);

  const paymentIdFromStorage =
    typeof window !== 'undefined' ? sessionStorage.getItem('yookassa_payment_id') : null;
  const showPaymentStatus = Boolean(isYooKassaReturn && paymentIdFromStorage);

  const showPrompt =
    !IS_PROMPT_CHECK_MODE &&
    Boolean(image) &&
    !showQualityScreen &&
    !showMainUploadDelay &&
    !showVideoLoadingScreen &&
    !showVideoFinalScreen;
  const showDescriptionPrompt =
    !IS_PROMPT_CHECK_MODE &&
    showDescriptionPromptScreen &&
    !showQualityScreen &&
    !showVideoFinalScreen &&
    !showDescriptionLoadingScreen &&
    !showDescriptionFinalScreen;
  const showCreateImagePrompt =
    !IS_PROMPT_CHECK_MODE &&
    showCreateImagePromptScreen &&
    !showQualityScreen &&
    !showVideoFinalScreen &&
    !showDescriptionFinalScreen &&
    !showCreateImageLoadingScreen &&
    !showCreateImageResultScreen;
  const showCreateImageLoading = !IS_PROMPT_CHECK_MODE && showCreateImageLoadingScreen;
  const showCreateImageResult = !IS_PROMPT_CHECK_MODE && showCreateImageResultScreen;
  const showEditImageMain = !IS_PROMPT_CHECK_MODE && showEditImageMainScreen;
  const showEditImagePrompt = !IS_PROMPT_CHECK_MODE && showEditImagePromptScreen;
  const showEditImageLoading = !IS_PROMPT_CHECK_MODE && showEditImageLoadingScreen;
  const showEditImageResult = !IS_PROMPT_CHECK_MODE && showEditImageResultScreen;
  const showEnhanceImageMain = !IS_PROMPT_CHECK_MODE && showEnhanceImageMainScreen;
  const showEnhanceImageLoading = !IS_PROMPT_CHECK_MODE && showEnhanceImageLoadingScreen;
  const showEnhanceImageResult = !IS_PROMPT_CHECK_MODE && showEnhanceImageResultScreen;
  const showAgreement = !IS_PROMPT_CHECK_MODE && showAgreementScreen;
  const showTopUp = !IS_PROMPT_CHECK_MODE && showTopUpScreen;
  const showEntry =
    !IS_PROMPT_CHECK_MODE &&
    !showAgreement &&
    !showTopUp &&
    !showUploadScreen &&
    !showPrompt &&
    !showDescriptionPrompt &&
    !showCreateImagePrompt &&
    !showCreateImageLoading &&
    !showCreateImageResult &&
    !showEditImageMain &&
    !showEditImagePrompt &&
    !showEditImageLoading &&
    !showEditImageResult &&
    !showEnhanceImageMain &&
    !showEnhanceImageLoading &&
    !showEnhanceImageResult &&
    !showVideoLoadingScreen &&
    !showDescriptionLoadingScreen &&
    !showTopUp &&
    !showQualityScreen &&
    !showVideoFinalScreen &&
    !showDescriptionFinalScreen;
  const showMain =
    !IS_PROMPT_CHECK_MODE &&
    showUploadScreen &&
    !isLoading &&
    !showMainUploadDelay &&
    !showPrompt &&
    !showCreateImagePrompt &&
    !showCreateImageLoading &&
    !showCreateImageResult &&
    !showEditImageMain &&
    !showEditImagePrompt &&
    !showEditImageLoading &&
    !showEditImageResult &&
    !showEnhanceImageMain &&
    !showEnhanceImageLoading &&
    !showEnhanceImageResult &&
    !showQualityScreen &&
    !showVideoLoadingScreen &&
    !showDescriptionLoadingScreen &&
    !showVideoFinalScreen &&
    !showDescriptionFinalScreen;
  const showFinal = !IS_PROMPT_CHECK_MODE && showVideoFinalScreen;
  const showVideoLoading = !IS_PROMPT_CHECK_MODE && showVideoLoadingScreen;
  const showDescriptionLoading = !IS_PROMPT_CHECK_MODE && showDescriptionLoadingScreen;
  const showDescriptionFinal = !IS_PROMPT_CHECK_MODE && showDescriptionFinalScreen;
  const showMainUploadLoading =
    !IS_PROMPT_CHECK_MODE && showUploadScreen && (isLoading || showMainUploadDelay);
  const showQualityInput = showQualityScreen && !qualityResult && !showQualityImproved;
  const showQualityResult = showQualityScreen && Boolean(qualityResult) && !showQualityImproved;
  const showQualityImprovedScreen = showQualityScreen && showQualityImproved;
  const direction = useMemo(
    () =>
      showPrompt ||
      showDescriptionPrompt ||
      showCreateImagePrompt ||
      showCreateImageLoading ||
      showCreateImageResult ||
      showEditImageMain ||
      showEditImagePrompt ||
      showEditImageLoading ||
      showEditImageResult ||
      showEnhanceImageMain ||
      showEnhanceImageLoading ||
      showEnhanceImageResult ||
      showTopUp ||
      showAgreement ||
      showQualityScreen ||
      showUploadScreen ||
      showMainUploadLoading ||
      showVideoLoading ||
      showDescriptionLoading ||
      showFinal ||
      showDescriptionFinal
        ? 'forward'
        : 'back',
    [
      showPrompt,
      showDescriptionPrompt,
      showCreateImagePrompt,
      showCreateImageLoading,
      showCreateImageResult,
      showEditImageMain,
      showEditImagePrompt,
      showEditImageLoading,
      showEditImageResult,
      showEnhanceImageMain,
      showEnhanceImageLoading,
      showEnhanceImageResult,
      showTopUp,
      showAgreement,
      showQualityScreen,
      showUploadScreen,
      showMainUploadLoading,
      showVideoLoading,
      showDescriptionLoading,
      showFinal,
      showDescriptionFinal,
    ],
  );
  const currentStep: FlowStep = IS_PROMPT_CHECK_MODE
    ? 'quality'
    : showQualityScreen
    ? 'quality'
    : showPaymentStatus || paymentModalOpen
      ? 'payment'
      : showPrompt ||
          showDescriptionPrompt ||
          showVideoLoading ||
          showDescriptionLoading ||
          showCreateImagePrompt ||
          showEditImagePrompt ||
          showEditImageMain ||
          showEnhanceImageMain
        ? 'prompt'
        : 'select';

  useEffect(() => {
    if (!showCreateImageLoadingScreen) return;
    const timer = window.setTimeout(() => {
      setShowCreateImageLoadingScreen(false);
      setShowCreateImageResultScreen(true);
    }, 1700);
    return () => window.clearTimeout(timer);
  }, [showCreateImageLoadingScreen]);

  useEffect(() => {
    if (!showEditImageLoadingScreen) return;
    const timer = window.setTimeout(() => {
      setShowEditImageLoadingScreen(false);
      setShowEditImageResultScreen(true);
    }, 1700);
    return () => window.clearTimeout(timer);
  }, [showEditImageLoadingScreen]);

  useEffect(() => {
    if (!showEnhanceImageLoadingScreen) return;
    const timer = window.setTimeout(() => {
      setShowEnhanceImageLoadingScreen(false);
      setShowEnhanceImageResultScreen(true);
    }, 1700);
    return () => window.clearTimeout(timer);
  }, [showEnhanceImageLoadingScreen]);

  useEffect(() => {
    if (!showVideoLoadingScreen) return;
    const timer = window.setTimeout(() => {
      setShowVideoLoadingScreen(false);
      setShowVideoFinalScreen(true);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [showVideoLoadingScreen]);

  useEffect(() => {
    if (!showDescriptionLoadingScreen) return;
    const timer = window.setTimeout(() => {
      setShowDescriptionLoadingScreen(false);
      setShowDescriptionFinalScreen(true);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [showDescriptionLoadingScreen]);

  useEffect(() => {
    return () => {
      if (mainUploadDelayTimerRef.current !== null) {
        window.clearTimeout(mainUploadDelayTimerRef.current);
      }
    };
  }, []);

  const handleMainImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return;

    if (mainUploadDelayTimerRef.current !== null) {
      window.clearTimeout(mainUploadDelayTimerRef.current);
    }

    setShowMainUploadDelay(true);
    mainUploadDelayTimerRef.current = window.setTimeout(() => {
      setShowMainUploadDelay(false);
      mainUploadDelayTimerRef.current = null;
    }, 5000);

    handleFileSelect(event);
  };

  const startPayment = async () => {
    if (!API_BASE_URL && window.location.hostname.endsWith('github.io')) {
      setPaymentError(
        'Не задан VITE_API_BASE_URL. Для GitHub Pages укажите URL backend-сервера.',
      );
      return;
    }

    setCreatingPayment(true);
    setPaymentError(null);
    try {
      const resp = await fetch(apiUrl('/api/yookassa/create-payment'), {
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
    if (mainUploadDelayTimerRef.current !== null) {
      window.clearTimeout(mainUploadDelayTimerRef.current);
      mainUploadDelayTimerRef.current = null;
    }
    setShowMainUploadDelay(false);
    setShowUploadScreen(false);
    setShowVideoLoadingScreen(false);
    setShowDescriptionPromptScreen(false);
    setShowDescriptionLoadingScreen(false);
    setShowDescriptionFinalScreen(false);
    setShowCreateImagePromptScreen(false);
    setShowCreateImageLoadingScreen(false);
    setShowCreateImageResultScreen(false);
    setShowEditImageMainScreen(false);
    setShowEditImagePromptScreen(false);
    setShowEditImageLoadingScreen(false);
    setShowEditImageResultScreen(false);
    setShowEnhanceImageMainScreen(false);
    setShowEnhanceImageLoadingScreen(false);
    setShowEnhanceImageResultScreen(false);
    setShowTopUpScreen(false);
    setShowQualityScreen(false);
    setShowVideoFinalScreen(false);
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
      setShowCreateImagePromptScreen(false);
      setShowCreateImageLoadingScreen(false);
      setShowCreateImageResultScreen(false);
      setShowEditImageMainScreen(false);
      setShowEditImagePromptScreen(false);
      setShowEditImageLoadingScreen(false);
      setShowEditImageResultScreen(false);
      setShowEnhanceImageMainScreen(false);
      setShowEnhanceImageLoadingScreen(false);
      setShowEnhanceImageResultScreen(false);
      setShowTopUpScreen(false);
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
      if (
        !image &&
        !showDescriptionPromptScreen &&
        !showDescriptionLoadingScreen &&
        !showCreateImagePromptScreen &&
        !showEditImagePromptScreen &&
        !showEditImageMainScreen &&
        !showEnhanceImageMainScreen
      ) {
        return;
      }
      setShowQualityScreen(false);
      setShowQualityImproved(false);
      setQualityCopied(false);
      setQualityResult(null);
      setPaymentModalOpen(false);
      setPaymentError(null);
      setShowVideoLoadingScreen(false);
      setShowDescriptionLoadingScreen(false);
      setShowVideoFinalScreen(false);
      setShowDescriptionFinalScreen(false);
      setShowCreateImageLoadingScreen(false);
      setShowCreateImageResultScreen(false);
      setShowEditImageMainScreen(false);
      setShowEditImagePromptScreen(false);
      setShowEditImageLoadingScreen(false);
      setShowEditImageResultScreen(false);
      setShowEnhanceImageMainScreen(false);
      setShowEnhanceImageLoadingScreen(false);
      setShowEnhanceImageResultScreen(false);
      setShowTopUpScreen(false);
      return;
    }

    if (!image) return;
    setShowCreateImagePromptScreen(false);
    setShowCreateImageLoadingScreen(false);
    setShowCreateImageResultScreen(false);
    setShowEditImageMainScreen(false);
    setShowEditImagePromptScreen(false);
    setShowEditImageLoadingScreen(false);
    setShowEditImageResultScreen(false);
    setShowEnhanceImageMainScreen(false);
    setShowEnhanceImageLoadingScreen(false);
    setShowEnhanceImageResultScreen(false);
    setShowTopUpScreen(false);
    setShowQualityScreen(false);
    setPaymentError(null);
    setPaymentModalOpen(true);
  };

  const handleOpenPromptWithoutImage = () => {
    if (mainUploadDelayTimerRef.current !== null) {
      window.clearTimeout(mainUploadDelayTimerRef.current);
      mainUploadDelayTimerRef.current = null;
    }
    setShowMainUploadDelay(false);
    setShowUploadScreen(true);
    setShowVideoLoadingScreen(false);
    setShowDescriptionPromptScreen(false);
    setShowDescriptionLoadingScreen(false);
    setShowDescriptionFinalScreen(false);
    setShowCreateImagePromptScreen(false);
    setShowCreateImageLoadingScreen(false);
    setShowCreateImageResultScreen(false);
    setShowEditImageMainScreen(false);
    setShowEditImagePromptScreen(false);
    setShowEditImageLoadingScreen(false);
    setShowEditImageResultScreen(false);
    setShowEnhanceImageMainScreen(false);
    setShowEnhanceImageLoadingScreen(false);
    setShowEnhanceImageResultScreen(false);
    setShowTopUpScreen(false);
    setShowQualityScreen(false);
    setShowVideoFinalScreen(false);
    setShowQualityImproved(false);
    setQualityCopied(false);
    setQualityResult(null);
    setPaymentModalOpen(false);
    setPaymentError(null);
  };

  const handleOpenDescriptionPrompt = () => {
    if (mainUploadDelayTimerRef.current !== null) {
      window.clearTimeout(mainUploadDelayTimerRef.current);
      mainUploadDelayTimerRef.current = null;
    }
    setShowMainUploadDelay(false);
    setShowUploadScreen(false);
    setShowDescriptionPromptScreen(true);
    setShowDescriptionLoadingScreen(false);
    setShowDescriptionFinalScreen(false);
    setShowCreateImagePromptScreen(false);
    setShowCreateImageLoadingScreen(false);
    setShowCreateImageResultScreen(false);
    setShowQualityScreen(false);
    setShowVideoLoadingScreen(false);
    setShowVideoFinalScreen(false);
    setShowQualityImproved(false);
    setQualityCopied(false);
    setQualityResult(null);
    setPaymentModalOpen(false);
    setPaymentError(null);
  };

  const handleOpenCreateImagePrompt = () => {
    if (mainUploadDelayTimerRef.current !== null) {
      window.clearTimeout(mainUploadDelayTimerRef.current);
      mainUploadDelayTimerRef.current = null;
    }
    setShowMainUploadDelay(false);
    setShowUploadScreen(false);
    setShowVideoLoadingScreen(false);
    setShowDescriptionPromptScreen(false);
    setShowDescriptionLoadingScreen(false);
    setShowDescriptionFinalScreen(false);
    setShowCreateImagePromptScreen(true);
    setShowCreateImageLoadingScreen(false);
    setShowCreateImageResultScreen(false);
    setShowEditImageMainScreen(false);
    setShowEditImagePromptScreen(false);
    setShowEditImageLoadingScreen(false);
    setShowEditImageResultScreen(false);
    setShowEnhanceImageMainScreen(false);
    setShowEnhanceImageLoadingScreen(false);
    setShowEnhanceImageResultScreen(false);
    setShowTopUpScreen(false);
    setShowQualityScreen(false);
    setShowVideoFinalScreen(false);
    setShowQualityImproved(false);
    setQualityCopied(false);
    setQualityResult(null);
    setPaymentModalOpen(false);
    setPaymentError(null);
  };

  const handleOpenEditImageFlow = () => {
    if (mainUploadDelayTimerRef.current !== null) {
      window.clearTimeout(mainUploadDelayTimerRef.current);
      mainUploadDelayTimerRef.current = null;
    }
    setShowMainUploadDelay(false);
    setShowUploadScreen(false);
    setShowVideoLoadingScreen(false);
    setShowDescriptionPromptScreen(false);
    setShowDescriptionLoadingScreen(false);
    setShowDescriptionFinalScreen(false);
    setShowCreateImagePromptScreen(false);
    setShowCreateImageLoadingScreen(false);
    setShowCreateImageResultScreen(false);
    setShowEditImageMainScreen(true);
    setShowEditImagePromptScreen(false);
    setShowEditImageLoadingScreen(false);
    setShowEditImageResultScreen(false);
    setShowEnhanceImageMainScreen(false);
    setShowEnhanceImageLoadingScreen(false);
    setShowEnhanceImageResultScreen(false);
    setShowTopUpScreen(false);
    setShowQualityScreen(false);
    setShowVideoFinalScreen(false);
    setShowQualityImproved(false);
    setQualityCopied(false);
    setQualityResult(null);
    setPaymentModalOpen(false);
    setPaymentError(null);
  };

  const handleEditImageSelected = () => {
    setShowEditImageMainScreen(false);
    setShowEditImagePromptScreen(true);
  };

  const handleOpenEnhanceImageFlow = () => {
    if (mainUploadDelayTimerRef.current !== null) {
      window.clearTimeout(mainUploadDelayTimerRef.current);
      mainUploadDelayTimerRef.current = null;
    }
    setShowMainUploadDelay(false);
    setShowUploadScreen(false);
    setShowVideoLoadingScreen(false);
    setShowDescriptionPromptScreen(false);
    setShowDescriptionLoadingScreen(false);
    setShowDescriptionFinalScreen(false);
    setShowCreateImagePromptScreen(false);
    setShowCreateImageLoadingScreen(false);
    setShowCreateImageResultScreen(false);
    setShowEditImageMainScreen(false);
    setShowEditImagePromptScreen(false);
    setShowEditImageLoadingScreen(false);
    setShowEditImageResultScreen(false);
    setShowEnhanceImageMainScreen(true);
    setShowEnhanceImageLoadingScreen(false);
    setShowEnhanceImageResultScreen(false);
    setShowQualityScreen(false);
    setShowVideoFinalScreen(false);
    setShowQualityImproved(false);
    setQualityCopied(false);
    setQualityResult(null);
    setPaymentModalOpen(false);
    setPaymentError(null);
  };

  const handleEnhanceImageSelected = (file: File) => {
    setImageFromFile(file);
    setShowEnhanceImageMainScreen(false);
    setShowEnhanceImageLoadingScreen(true);
  };

  const handleOpenTopUpScreen = () => {
    setShowTopUpScreen(true);
  };

  const handleCloseTopUpScreen = () => {
    setShowTopUpScreen(false);
  };

  const handleAnalyzeQualityPrompt = async () => {
    const trimmed = qualityPrompt.trim();
    if (!trimmed) {
      setQualityError('Введите промпт перед проверкой.');
      return;
    }

    if (!API_BASE_URL && window.location.hostname.endsWith('github.io')) {
      setQualityError(
        'Не задан VITE_API_BASE_URL. Для GitHub Pages укажите URL backend-сервера.',
      );
      return;
    }

    setQualityLoading(true);
    setQualityError(null);
    try {
      const resp = await fetch(apiUrl('/api/prompt-quality/analyze'), {
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

  const handleAgreementContinue = () => {
    setShowAgreementScreen(false);
  };

  return (
    <AppProviders>
      <ScaledViewport>
        <ScreenStack>
          <ScreenLayer active={showAgreement} direction={direction}>
            <UserAgreementScreen onContinue={handleAgreementContinue} />
          </ScreenLayer>
          <ScreenLayer active={showTopUp} direction={direction}>
            <PaymentTopUpScreen onBack={handleCloseTopUpScreen} />
          </ScreenLayer>
          <ScreenLayer active={showEntry} direction={direction}>
            <MainEntryScreen
              onOpenImageSelection={handleOpenPromptWithoutImage}
              onOpenDescriptionPrompt={handleOpenDescriptionPrompt}
              onOpenCreateImagePrompt={handleOpenCreateImagePrompt}
              onOpenEditImageFlow={handleOpenEditImageFlow}
              onOpenEnhanceImageFlow={handleOpenEnhanceImageFlow}
              onOpenTopUp={handleOpenTopUpScreen}
            />
          </ScreenLayer>
          <ScreenLayer active={showMain} direction={direction}>
            <MainScreen
              onImageSelect={handleMainImageSelect}
              currentStep={currentStep}
              onStepSelect={handleStepSelect}
              canOpenPrompt={Boolean(image)}
              canOpenPayment={Boolean(image)}
              canOpenQuality
            />
          </ScreenLayer>
          <ScreenLayer active={showMainUploadLoading} direction={direction}>
            <MainUploadLoadingScreen
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
              onSubmit={() => {
                setShowVideoLoadingScreen(true);
                setShowVideoFinalScreen(false);
              }}
              currentStep={currentStep}
              onStepSelect={handleStepSelect}
              canOpenPrompt={Boolean(image)}
              canOpenPayment={Boolean(image)}
              canOpenQuality
            />
          </ScreenLayer>
          <ScreenLayer active={showDescriptionPrompt} direction={direction}>
            <PromptDescriptionScreen
              prompt={prompt}
              onPromptChange={setPrompt}
              onSubmit={() => {
                setShowDescriptionPromptScreen(false);
                setShowDescriptionLoadingScreen(true);
                setShowDescriptionFinalScreen(false);
              }}
              currentStep={currentStep}
              onStepSelect={handleStepSelect}
              canOpenPrompt={Boolean(image) || showDescriptionPromptScreen}
              canOpenPayment={Boolean(image)}
              canOpenQuality
            />
          </ScreenLayer>
          <ScreenLayer active={showEditImageMain} direction={direction}>
            <EditImageMainScreen
              onImageSelect={handleFileSelect}
              onImageChosen={handleEditImageSelected}
              currentStep={currentStep}
              onStepSelect={handleStepSelect}
              canOpenPrompt
              canOpenPayment={Boolean(image)}
              canOpenQuality
            />
          </ScreenLayer>
          <ScreenLayer active={showEditImagePrompt} direction={direction}>
            <EditImagePromptScreen
              prompt={prompt}
              onPromptChange={setPrompt}
              onSubmit={() => {
                setShowEditImagePromptScreen(false);
                setShowEditImageLoadingScreen(true);
              }}
              currentStep={currentStep}
              onStepSelect={handleStepSelect}
              canOpenPrompt
              canOpenPayment={Boolean(image)}
              canOpenQuality
            />
          </ScreenLayer>
          <ScreenLayer active={showEditImageLoading} direction={direction}>
            <EditImageLoadingScreen
              currentStep={currentStep}
              onStepSelect={handleStepSelect}
              canOpenPrompt
              canOpenPayment={Boolean(image)}
              canOpenQuality
            />
          </ScreenLayer>
          <ScreenLayer active={showEditImageResult} direction={direction}>
            <EditImageResultScreen
              currentStep={currentStep}
              onStepSelect={handleStepSelect}
              canOpenPrompt
              canOpenPayment={Boolean(image)}
              canOpenQuality
              onBackToMain={handleBackToMain}
            />
          </ScreenLayer>
          <ScreenLayer active={showCreateImagePrompt} direction={direction}>
            <CreateImagePromptScreen
              prompt={prompt}
              onPromptChange={setPrompt}
              onSubmit={() => {
                setShowCreateImagePromptScreen(false);
                setShowCreateImageLoadingScreen(true);
              }}
              currentStep={currentStep}
              onStepSelect={handleStepSelect}
              canOpenPrompt={Boolean(image) || showCreateImagePromptScreen}
              canOpenPayment={Boolean(image)}
              canOpenQuality
            />
          </ScreenLayer>
          <ScreenLayer active={showCreateImageLoading} direction={direction}>
            <CreateImageLoadingScreen
              currentStep={currentStep}
              onStepSelect={handleStepSelect}
              canOpenPrompt
              canOpenPayment={Boolean(image)}
              canOpenQuality
            />
          </ScreenLayer>
          <ScreenLayer active={showCreateImageResult} direction={direction}>
            <CreateImageResultScreen
              currentStep={currentStep}
              onStepSelect={handleStepSelect}
              canOpenPrompt
              canOpenPayment={Boolean(image)}
              canOpenQuality
              onBackToMain={handleBackToMain}
            />
          </ScreenLayer>
          <ScreenLayer active={showEnhanceImageMain} direction={direction}>
            <EnhanceImageMainScreen
              onImageSelected={handleEnhanceImageSelected}
              currentStep={currentStep}
              onStepSelect={handleStepSelect}
              canOpenPrompt
              canOpenPayment={Boolean(image)}
              canOpenQuality
            />
          </ScreenLayer>
          <ScreenLayer active={showEnhanceImageLoading} direction={direction}>
            <EnhanceImageLoadingScreen />
          </ScreenLayer>
          <ScreenLayer active={showEnhanceImageResult} direction={direction}>
            <EnhanceImageResultScreen onBackToMain={handleBackToMain} />
          </ScreenLayer>
          <ScreenLayer active={showVideoLoading} direction={direction}>
            <MainUploadLoadingScreen
              label="Магия началась..."
              currentStep={currentStep}
              onStepSelect={handleStepSelect}
              canOpenPrompt={Boolean(image)}
              canOpenPayment={Boolean(image)}
              canOpenQuality
            />
          </ScreenLayer>
          <ScreenLayer active={showDescriptionLoading} direction={direction}>
            <MainUploadLoadingScreen
              label="Магия началась..."
              currentStep={currentStep}
              onStepSelect={handleStepSelect}
              canOpenPrompt
              canOpenPayment={Boolean(image)}
              canOpenQuality
            />
          </ScreenLayer>
          <ScreenLayer active={showDescriptionFinal} direction={direction}>
            <PromptDescriptionFinalScreen onBackToMain={handleBackToMain} />
          </ScreenLayer>
          <ScreenLayer active={showFinal} direction={direction}>
            <VideoFinalScreen onBackToMain={handleBackToMain} />
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
