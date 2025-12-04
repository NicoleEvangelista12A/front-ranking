import express from "express";
import cors from "cors";
import { createTable } from "./database.js";
import { getRanking, addPlayer, resetRanking } from "./rankingController.js";

const app = express();
const port = 3006;

app.use(cors());
app.use(express.json());

// Criar tabela ao iniciar servidor
createTable();

// Rotas
app.get("/ranking", getRanking);
app.post("/ranking", addPlayer);
app.delete("/ranking", resetRanking); // opcional

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port},`);
});
