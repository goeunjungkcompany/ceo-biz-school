import { cookies } from "next/headers";

export type Locale = "ko" | "en";

/** 서버 컴포넌트에서 현재 언어를 읽습니다. (쿠키 "locale", 기본 ko) */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  return store.get("locale")?.value === "en" ? "en" : "ko";
}

/** {ko, en} 객체에서 현재 언어 값을 선택 */
export function pick<T>(locale: Locale, pair: { ko: T; en: T }): T {
  return pair[locale];
}
