import fs from "fs";
import path from "path";
import { listApplications, type ApplicationRow } from "../lib/db";

const EXPORTS_DIR = path.join(process.cwd(), "exports");
const CSV_PATH = path.join(EXPORTS_DIR, "applications.csv");

const COLUMNS: (keyof ApplicationRow)[] = [
  "id",
  "founder_name",
  "email",
  "company_name",
  "problem",
  "stage",
  "pitch",
  "created_at",
];

/** Экранирует значение для CSV (запятые, кавычки, переводы строк) */
function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

async function main() {
  const rows = await listApplications();

  if (!fs.existsSync(EXPORTS_DIR)) {
    fs.mkdirSync(EXPORTS_DIR, { recursive: true });
  }

  const lines: string[] = [COLUMNS.join(",")];
  for (const row of rows) {
    const values = COLUMNS.map((col) => csvEscape(String(row[col] ?? "")));
    lines.push(values.join(","));
  }

  // UTF-8 BOM — чтобы Excel на Windows корректно открывал файл
  const content = "\uFEFF" + lines.join("\n") + "\n";
  fs.writeFileSync(CSV_PATH, content, "utf-8");

  console.log(`Выгружено заявок: ${rows.length}`);
  console.log(`Файл: ${CSV_PATH}`);
}

main().catch((err) => {
  console.error("Ошибка выгрузки:", err);
  process.exit(1);
});