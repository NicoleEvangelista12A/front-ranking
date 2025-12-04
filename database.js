import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Abrir conexão com o banco
export async function openDb() {
  return open({
    filename: "./ranking.db",
    driver: sqlite3.Database,
  });
}

// Criar tabela do ranking
export async function createTable() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS ranking (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      pontos INTEGER NOT NULL
    );
  `);
}
