import styled from '@emotion/styled';
import { FC } from 'react';
import { FlowMenu, FlowStep } from '@shared/ui';

const menuIcon = `${import.meta.env.BASE_URL}images/menu-icon.svg`;
const recommendationsBg = `${import.meta.env.BASE_URL}images/prompt-recommendations-bg.svg`;
const pencilIcon = `${import.meta.env.BASE_URL}images/pencil-icon-left.svg`;
const rectangle11Background = `${import.meta.env.BASE_URL}images/Rectangle11.png`;
const HIDE_MENU = import.meta.env.VITE_APP_MODE === 'prompt-check';

const Root = styled.div`
  position: absolute;
  inset: 0;
  background: #06071a;
`;


const Title = styled.h2`
  position: absolute;
  left: 123px;
  top: 101px;
  margin: 0;
  width: 147px;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 26px;
  line-height: 1.1153846153846154em;
  color: #fdfdfd;
  text-align: center;
`;

const Divider = styled.div`
  position: absolute;
  left: 9px;
  top: 130px;
  width: 376px;
  height: 1px;
  background: linear-gradient(90deg, #06071a 0%, #d3dcfc 49%, #06071a 100%);
`;

const Subtitle = styled.p`
  position: absolute;
  left: 30px;
  top: 139px;
  width: 334px;
  margin: 0;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 350;
  font-size: 16px;
  line-height: 1.25em;
  color: #c7c7c7;
  text-align: center;
`;

const ScoreMeter = styled.div`
  position: absolute;
  left: 108px;
  top: 188px;
  width: 171px;
  height: 171px;
`;

const ScoreMeterSvg = styled.svg`
  position: absolute;
  left: 0;
  top: 0;
  width: 171px;
  height: 171px;
`;

const Score = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 40.2564px;
  line-height: 0.725em;
  color: #fdfdfd;
`;

const Weaknesses = styled.p`
  position: absolute;
  left: 8px;
  top: 351px;
  width: 358px;
  margin: 0;
  padding: 10px;
  max-height: 132px;
  overflow: auto;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 350;
  font-size: 16px;
  line-height: 1.25em;
  color: #c7c7c7;
  text-align: center;
  white-space: pre-line;
`;

const RecommendationsBlock = styled.div`
  position: absolute;
  left: 9px;
  top: 496px;
  width: 376px;
  height: 213px;
`;

const RecommendationsBg = styled.img`
  position: absolute;
top: -120px;
left: -120px;
  pointer-events: none;
`;

const RecommendationsTitle = styled.h3`
  position: absolute;
  left: 61px;
  top: 23px;
  margin: 0;
  width: 252px;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 26px;
  line-height: 1.1153846153846154em;
  color: #fdfdfd;
  text-align: center;
`;

const RecommendationsText = styled.ul`
  position: absolute;
  left: 14px;
  top: 60px;
  width: 348px;
  max-height: 118px;
  margin: 0;
  padding: 0 6px 0 18px;
  overflow: auto;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 350;
  font-size: 16px;
  line-height: 1.25em;
  color: #d9d9d9;

  li + li {
    margin-top: 4px;
  }
`;

const ImproveButton = styled.button`
  position: absolute;
  left: 15px;
  top: 750px;
  width: 364px;
  height: 42px;
  border: 1px solid transparent;
  border-radius: 5px;
  background: url(${rectangle11Background}) center / 100% 100% no-repeat;
  color: #fdfdfd;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.8125em;
  cursor: pointer;
`;

const PencilIcon = styled.img`
  position: absolute;
  top: 8px;
  width: 27px;
  height: 27px;
`;

const RightPencil = styled(PencilIcon)`
  right: 85px;
`;

const ImproveLabel = styled.span`
  display: inline-block;
  transform: translateX(-2px);
`;

export interface PromptQualityResultData {
  score: number;
  verdict: string;
  weaknesses: string;
  recommendations: string[];
  improvedPrompt: string;
}

interface PromptQualityResultScreenProps {
  result: PromptQualityResultData;
  onImprovePrompt: () => void;
  currentStep: FlowStep;
  onStepSelect: (step: FlowStep) => void;
  canOpenPrompt?: boolean;
  canOpenPayment?: boolean;
  canOpenQuality?: boolean;
}

export const PromptQualityResultScreen: FC<PromptQualityResultScreenProps> = ({
  result,
  onImprovePrompt,
  currentStep,
  onStepSelect,
  canOpenPrompt,
  canOpenPayment,
  canOpenQuality,
}) => {
  const score = Math.max(0, Math.min(100, Math.round(result.score)));

  return (
    <Root>
      {!HIDE_MENU ? (
        <FlowMenu
          menuIcon={menuIcon}
          currentStep={currentStep}
          onStepSelect={onStepSelect}
          canOpenPrompt={canOpenPrompt}
          canOpenPayment={canOpenPayment}
          canOpenQuality={canOpenQuality}
        />
      ) : null}

      <Title>Результат:</Title>
      <Divider />
      <Subtitle>{result.verdict}</Subtitle>

      <ScoreMeter>
        <ScoreMeterSvg
          viewBox="70 70 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g filter="url(#scoreFilter0)">
            <ellipse
              cx="215.675"
              cy="230.026"
              rx="42.946"
              ry="20.2979"
              transform="rotate(-34.8403 215.675 230.026)"
              fill="#3D83F3"
            />
          </g>
          <g filter="url(#scoreFilter1)">
            <ellipse
              cx="134.089"
              cy="146.711"
              rx="39.0364"
              ry="20.464"
              transform="rotate(-44.1744 134.089 146.711)"
              fill="#9538DC"
            />
          </g>
          <circle
            cx="180.331"
            cy="182.331"
            r="78"
            fill="url(#scorePaint0)"
            stroke="url(#scorePaint1)"
          />
          <g filter="url(#scoreFilter2)">
            <circle cx="180.831" cy="180.831" r="66" fill="#202E96" />
          </g>
          <path
            d="M183.387 248.666C183.475 250.328 182.199 251.753 180.535 251.77C164.161 251.936 148.21 246.349 135.495 235.929C122.78 225.51 114.167 210.968 111.111 194.881C110.801 193.246 111.948 191.715 113.595 191.475C115.242 191.235 116.764 192.377 117.081 194.011C119.915 208.611 127.763 221.802 139.315 231.268C150.867 240.734 165.342 245.836 180.215 245.746C181.879 245.736 183.298 247.004 183.387 248.666Z"
            fill="#FDFDFD"
          />
          <defs>
            <filter
              id="scoreFilter0"
              x="125.159"
              y="146.966"
              width="181.033"
              height="166.118"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur stdDeviation="26.7" result="effect1_foregroundBlur_0_1" />
            </filter>
            <filter
              id="scoreFilter1"
              x="49.2624"
              y="62.3957"
              width="169.654"
              height="168.631"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur stdDeviation="26.7" result="effect1_foregroundBlur_0_1" />
            </filter>
            <filter
              id="scoreFilter2"
              x="-0.000114441"
              y="0"
              width="361.663"
              height="361.663"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur stdDeviation="57.4157" result="effect1_foregroundBlur_0_1" />
            </filter>
            <linearGradient
              id="scorePaint0"
              x1="139.912"
              y1="320.291"
              x2="180.665"
              y2="72.7655"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.478413" stopColor="#070918" />
              <stop offset="0.874258" stopColor="#181C3D" />
            </linearGradient>
            <linearGradient
              id="scorePaint1"
              x1="20.3313"
              y1="187.831"
              x2="48.7698"
              y2="287.689"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9C52E7" />
              <stop offset="0.362463" stopColor="#050618" />
              <stop offset="0.559625" stopColor="#050618" />
              <stop offset="1" stopColor="#3EA4FD" />
            </linearGradient>
          </defs>
        </ScoreMeterSvg>
        <Score>{score}%</Score>
      </ScoreMeter>

      <Weaknesses>{result.weaknesses}</Weaknesses>

      <RecommendationsBlock>
        <RecommendationsBg src={recommendationsBg} alt="" />
        <RecommendationsTitle>AI-рекомендации:</RecommendationsTitle>
        <RecommendationsText>
          {result.recommendations.map((item, index) => (
            <li key={`${index}-${item.slice(0, 24)}`}>{item}</li>
          ))}
        </RecommendationsText>
      </RecommendationsBlock>

      <ImproveButton type="button" onClick={onImprovePrompt}>
        <ImproveLabel>Улучшить промпт</ImproveLabel>
        <RightPencil src={pencilIcon} alt="" />
      </ImproveButton>
    </Root>
  );
};
