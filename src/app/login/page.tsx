import { redirect } from "next/navigation";
import { WRAP, PageHeader } from "@/components/ui";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import LoginForm from "./LoginForm";

export const metadata = { title: "로그인 | CEO Business School" };

export default async function LoginPage() {
  // 이미 로그인했으면 내 정보로
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/account");

  return (
    <main>
      <PageHeader
        eyebrow="Members"
        title="로그인 · 회원가입"
        desc="CEO 비즈니스 스쿨 회원 서비스에 오신 것을 환영합니다."
      />
      <section className={`${WRAP} py-20`}>
        <LoginForm />
      </section>
    </main>
  );
}
