import styled from '@emotion/styled';
import { FC, useMemo, useState } from 'react';

const hatIcon = `${import.meta.env.BASE_URL}images/main-balance-icon.svg`;

interface PaymentTopUpScreenProps {
  onBack: () => void;
}

type TopUpOption = {
  tokens: number;
  price: string;
  oldPrice?: string;
};

const OPTIONS: TopUpOption[] = [
  { tokens: 100, price: '190,99 ₽' },
  { tokens: 250, price: '429,00 ₽' },
  { tokens: 500, price: '850,99 ₽' },
  { tokens: 1000, price: '1 679,00 ₽', oldPrice: '2 679,00 ₽' },
];

const Root = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 20px;
  overflow: hidden;
  background: #0e1116;
`;

const Scroll = styled.div`
  height: 100%;
  overflow: auto;
  padding: 48px 36px 28px;
  scrollbar-width: thin;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.button`
  position: absolute;
  left: -16px;
  top: -2px;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
`;

const BackIcon = styled.svg`
  width: 27px;
  height: 27px;
  display: block;
`;

const Title = styled.h1`
  margin: 0;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 20px;
  text-align: center;
`;

const GlassCard = styled.div<{ height?: number; dimmed?: boolean }>`
  margin-top: 15px;
  width: 321px;
  min-height: ${({ height = 57 }) => height}px;
  border-radius: 16px;
  background: #25282D;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  opacity: ${({ dimmed = true }) => (dimmed ? 0.5 : 1)};
  padding: 10px;
  box-sizing: border-box;
`;

const BalanceLabel = styled.div`
  margin-top: 1px;
  text-align: center;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 15px;
`;

const BalanceRow = styled.div`
  margin-top: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: #fff;
  font-family: 'Viga', sans-serif;
  font-weight: 400;
  font-size: 22px;
  line-height: 20px;
`;

const Hat = styled.img`
  width: 24px;
  height: 24px;
`;

const SectionLabel = styled.div`
  text-align: center;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 15px;
`;

const PromoTitle = styled.div`
  margin-top: 4px;
  text-align: center;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
`;

const Divider = styled.div`
  margin: 6px auto 0;
  width: 295px;
  border-top: 0.5px solid #fff;
`;

const PromoInput = styled.input`
  margin: 14px auto 0;
  width: 285px;
  height: 42px;
  border-radius: 8px;
  border: 0.5px solid #fff;
  background: rgba(0, 0, 0, 0.004);
  color: #fff;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 16px;
`;

const PasteButton = styled.button`
  margin: 8px auto 0;
  border: 0;
  background: transparent;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 15px;
  text-decoration: underline;
  cursor: pointer;
  display: block;
`;

const ApplyButton = styled.button<{ disabledState: boolean }>`
  margin: 12px auto 0;
  width: 285px;
  height: 56px;
  border: 0;
  border-radius: 16px;
  background: #fff;
  color: #0e1116;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 20px;
  opacity: ${({ disabledState }) => (disabledState ? 0.45 : 1)};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  cursor: ${({ disabledState }) => (disabledState ? 'not-allowed' : 'pointer')};
`;

const OptionRow = styled.button<{ active?: boolean }>`
  width: 291px;
  height: 43px;
  border: 0;
  border-radius: 16px;
  margin: 10px auto 0;
  padding: 0 12px;
  background: ${({ active }) => (active ? 'rgba(255,255,255,0.2)' : 'rgba(255, 255, 255, 0.1)')};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const OptionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Hats = styled.div`
  position: relative;
  width: 32px;
  height: 24px;
`;

const HatStack = styled.img<{ idx: number }>`
  position: absolute;
  left: ${({ idx }) => idx * 3}px;
  top: 0;
  width: 24px;
  height: 24px;
`;

const OptionTokens = styled.span`
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`;

const PriceWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const OptionPrice = styled.span`
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 15px;
`;

const OldPrice = styled.span`
  color: #afafaf;
  font-family: 'Roboto', sans-serif;
  font-weight: 200;
  font-size: 8px;
  line-height: 15px;
  text-decoration: line-through;
`;

const MethodRow = styled.button<{ active?: boolean }>`
  width: 291px;
  height: 43px;
  border: 0;
  border-radius: 16px;
  margin: 10px auto 0;
  background: ${({ active }) => (active ? 'rgba(255,255,255,0.2)' : 'rgba(255, 255, 255, 0.1)')};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
`;

const SummaryTitle = styled.div`
  text-align: center;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 15px;
`;

const SummaryRow = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 20px;
`;

const SummaryLabel = styled.span`
  font-weight: 300;
`;

const SummaryValue = styled.span`
  font-weight: 400;
`;

const AgreementRow = styled.label`
  margin: 10px 0 0;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 2px;
  border: 1.58333px solid #b1b1b1;
  background: transparent;
  position: relative;
  flex: 0 0 25px;

  &:checked {
    background: #fff;
    border-color: #fff;
  }

  &:checked::after {
    content: '';
    position: absolute;
    left: 8px;
    top: 3px;
    width: 5px;
    height: 11px;
    border: solid #0e1116;
    border-width: 0 2.2px 2.2px 0;
    transform: rotate(45deg);
  }
`;

const AgreementText = styled.span`
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 15px;
`;

const AgreementLink = styled.a`
  color: #fff;
  text-decoration: underline;
`;

const BuyButton = styled.button<{ disabledState: boolean }>`
  margin-top: 10px;
  width: 321px;
  height: 56px;
  border: 0;
  border-radius: 16px;
  background: #fff;
  color: #0e1116;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 20px;
  opacity: ${({ disabledState }) => (disabledState ? 0.45 : 1)};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  cursor: ${({ disabledState }) => (disabledState ? 'not-allowed' : 'pointer')};
`;

export const PaymentTopUpScreen: FC<PaymentTopUpScreenProps> = ({ onBack }) => {
  const [promo, setPromo] = useState('');
  const [selected, setSelected] = useState<TopUpOption>(OPTIONS[2]);
  const [method, setMethod] = useState<'card' | 'stars'>('card');
  const [agreed, setAgreed] = useState(false);

  const buttonLabel = useMemo(
    () => `Купить ${selected.tokens.toLocaleString('ru-RU')} токенов`,
    [selected.tokens],
  );

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setPromo(text);
    } catch {
      // Clipboard can be unavailable in some browsers.
    }
  };

  return (
    <Root>
      <Scroll>
        <Header>
          <BackButton type="button" onClick={onBack} aria-label="Назад">
            <BackIcon viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M23 12.875H9.30875L15.5975 6.58625L14 5L5 14L14 23L15.5863 21.4137L9.30875 15.125H23V12.875Z"
                fill="white"
              />
            </BackIcon>
          </BackButton>
          <Title>Пополнение токенов</Title>
        </Header>

        <GlassCard height={57}>
          <BalanceLabel>Текущий баланс</BalanceLabel>
          <BalanceRow>
            <span>100</span>
            <Hat src={hatIcon} alt="" />
          </BalanceRow>
        </GlassCard>

        <GlassCard height={198} dimmed={false}>
          <PromoTitle>У вас есть промокод?</PromoTitle>
          <Divider />
          <PromoInput value={promo} onChange={(event) => setPromo(event.target.value)} />
          <PasteButton type="button" onClick={() => void handlePaste()}>
            Вставить из буфера обмена
          </PasteButton>
          <ApplyButton
            type="button"
            disabledState={promo.trim().length === 0}
            disabled={promo.trim().length === 0}
          >
            Применить
          </ApplyButton>
        </GlassCard>

        <GlassCard height={326}>
          <SectionLabel>Варианты пополнения</SectionLabel>
          {OPTIONS.map((option) => (
            <OptionRow
              key={option.tokens}
              type="button"
              active={selected.tokens === option.tokens}
              onClick={() => setSelected(option)}
            >
              <OptionLeft>
                <Hats>
                  {Array.from({ length: Math.max(1, Math.min(4, Math.round(option.tokens / 250))) }).map(
                    (_, index) => (
                      <HatStack key={`${option.tokens}-${index}`} src={hatIcon} alt="" idx={index} />
                    ),
                  )}
                </Hats>
                <OptionTokens>{option.tokens.toLocaleString('ru-RU')} токенов</OptionTokens>
              </OptionLeft>
              <PriceWrap>
                <OptionPrice>{option.price}</OptionPrice>
                {option.oldPrice ? <OldPrice>{option.oldPrice}</OldPrice> : null}
              </PriceWrap>
            </OptionRow>
          ))}
          <OptionRow type="button">
            <OptionLeft>
              <OptionTokens>Другой вариант</OptionTokens>
            </OptionLeft>
          </OptionRow>
        </GlassCard>

        <GlassCard height={145}>
          <SectionLabel>Способ пополнения</SectionLabel>
          <MethodRow type="button" active={method === 'card'} onClick={() => setMethod('card')}>
            Карта / СБП
          </MethodRow>
          <MethodRow type="button" active={method === 'stars'} onClick={() => setMethod('stars')}>
            Телеграм звёзды
          </MethodRow>
        </GlassCard>

        <GlassCard height={120}>
          <SummaryTitle>Итог</SummaryTitle>
          <Divider />
          <SummaryRow>
            <SummaryLabel>Пополнение</SummaryLabel>
            <SummaryValue>{selected.tokens.toLocaleString('ru-RU')} токенов</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Стоимость</SummaryLabel>
            <SummaryValue>{selected.price}</SummaryValue>
          </SummaryRow>
        </GlassCard>

        <AgreementRow>
          <Checkbox
            type="checkbox"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
          />
          <AgreementText>
            Я соглашаюсь на <AgreementLink href="#">обработку персональных данных</AgreementLink> и с
            условиями <AgreementLink href="#">оферты</AgreementLink>.
          </AgreementText>
        </AgreementRow>

        <BuyButton type="button" disabled={!agreed} disabledState={!agreed}>
          {buttonLabel}
        </BuyButton>
      </Scroll>
    </Root>
  );
};
