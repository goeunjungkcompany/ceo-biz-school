"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * 설명 문구 줄바꿈 다듬기.
 * - 브라우저에서 실제로 렌더된 줄 수를 재서, **딱 2줄이 될 때만** 아랫줄이
 *   윗줄보다 (같거나) 길도록 끊는다.
 * - 한 줄에 들어가면 그대로 한 줄, 3줄 이상이면 자연 줄바꿈(억지 개행 안 함).
 * - 서버 렌더 / 초기 클라이언트 렌더는 원문 그대로라 하이드레이션 안전.
 */
export function Balanced({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [node, setNode] = useState<ReactNode>(text);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const compute = () => {
      // 자연 줄 수 측정을 위해 잠시 원문(한 덩어리)으로 되돌림
      el.textContent = text;
      const lh = parseFloat(getComputedStyle(el).lineHeight) || 20;
      const lines = Math.round(el.offsetHeight / lh);

      if (lines === 2) {
        const words = text.split(" ");
        if (words.length >= 3) {
          // 가장 균형에 가까우면서 (윗줄 길이 ≤ 아랫줄 길이) 인 지점에서 끊기
          let split = 1;
          for (let i = 1; i < words.length; i++) {
            const top = words.slice(0, i).join(" ").length;
            const bottom = words.slice(i).join(" ").length;
            if (top <= bottom) split = i;
            else break;
          }
          setNode(
            <>
              {words.slice(0, split).join(" ")}
              <br />
              {words.slice(split).join(" ")}
            </>,
          );
          return;
        }
      }
      // 1줄 또는 3줄 이상 → 원문 그대로
      setNode(text);
    };

    compute();
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return <span ref={ref}>{node}</span>;
}
