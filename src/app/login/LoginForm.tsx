"use client";

import { useActionState, useState } from "react";
import { signIn, signUp, type AuthState } from "./actions";

const inputCls =
  "w-full border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none";
const labelCls = "font-mono text-[11px] uppercase tracking-[0.15em] text-muted";
const initial: AuthState = { status: "idle" };

export default function LoginForm() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [inState, inAction, inPending] = useActionState(signIn, initial);
  const [upState, upAction, upPending] = useActionState(signUp, initial);

  const state = mode === "in" ? inState : upState;
  const pending = mode === "in" ? inPending : upPending;

  return (
    <div className="mx-auto w-full max-w-md">
      {/* 탭 */}
      <div className="flex border-b border-line">
        {(["in", "up"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex-1 pb-3 text-sm font-medium transition-colors ${
              mode === m
                ? "border-b-2 border-accent text-accent"
                : "text-muted hover:text-ink"
            }`}
          >
            {m === "in" ? "로그인" : "회원가입"}
          </button>
        ))}
      </div>

      {/* 회원가입 완료 안내 */}
      {state.status === "ok" ? (
        <div className="mt-10 border border-accent/30 bg-accent/5 p-6">
          <p className="text-sm font-semibold text-ink">{state.message}</p>
        </div>
      ) : (
        <form
          key={mode}
          action={mode === "in" ? inAction : upAction}
          className="mt-10 space-y-5"
        >
          {mode === "up" && (
            <div>
              <label htmlFor="name" className={labelCls}>이름 *</label>
              <input id="name" name="name" type="text" required autoComplete="name" className={`mt-2 ${inputCls}`} placeholder="이름" />
            </div>
          )}
          <div>
            <label htmlFor="email" className={labelCls}>이메일 *</label>
            <input id="email" name="email" type="email" required autoComplete="email" inputMode="email" className={`mt-2 ${inputCls}`} placeholder="email@example.com" />
          </div>
          <div>
            <label htmlFor="password" className={labelCls}>
              비밀번호 * {mode === "up" && <span className="normal-case tracking-normal text-muted">(8자 이상)</span>}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={mode === "up" ? 8 : undefined}
              autoComplete={mode === "in" ? "current-password" : "new-password"}
              className={`mt-2 ${inputCls}`}
              placeholder="••••••••"
            />
          </div>

          {state.status === "error" && (
            <p role="alert" className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-navy px-8 py-4 text-sm font-medium text-paper transition-colors hover:bg-ink disabled:opacity-50"
          >
            {pending ? "처리 중…" : mode === "in" ? "로그인" : "회원가입"}
          </button>
        </form>
      )}
    </div>
  );
}
