import styled from '@emotion/styled';
import { FC, useEffect, useMemo, useState } from 'react';

const Container = styled.div`
  position: absolute;
  inset: 0;
  z-index: 6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  text-align: center;
  cursor: pointer;
`;

const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 22px;
  color: #ffffff;
  margin: 0 0 12px 0;
`;

const Text = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  max-width: 340px;
`;

type PaymentStatus = 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled' | 'unknown';

function normalizeStatus(raw: unknown): PaymentStatus {
  if (raw === 'pending') return 'pending';
  if (raw === 'waiting_for_capture') return 'waiting_for_capture';
  if (raw === 'succeeded') return 'succeeded';
  if (raw === 'canceled') return 'canceled';
  return 'unknown';
}

interface PaymentStatusScreenProps {
  paymentId: string;
  onDone: () => void;
}

export const PaymentStatusScreen: FC<PaymentStatusScreenProps> = ({ paymentId, onDone }) => {
  const [status, setStatus] = useState<PaymentStatus>('pending');
  const [loading, setLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = useMemo(() => {
    if (error) {
      return {
        title: 'Не удалось проверить оплату',
        text: error,
      };
    }
    if (loading) {
      return {
        title: 'Проверяем оплату…',
        text: 'Если вы только что вернулись из ЮKassa — подождите пару секунд.',
      };
    }
    if (status === 'succeeded') {
      return { title: 'Оплата прошла', text: 'Спасибо! Можно продолжать.' };
    }
    if (status === 'canceled') {
      return { title: 'Оплата отменена', text: 'Вы можете попробовать ещё раз.' };
    }
    if (status === 'waiting_for_capture') {
      return { title: 'Ожидаем подтверждение', text: 'Платёж создан, ожидаем завершения.' };
    }
    return { title: 'Оплата в процессе', text: 'Платёж ещё не завершён.' };
  }, [error, loading, status]);

  const check = async (opts?: { silent?: boolean }) => {
    const silent = Boolean(opts?.silent);
    if (!(silent && hasLoadedOnce)) {
      setLoading(true);
    }
    setError(null);
    try {
      const resp = await fetch(`/api/yookassa/payments/${paymentId}`);
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data?.error ? JSON.stringify(data) : 'HTTP error');
      }
      setStatus(normalizeStatus(data?.status));
      setHasLoadedOnce(true);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      setStatus('unknown');
    } finally {
      if (!(silent && hasLoadedOnce)) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let cancelled = false;
    void check({ silent: false });

    const timer = window.setInterval(() => {
      if (cancelled) return;
      // Stop polling after terminal statuses to avoid UI flicker.
      if (status === 'succeeded' || status === 'canceled') return;
      void check({ silent: true });
    }, 1500);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentId, status, hasLoadedOnce]);

  return (
    <Container
      onClick={() => {
        sessionStorage.removeItem('yookassa_payment_id');
        onDone();
      }}
      role="button"
      aria-label="Закрыть"
    >
      <Title>{copy.title}</Title>
      <Text>
        {copy.text}
        {!loading ? ' Нажмите в любое место, чтобы закрыть.' : null}
      </Text>
    </Container>
  );
};

