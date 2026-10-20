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

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      {/* Hero */}
      <section className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">Vibe Venture</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Инвестируем в ИИ-стартапы на ранней стадии
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Ищем команды с понятной проблемой, прототипом или MVP. Даём микрогрант, продуктовую обратную связь,
          помощь с упаковкой питча и первые пилотные интро.
        </p>
        <a
          href="#apply"
          className="mt-8 inline-block rounded-lg bg-violet-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-violet-700"
        >
          Оставить заявку
        </a>
      </section>

      {/* Ценность предложения */}
      <section className="mt-16 grid gap-6 sm:grid-cols-2">
        {OFFERS.map((offer) => (
          <div key={offer.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">{offer.title}</h2>
            <p className="mt-2 text-slate-600">{offer.description}</p>
          </div>
        ))}
      </section>

      {/* О нас */}
      <section className="mt-16 rounded-2xl bg-violet-50 p-8">
        <h2 className="text-2xl font-bold text-slate-900">О нас</h2>
        <p className="mt-3 text-slate-700">
          Vibe Venture — небольшая венчурная фирма, которая делает ставку на ранние ИИ-команды. Мы верим, что
          сильная команда с понятной проблемой и работающим прототипом важнее громких цифр, поэтому начинаем
          работать со стартапами на самой ранней стадии.
        </p>
        <Link
          href="/about"
          className="mt-4 inline-block font-semibold text-violet-700 transition-colors hover:text-violet-900"
        >
          Подробнее о компании →
        </Link>
      </section>

      {/* Форма заявки */}
      <section id="apply" className="mt-16">
        <h2 className="text-2xl font-bold text-slate-900">Заявка на первичный отбор</h2>
        <p className="mt-2 text-slate-600">Расскажите о себе и своём стартапе — мы ответим в течение недели.</p>
        <ApplicationForm />
      </section>
    </main>
  );
}