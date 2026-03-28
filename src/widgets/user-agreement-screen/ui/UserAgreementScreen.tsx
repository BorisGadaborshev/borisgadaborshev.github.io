import { FC, useState } from 'react';
import styled from '@emotion/styled';

interface UserAgreementScreenProps {
  onContinue: () => void;
}

const Root = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background: #0e1116;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  overflow: auto;
  padding: 48px 13px 0;
  scrollbar-width: thin;
`;

const Heading = styled.h1`
  margin: 0;
  text-align: center;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 20px;
`;

const Intro = styled.p`
  margin: 20px 10px 0;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
`;

const SectionTitle = styled.h2`
  margin: 20px 10px 0;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 20px;
`;

const List = styled.ul`
  margin: 12px 10px 0;
  padding-left: 20px;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
`;

const Paragraph = styled.p`
  margin: 12px 10px 0;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
`;

const ParagraphStrong = styled.p`
  margin: 5px 10px 0;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`;

const PolicyTitle = styled.h2`
  margin: 16px 0 0;
  text-align: center;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 20px;
`;

const FullVersion = styled.p`
  margin: 18px 10px 22px;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`;

const Link = styled.a`
  color: #fff;
  text-decoration: underline;
`;

const Controls = styled.div`
  padding: 8px 35px calc(20px + env(safe-area-inset-bottom, 0px));
  background: linear-gradient(180deg, rgba(14, 17, 22, 0) 0%, #0e1116 24%);
`;

const CheckRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  user-select: none;
  cursor: pointer;
`;

const Checkbox = styled.input`
  appearance: none;
  width: 25px;
  height: 25px;
  margin-top: 4px;
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

const CheckLabel = styled.span`
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-size: 12px;
  font-weight: 300;
  line-height: 15px;
`;

const ContinueButton = styled.button<{ disabledState: boolean }>`
  margin-top: 10px;
  width: 100%;
  min-height: 56px;
  border: 0;
  border-radius: 16px;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-size: 22px;
  font-weight: 500;
  line-height: 20px;
  color: #0e1116;
  background: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  opacity: ${({ disabledState }) => (disabledState ? 0.45 : 1)};
  cursor: ${({ disabledState }) => (disabledState ? 'not-allowed' : 'pointer')};
`;

export const UserAgreementScreen: FC<UserAgreementScreenProps> = ({ onContinue }) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <Root>
      <Content>
        <Heading>Пользовательское соглашение</Heading>
        <Intro>
          LivPic - Telegram-бот для оживления фото с помощью ИИ. Используя сервис, вы принимаете эти
          условия.
        </Intro>
        <SectionTitle>Вы подтверждаете, что:</SectionTitle>
        <List>
          <li>имеете право на использовать загружаемые изображения;</li>
          <li>получили согласие изображённых лиц (если требуется);</li>
          <li>не нарушаете закон и авторские права;</li>
          <li>вам 18+ или есть согласие законного представителя.</li>
        </List>
        <SectionTitle>Запрещено:</SectionTitle>
        <Paragraph>
          Незаконная деятельность, запрещённый или оскорбительный контент, загрузка чужих фото без
          разрешения.
        </Paragraph>
        <ParagraphStrong>Мы можем ограничить доступ при нарушении правил.</ParagraphStrong>
        <SectionTitle>Публикация:</SectionTitle>
        <Paragraph>
          Ваши материалы не публикуются автоматически. Мы можем использовать анимации без личных
          данных как примеры работы сервиса. По запросу удалим из маркетинга.
        </Paragraph>
        <SectionTitle>Лимиты и оплата:</SectionTitle>
        <Paragraph>
          Бесплатные генерации могут быть ограничены. Дополнительные — платно или по промокодам.
          Платежи обрабатываются сторонними сервисами.
        </Paragraph>
        <PolicyTitle>Политика конфиденциальности</PolicyTitle>
        <SectionTitle>Мы обрабатываем:</SectionTitle>
        <Paragraph>
          Telegram ID, имя, username, загруженные изображения, результаты генерации, технические
          данные, информацию о платеже (без хранения данных карты).
        </Paragraph>
        <ParagraphStrong>
          Бот работает через Telegram, который действует по собственной политике конфиденциальности.
        </ParagraphStrong>
        <FullVersion>
          Полную версию пользовательского соглашения можно изучить{' '}
          <Link href="#" onClick={(event) => event.preventDefault()}>
            здесь
          </Link>
          .
        </FullVersion>
      </Content>
      <Controls>
        <CheckRow>
          <Checkbox
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
          />
          <CheckLabel>
            Я прочитал пользовательское соглашение, соглашаюсь на обработку персональных данных и с
            условиями оферты.
          </CheckLabel>
        </CheckRow>
        <ContinueButton
          type="button"
          disabledState={!accepted}
          disabled={!accepted}
          onClick={onContinue}
        >
          Продолжить
        </ContinueButton>
      </Controls>
    </Root>
  );
};
