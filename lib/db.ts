import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";
import type { ApplicationInput } from "./validation";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "applications.db");

/** Строка таблицы applications */
export interface ApplicationRow {
  id: number;
  founder_name: string;
  email: string;
  company_name: string;
  problem: string;
  stage: string;
  pitch: string;
  created_at: string;
}

/**
 * Открывает (при необходимости создаёт) SQLite-базу и гарантирует наличие таблицы.
 * Пакет sqlite3 работает асинхронно: данные возвращаются через колбэки.
 */
export function getDb(): sqlite3.Database {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const db = new sqlite3.Database(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS applications (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      founder_name TEXT NOT NULL,
      email        TEXT NOT NULL,
      company_name TEXT NOT NULL,
      problem      TEXT NOT NULL,
      stage        TEXT NOT NULL,
      pitch        TEXT NOT NULL,
      created_at   TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  return db;
}

/** Сохраняет заявку и возвращает её строку из базы */
export async function saveApplication(input: ApplicationInput): Promise<ApplicationRow> {
  const db = getDb();
  try {
    const lastID = await new Promise<number>((resolve, reject) => {
      db.run(
        `INSERT INTO applications (founder_name, email, company_name, problem, stage, pitch)
         VALUES (?, ?, ?, ?, ?, ?)`,
        input.founderName,
        input.email,
        input.companyName,
        input.problem,
        input.stage,
        input.pitch,
        function (this: { lastID: number; changes: number }, err: Error | null) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });

    const row = await new Promise<ApplicationRow | undefined>((resolve, reject) => {
      db.get("SELECT * FROM applications WHERE id = ?", lastID, (err: Error | null, row?: ApplicationRow) => {
        if (err) return reject(err);
        resolve(row);
      });
    });

    if (!row) {
      throw new Error("Заявка не найдена после сохранения");
    }
    return row;
  } finally {
    db.close();
  }
}

/** Возвращает все заявки, отсортированные по id */
export async function listApplications(): Promise<ApplicationRow[]> {
  const db = getDb();
  try {
    return await new Promise<ApplicationRow[]>((resolve, reject) => {
      db.all("SELECT * FROM applications ORDER BY id", (err: Error | null, rows: ApplicationRow[]) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  } finally {
    db.close();
  }
}