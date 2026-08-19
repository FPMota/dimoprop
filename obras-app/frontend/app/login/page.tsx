"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/");
    });
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setErrorMessage("Email ou palavra-passe incorretos.");
        return;
      }

      const nextPath = new URLSearchParams(window.location.search).get("next");
      const destination = nextPath?.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/";
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        setErrorMessage("A sessão não ficou ativa. Tenta entrar novamente.");
        return;
      }
      window.location.assign(destination);
    } catch {
      setErrorMessage("Não foi possível contactar o Supabase. Verifica a ligação e tenta novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-shell">
      <div className="auth-atmosphere" aria-hidden="true">
        <span>DIMOPROP</span>
        <i />
        <i />
        <i />
      </div>
      <section className="auth-card">
        <div className="auth-brand">
          <Image className="company-logo" src="/dimoprop-logo.svg" alt="Dimoprop Construções e Remodelações" width={720} height={270} priority />
        </div>
        <div className="auth-heading">
          <p className="eyebrow">Área de trabalho</p>
          <h1 className="display-font">Bom voltar a ver-te.</h1>
          <p>Entra para veres as tuas obras, orçamento e faturas.</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email<input id="email" type="email" autoComplete="email" placeholder="antonio@exemplo.pt" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label htmlFor="password">Palavra-passe<input id="password" type="password" autoComplete="current-password" placeholder="••••••••" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          {errorMessage && <p className="auth-error" role="alert">{errorMessage}</p>}
          <button className="auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "A entrar..." : "Entrar no Dino"}<span aria-hidden="true">→</span></button>
        </form>
        <p className="auth-note"><span aria-hidden="true">●</span> Acesso privado para a equipa da obra.</p>
      </section>
    </main>
  );
}
