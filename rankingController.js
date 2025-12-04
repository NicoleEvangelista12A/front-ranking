import { openDb } from "./database.js";

// Buscar ranking inteiro ordenado
export async function getRanking(request, response) {
  const db = await openDb();
  const ranking = await db.all("SELECT * FROM ranking ORDER BY pontos DESC");
  response.json(ranking);
}

// Adicionar um novo jogador ao ranking
export async function addPlayer(request, response) {
  const { nome, pontos } = request.body;

  if (!nome || pontos === undefined) {
    return response.status(400).json({ error: "Envie nome e pontos!" });
  }

  const db = await openDb();
  await db.run("INSERT INTO ranking (nome, pontos) VALUES (?, ?)", [
    nome,
    pontos,
  ]);

  response.json({ message: "Jogador adicionado!" });
}

// Resetar ranking (opcional)
export async function resetRanking(request, response) {
  const db = await openDb();
  await db.run("DELETE FROM ranking");
  response.json({ message: "Ranking resetado!" });
}
