import styled from '@emotion/styled';
import { FC, ReactNode, useLayoutEffect, useMemo, useRef, useState } from 'react';

const DEFAULT_STAGE_WIDTH = 393;
const DEFAULT_STAGE_HEIGHT = 852;

const Viewport = styled.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
`;

const ScaledStage = styled.div<{ scale: number; stageWidth: number; stageHeight: number }>`
  width: ${({ stageWidth, scale }) => stageWidth * scale}px;
  height: ${({ stageHeight, scale }) => stageHeight * scale}px;
  position: relative;
  flex: 0 0 auto;
`;

const StageSurface = styled.div<{ scale: number; stageWidth: number; stageHeight: number }>`
  position: absolute;
  inset: 0;
  width: ${({ stageWidth }) => stageWidth}px;
  height: ${({ stageHeight }) => stageHeight}px;
  background-color: #0e1116;
  border-radius: 20px;
  overflow: hidden;
  transform: scale(${({ scale }) => scale});
  transform-origin: top left;

  @media (max-width: 480px) {
    border-radius: 0;
  }
`;

interface ScaledViewportProps {
  children: ReactNode;
  stageWidth?: number;
  stageHeight?: number;
}

export const ScaledViewport: FC<ScaledViewportProps> = ({
  children,
  stageWidth = DEFAULT_STAGE_WIDTH,
  stageHeight = DEFAULT_STAGE_HEIGHT,
}) => {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  const computeScale = useMemo(() => {
    return () => {
      const viewportEl = viewportRef.current;
      if (!viewportEl) return;

      const style = window.getComputedStyle(viewportEl);
      const paddingX =
        Number.parseFloat(style.paddingLeft) + Number.parseFloat(style.paddingRight);
      const paddingY =
        Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom);

      const availableWidth = viewportEl.clientWidth - paddingX;
      const availableHeight = viewportEl.clientHeight - paddingY;
      // Use "cover" behavior for mobile full-screen:
      // fill both dimensions and crop overflow on the opposite axis.
      const nextScale = Math.min(
        1,
        Math.max(availableWidth / stageWidth, availableHeight / stageHeight),
      );

      // Avoid re-render loops due to tiny float deltas.
      const rounded = Math.max(0, Math.floor(nextScale * 1000) / 1000);
      setScale((prev) => (prev === rounded ? prev : rounded));
    };
  }, [stageHeight, stageWidth]);

  useLayoutEffect(() => {
    computeScale();

    const viewportEl = viewportRef.current;
    if (!viewportEl) return;

    const ro = new ResizeObserver(() => computeScale());
    ro.observe(viewportEl);

    window.addEventListener('resize', computeScale);
    window.addEventListener('orientationchange', computeScale);

    // Some mobile WebViews change the visual viewport without firing window resize.
    const vv = window.visualViewport;
    vv?.addEventListener('resize', computeScale);
    vv?.addEventListener('scroll', computeScale);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', computeScale);
      window.removeEventListener('orientationchange', computeScale);
      vv?.removeEventListener('resize', computeScale);
      vv?.removeEventListener('scroll', computeScale);
    };
  }, [computeScale]);

  return (
    <Viewport ref={viewportRef}>
      <ScaledStage scale={scale} stageWidth={stageWidth} stageHeight={stageHeight}>
        <StageSurface scale={scale} stageWidth={stageWidth} stageHeight={stageHeight}>
          {children}
        </StageSurface>
      </ScaledStage>
    </Viewport>
  );
};

