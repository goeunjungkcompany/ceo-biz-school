/**
 * 짧은 설명 문구를 두 줄로 끊되, **아랫줄이 윗줄보다 (같거나) 길도록** 균형 있게 나눈다.
 * (text-wrap:balance 는 위아래를 "균등"하게만 맞춰 윗줄이 더 길어지는 경우가 있어 이를 보완)
 *
 * - 대략 2줄 분량(<= limit 글자)일 때만 강제 개행한다.
 *   더 길어서 3줄 이상이 되는 문구는 강제로 끊으면 오히려 어색하므로 그대로 자연 줄바꿈.
 * - 가장 균형에 가까우면서 (윗줄 길이 ≤ 아랫줄 길이) 를 만족하는 지점에서 끊는다.
 */
export function Balanced({ text, limit = 46 }: { text: string; limit?: number }) {
  const words = text.split(" ");
  if (words.length < 3 || text.length > limit) return <>{text}</>;

  let split = 1;
  for (let i = 1; i < words.length; i++) {
    const top = words.slice(0, i).join(" ").length;
    const bottom = words.slice(i).join(" ").length;
    if (top <= bottom) split = i;
    else break;
  }

  return (
    <>
      {words.slice(0, split).join(" ")}
      <br />
      {words.slice(split).join(" ")}
    </>
  );
}
