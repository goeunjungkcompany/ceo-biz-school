import { ImageResponse } from "next/og";

// 공유(카톡·슬랙·트위터 등) 시 표시되는 대표 이미지. 자동 생성됨.
export const alt = "CEO Business School — Knowledge Renewed, Strategy Renewed";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// CJK 폰트 임베드가 필요없도록 라틴 문자만 사용
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1428a0",
          color: "#ffffff",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ height: 6, width: 120, background: "#4f8bff" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#9db8ff",
            }}
          >
            CEO Business School
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 24,
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            <span>Knowledge Renewed,</span>
            <span>Strategy Renewed</span>
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#c9d7ff" }}>
          Research · Education · Advisory · Network
        </div>
      </div>
    ),
    { ...size }
  );
}
