import 'dotenv/config'

import express from "express"
import mysql from "mysql2"
import cors from "cors"

const {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST} = process.env

const app = express()
const port = 3006
app.use(cors())
app.use(express.json())

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});

app.post("/pontuar", (req, res) => {
  const { username, points } = req.body;
  if (!username || !points) return res.status(400).json({ error: "Dados incompletos" });

  const query = `
    INSERT INTO scores (username, points)
    VALUES (?, ?)
  `;
  db.query(query, [username, points], (err) => {
    if (err) return res.status(500).json({ error: "Erro ao salvar pontuação" });
    res.json({ message: "Pontuação salva com sucesso!" });
  });
});

app.get("/ranking", (req, res) => {
  const query = `
    SELECT username, SUM(points) as total_points
    FROM scores
    GROUP BY username
    ORDER BY total_points DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar ranking" });
    res.json(results);
  });
});

app.get("/podio", (req, res) => {
  const query = `
    SELECT username, SUM(points) as total_points
    FROM scores
    GROUP BY username
    ORDER BY total_points DESC
    LIMIT 3
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar pódio" });
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
