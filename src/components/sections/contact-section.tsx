"use client";

import {useActionState, useRef, useEffect, useTransition} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {submitContactForm} from "@/app/actions";
import type {ContactFormState} from "@/app/actions";
import {contactSchema, type ContactFormData} from "@/lib/validations/contact";
import {Section} from "@/components/ui/section";
import {GlassCard} from "@/components/ui/glass-card";
import {GradientText} from "@/components/ui/gradient-text";
import {Button} from "@/components/ui/button";
import {FadeIn} from "@/components/animation/fade-in";
import {SlideUp} from "@/components/animation/slide-up";
import {ContactSuccess} from "@/components/sections/contact-success";
import {cn} from "@/lib/utils";

interface Social {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

interface ContactSectionProps {
  email: string;
  socials: Social[];
}

const inputBaseClass =
  "w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const inputErrorClass = "border-destructive/60 focus:border-destructive focus:ring-destructive/30";

/**
 * Contact 섹션 컴포넌트.
 * React Hook Form + Zod 클라이언트 검증 + Server Action 서버 검증을 이중으로 적용한다.
 * 전송 성공 시 폼 대신 성공 애니메이션 컴포넌트를 표시한다.
 */
export function ContactSection({email, socials}: ContactSectionProps) {
  const [serverState, serverAction, isPending] = useActionState(submitContactForm, {
    success: false,
    message: "",
  } as ContactFormState);

  const [, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // 서버 에러를 RHF에 동기화
  useEffect(() => {
    if (serverState.errors) {
      if (serverState.errors.name?.[0]) {
        setError("name", {message: serverState.errors.name[0]});
      }
      if (serverState.errors.email?.[0]) {
        setError("email", {message: serverState.errors.email[0]});
      }
      if (serverState.errors.message?.[0]) {
        setError("message", {message: serverState.errors.message[0]});
      }
    }
  }, [serverState, setError]);

  /** RHF 클라이언트 검증 통과 시 Server Action 실행 (transition 내부) */
  function onValid() {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      startTransition(() => {
        serverAction(formData);
      });
    }
  }

  return (
    <Section spacing="lg" container containerSize="md">
      <FadeIn>
        <div className="text-center">
          <GradientText as="h1" gradient="accent" className="text-3xl font-bold">
            Get in Touch
          </GradientText>
          <p className="mt-4 text-muted-foreground">
            채용 관련 문의나 커피챗이 필요하시다면 편하게 연락해 주세요 :)
            <br />
            이메일에 성함과 소속을 기재하여 주시면 더욱 빨리 연락 드리겠습니다.
            <br />
          </p>
        </div>
      </FadeIn>

      {serverState.success ? (
        <div role="status" aria-live="polite">
          <GlassCard padding="lg" className="mx-auto mt-10 max-w-xl">
            <ContactSuccess />
          </GlassCard>
        </div>
      ) : (
        <SlideUp delay={0.2}>
          <GlassCard padding="lg" className="mx-auto mt-10 max-w-xl">
            <form ref={formRef} onSubmit={handleSubmit(onValid)} className="space-y-6" noValidate>
              {/* 이름 */}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  이름
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="홍길동"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={cn(inputBaseClass, errors.name && inputErrorClass)}
                  {...register("name")}
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* 이메일 */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="hello@example.com"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={cn(inputBaseClass, errors.email && inputErrorClass)}
                  {...register("email")}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* 메시지 */}
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  메시지
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="프로젝트에 대해 알려주세요."
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={cn(inputBaseClass, "resize-none", errors.message && inputErrorClass)}
                  {...register("message")}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1.5 text-xs text-destructive">{errors.message.message}</p>
                )}
              </div>

              {/* 서버 에러 메시지 */}
              {serverState.message && !serverState.success && (
                <p role="alert" className="text-sm text-destructive">{serverState.message}</p>
              )}

              <Button type="submit" className="w-full" disabled={isPending} aria-busy={isPending}>
                {isPending ? "전송 중..." : "메시지 보내기"}
              </Button>
            </form>
          </GlassCard>
        </SlideUp>
      )}
    </Section>
  );
}
