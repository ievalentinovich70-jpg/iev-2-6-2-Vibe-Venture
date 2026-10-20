"use client";

import { useState, type FormEvent } from "react";
import { applicationSchema } from "@/lib/validation";

const STAGE_LABELS: Record<string, string> = {
  idea: "Идея",
  prototype: "Прототип",
  mvp: "MVP",
};

interface FormValues {
  founderName: string;
  email: string;
  companyName: string;
  problem: string;
  stage: string;
  pitch: string;
}

const EMPTY_VALUES: FormValues = {
  founderName: "",
  email: "",
  companyName: "",
  problem: "",
  stage: "",
  pitch: "",
};

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200";
const errorClass = "mt-1 text-sm text-red-600";

export default function ApplicationForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleChange(name: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      const next = { ...fieldErrors };
      delete next[name];
      setFieldErrors(next);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerErrors([]);
    setStatus("loading");

    // Клиентская валидация — та же Zod-схема, что и на сервере
    const result = applicationSchema.safeParse(values);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = String(issue.path[0] ?? "");
        if (field && !next[field]) {
          next[field] = issue.message;
        }
      }
      setFieldErrors(next);
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (res.status === 201) {
        setStatus("success");
        setValues(EMPTY_VALUES);
        setFieldErrors({});
        return;
      }

      const payload = await res.json();
      const messages = Array.isArray(payload.errors)
        ? payload.errors.map((e: { message?: string }) => e.message ?? "Ошибка валидации")
        : ["Не удалось отправить заявку"];
      setServerErrors(messages);
      setStatus("error");
    } catch {
      setServerErrors(["Не удалось отправить заявку. Попробуйте ещё раз."]);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-6 rounded-2xl border border-green-300 bg-green-50 p-6">
        <h3 className="text-lg font-bold text-green-800">Заявка отправлена</h3>
        <p className="mt-2 text-green-700">
          Спасибо! Мы получили вашу заявку на первичный отбор и ответим в течение недели.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-green-700 underline hover:text-green-900"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-6 grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label htmlFor="founderName" className="block text-sm font-semibold text-slate-700">
          Имя основателя
        </label>
        <input
          id="founderName"
          name="founderName"
          type="text"
          value={values.founderName}
          onChange={(e) => handleChange("founderName", e.target.value)}
          placeholder="Иван Петров"
          className={inputClass}
        />
        {fieldErrors.founderName && <p className={errorClass}>{fieldErrors.founderName}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="ivan@startup.ru"
          className={inputClass}
        />
        {fieldErrors.email && <p className={errorClass}>{fieldErrors.email}</p>}
      </div>

      <div>
        <label htmlFor="companyName" className="block text-sm font-semibold text-slate-700">
          Название стартапа
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          value={values.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
          placeholder="NeuroFlow"
          className={inputClass}
        />
        {fieldErrors.companyName && <p className={errorClass}>{fieldErrors.companyName}</p>}
      </div>

      <div>
        <label htmlFor="problem" className="block text-sm font-semibold text-slate-700">
          Какая проблема?
        </label>
        <textarea
          id="problem"
          name="problem"
          rows={4}
          value={values.problem}
          onChange={(e) => handleChange("problem", e.target.value)}
          placeholder="Опишите проблему, которую решает ваш стартап (минимум 20 символов)"
          className={inputClass}
        />
        {fieldErrors.problem && <p className={errorClass}>{fieldErrors.problem}</p>}
      </div>

      <div>
        <label htmlFor="stage" className="block text-sm font-semibold text-slate-700">
          Стадия проекта
        </label>
        <select
          id="stage"
          name="stage"
          value={values.stage}
          onChange={(e) => handleChange("stage", e.target.value)}
          className={inputClass}
        >
          <option value="">Выберите стадию</option>
          {Object.entries(STAGE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {fieldErrors.stage && <p className={errorClass}>{fieldErrors.stage}</p>}
      </div>

      <div>
        <label htmlFor="pitch" className="block text-sm font-semibold text-slate-700">
          Короткий питч
        </label>
        <textarea
          id="pitch"
          name="pitch"
          rows={4}
          value={values.pitch}
          onChange={(e) => handleChange("pitch", e.target.value)}
          placeholder="Расскажите о решении и команде (минимум 20 символов)"
          className={inputClass}
        />
        {fieldErrors.pitch && <p className={errorClass}>{fieldErrors.pitch}</p>}
      </div>

      {serverErrors.length > 0 && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-800">Не удалось отправить заявку:</p>
          <ul className="mt-1 list-disc space-y-1 text-sm text-red-700">
            {serverErrors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg bg-violet-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Отправляем…" : "Отправить заявку"}
      </button>
    </form>
  );
}