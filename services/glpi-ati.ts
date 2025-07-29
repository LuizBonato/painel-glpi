import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 3001;
const API_URL = import.meta.env.VITE_GLPI_API_URL;
const APP_TOKEN = import.meta.env.VITE_GLPI_APP_TOKEN;
const USER_TOKEN = import.meta.env.VITE_GLPI_USER_TOKEN;


interface ChamadoGLPI {
  id: number;
  name: string;
  content?: string;
  date_creation: string;
  status: number;
  users_id_recipient: number;
  users_id_lastupdater: number;
}

function decodeHTMLEntities(text: string): string {
  return text.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
             .replace(/&lt;/g, "<")
             .replace(/&gt;/g, ">")
             .replace(/&quot;/g, '"')
             .replace(/&amp;/g, "&");
}

app.get('/chamados', async (req, res) => {
  try {
    const session = await axios.post(`${GLPI_URL}/initSession`, null, {
      headers: {
        'Authorization': `user_token ${USER_TOKEN}`,
        'App-Token': APP_TOKEN
      }
    });

    const sessionToken = (session.data as { session_token: string }).session_token;

    const response = await axios.get(`${GLPI_URL}/Ticket`, {
      headers: {
        'Session-Token': sessionToken,
        'App-Token': APP_TOKEN
      }
    });

    const rawChamados = response.data as ChamadoGLPI[];

    const chamados = rawChamados.map((chamado) => ({
      id: chamado.id,
      titulo: chamado.name,
      descricao: decodeHTMLEntities(chamado.content ?? ''),
      data_criacao: chamado.date_creation,
      status: chamado.status,
      solicitante: chamado.users_id_recipient,
      tecnico: chamado.users_id_lastupdater
    }));

    res.json(chamados);
  } catch (error) {
    console.error('Erro ao buscar chamados:', error);
    res.status(500).send('Erro ao buscar chamados');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor local rodando: http://localhost:${PORT}/chamados`);
});
