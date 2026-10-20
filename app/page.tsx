import Link from "next/link";
import ApplicationForm from "@/components/ApplicationForm";

const OFFERS = [
  {
    title: "Микрогрант",
    description: "Небольшая финансовая поддержка, чтобы команда могла сфокусироваться на продукте, а не на выживании.",
  },
  {
    title: "Продуктовая обратная связь",
    description: "Разбор продукта, гипотез и метрик от людей, которые работали с десятками ИИ-стартапов.",
  },
  {
    title: "Упаковка питча",
    description: "Помогаем сформулировать ценность, рынок и план так, чтобы инвесторы понимали вас за три минуты.",
  },
  {
    title: "Пилотные интро",
    description: "Первые знакомства с потенциальными пилотными клиентами и партнёрами.",
  },
];

const FAQ = [
  {
    question: "На какой стадии должен быть стартап?",
    answer:
      "Мы работаем с командами на самой ранней стадии: от идеи с прототипом до MVP с первыми пользователями.",
  },
  {
    question: "Какой размер микрогранта?",
    answer:
      "Размер гранта обсуждается индивидуально и зависит от стадии проекта и потребностей команды.",
  },
  {
    question: "Сколько времени занимает рассмотрение заявки?",
    answer: "Мы отвечаем в течение недели после получения заявки.",
  },
  {
    question: "Какие команды вы не рассматриваете?",
    answer:
      "Мы фокусируемся на ИИ-стартапах и не рассматриваем проекты без работающего прототипа или MVP.",
  },
];

const ACCENT_SQUARE = "h-2.5 w-2.5 rounded-[2px] bg-gradient-to-br from-amber-400 to-orange-500";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      {/* Hero */}
      <section className="text-center">
        <p className="bg-gradient-to-r from-amber-400 via-orange-500 to-orange-600 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
          Vibe Venture
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Инвестируем в ИИ-стартапы на ранней стадии
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Ищем команды с понятной проблемой, прототипом или MVP. Даём микрогрант, продуктовую обратную связь,
          помощь с упаковкой питча и первые пилотные интро.
        </p>
        <a
          href="#apply"
          className="mt-8 inline-block rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-base font-semibold text-slate-900 shadow-sm transition hover:from-amber-600 hover:to-orange-600"
        >
          Оставить заявку
        </a>
        <div className="mt-10 flex items-end justify-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-[2px] bg-amber-400" />
          <span className="h-3 w-2 rounded-[2px] bg-amber-500" />
          <span className="h-4 w-2 rounded-[2px] bg-orange-500" />
          <span className="h-3 w-2 rounded-[2px] bg-amber-500" />
          <span className="h-2 w-2 rounded-[2px] bg-amber-400" />
        </div>
      </section>

      {/* Ценность предложения */}
      <section className="mt-16 grid gap-6 sm:grid-cols-2">
        {OFFERS.map((offer) => (
          <div key={offer.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" aria-hidden="true" />
            <div className="p-6">
              <h2 className="flex items-center gap-2.5 text-lg font-bold text-slate-900">
                <span className={ACCENT_SQUARE} aria-hidden="true" />
                {offer.title}
              </h2>
              <p className="mt-2 text-slate-600">{offer.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* О нас */}
      <section className="mt-16 rounded-2xl bg-amber-50 p-8">
        <h2 className="flex items-center gap-2.5 text-2xl font-bold text-slate-900">
          <span className={ACCENT_SQUARE} aria-hidden="true" />
          О нас
        </h2>
        <p className="mt-3 text-slate-700">
          Vibe Venture — небольшая венчурная фирма, которая делает ставку на ранние ИИ-команды. Мы верим, что
          сильная команда с понятной проблемой и работающим прототипом важнее громких цифр, поэтому начинаем
          работать со стартапами на самой ранней стадии.
        </p>
        <Link
          href="/about"
          className="mt-4 inline-block font-semibold text-amber-600 transition-colors hover:text-amber-700"
        >
          Подробнее о компании →
        </Link>
      </section>

      {/* Форма заявки */}
      <section id="apply" className="mt-16">
        <h2 className="flex items-center gap-2.5 text-2xl font-bold text-slate-900">
          <span className={ACCENT_SQUARE} aria-hidden="true" />
          Заявка на первичный отбор
        </h2>
        <p className="mt-2 text-slate-600">Расскажите о себе и своём стартапе — мы ответим в течение недели.</p>
        <ApplicationForm />
      </section>

      {/* Вопросы */}
      <section className="mt-16">
        <h2 className="flex items-center gap-2.5 text-2xl font-bold text-slate-900">
          <span className={ACCENT_SQUARE} aria-hidden="true" />
          Вопросы
        </h2>
        <p className="mt-2 text-slate-600">Частые вопросы о программе и процессе отбора.</p>
        <div className="mt-6 space-y-4">
          {FAQ.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-slate-900">
                <span className="flex items-center gap-2.5">
                  <span className={ACCENT_SQUARE} aria-hidden="true" />
                  {item.question}
                </span>
                <span className="shrink-0 text-2xl leading-none text-amber-600 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}