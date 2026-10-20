import Link from "next/link";

export const metadata = {
  title: "О компании — Vibe Venture",
  description: "Подробное описание Vibe Venture: миссия, подход и что мы предлагаем ИИ-стартапам.",
};

const PRINCIPLES = [
  {
    title: "Ранняя стадия",
    description: "Работаем с командами на этапе идеи, прототипа или MVP — до крупных раундов.",
  },
  {
    title: "Понятная проблема",
    description: "Ищем стартапы, которые решают конкретную боль пользователя, а не «технологию ради технологии».",
  },
  {
    title: "Продуктовый подход",
    description: "Оцениваем продукт, метрики и гипотезы, а не только презентацию.",
  },
  {
    title: "Практическая помощь",
    description: "Даём не только деньги, но и обратную связь, упаковку питча и пилотные интро.",
  },
];

const ACCENT_SQUARE = "h-2.5 w-2.5 rounded-[2px] bg-gradient-to-br from-amber-400 to-orange-500";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/" className="text-sm font-semibold text-amber-600 transition-colors hover:text-amber-700">
        ← На главную
      </Link>

      <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-slate-900">О компании</h1>

      <section className="mt-6 space-y-4 text-slate-700">
        <p>
          Vibe Venture — небольшая венчурная фирма для ИИ-стартапов на ранней стадии. Мы ищем команды
          с понятной проблемой, прототипом или MVP и помогаем им пройти путь от первой гипотезы до первых
          пилотных клиентов.
        </p>
        <p>
          Мы понимаем, что на ранней стадии стартапу нужны не только деньги. Поэтому, помимо микрогранта,
          мы даём продуктовую обратную связь, помогаем упаковать питч и знакомим с потенциальными пилотными
          клиентами.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="flex items-center gap-2.5 text-xl font-bold text-slate-900">
          <span className={ACCENT_SQUARE} aria-hidden="true" />
          Наши принципы
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" aria-hidden="true" />
              <div className="p-5">
                <h3 className="flex items-center gap-2.5 font-semibold text-slate-900">
                  <span className={ACCENT_SQUARE} aria-hidden="true" />
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl bg-amber-50 p-8">
        <h2 className="flex items-center gap-2.5 text-xl font-bold text-slate-900">
          <span className={ACCENT_SQUARE} aria-hidden="true" />
          Что мы предлагаем
        </h2>
        <ul className="mt-4 list-disc space-y-2 text-slate-700">
          <li>
            <strong>Микрогрант</strong> — небольшая финансовая поддержка на раннем этапе.
          </li>
          <li>
            <strong>Продуктовая обратная связь</strong> — разбор продукта, гипотез и метрик.
          </li>
          <li>
            <strong>Упаковка питча</strong> — подготовка презентации для инвесторов.
          </li>
          <li>
            <strong>Пилотные интро</strong> — знакомство с потенциальными пилотными клиентами.
          </li>
        </ul>
        <Link
          href="/#apply"
          className="mt-6 inline-block rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-base font-semibold text-slate-900 shadow-sm transition hover:from-amber-600 hover:to-orange-600"
        >
          Оставить заявку
        </Link>
      </section>
    </main>
  );
}