"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { site } from "@/lib/site";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "textarea" | "date" | "select";
  required?: boolean;
  options?: string[];
  placeholder?: string;
};

export function RequestForm({
  endpoint,
  fields,
  subject,
  cta = "Send request",
}: {
  endpoint: string;
  fields: Field[];
  subject: string;
  cta?: string;
}) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(values: Record<string, unknown>) {
    setError("");
    if (!endpoint) {
      // No Formspree id configured yet: fall back to a direct email so nothing is lost.
      const body = Object.entries(values).map(([k, v]) => `${k}: ${v}`).join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    try {
      const res = await fetch(`https://formspree.io/f/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, _subject: subject }),
      });
      if (res.ok) setSent(true);
      else setError("Something went wrong. Please email Rupali directly.");
    } catch {
      setError("Network error. Please email Rupali directly.");
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-line bg-gold/5 p-8 text-center">
        <h3 className="text-2xl text-cream">Thank you</h3>
        <p className="mt-3 text-muted">Your request has been received. Rupali responds personally to relevant enquiries.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-line-2 bg-panel p-6 md:p-8">
      <div className="grid gap-5">
        {fields.map((f) => {
          const reg = register(f.name, {
            required: f.required ? `${f.label} is required` : false,
            ...(f.type === "email" ? { pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" } } : {}),
          });
          const base = "w-full rounded-lg border border-line-2 bg-bg px-4 py-3 text-sm text-cream outline-none focus:border-line";
          return (
            <div key={f.name} className="grid gap-2">
              <label className="text-xs uppercase tracking-wider text-muted">{f.label}{f.required ? " *" : ""}</label>
              {f.type === "textarea" ? (
                <textarea {...reg} rows={4} placeholder={f.placeholder} className={base} />
              ) : f.type === "select" ? (
                <select {...reg} className={base} defaultValue="">
                  <option value="" disabled>Select one</option>
                  {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input {...reg} type={f.type || "text"} placeholder={f.placeholder} className={base} />
              )}
              {errors[f.name] ? <span className="text-xs text-red-400">{String(errors[f.name]?.message)}</span> : null}
            </div>
          );
        })}
      </div>
      {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}
      <button type="submit" disabled={isSubmitting} className="btn btn-solid mt-6 w-full justify-center">
        {isSubmitting ? "Sending..." : cta}
      </button>
      <p className="mt-3 text-center text-xs text-muted">
        Prefer email? <a href={`mailto:${site.email}`} className="text-gold-2 underline">{site.email}</a>
      </p>
    </form>
  );
}
