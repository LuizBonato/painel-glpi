// Importa o axios para requisições HTTP
import axios from 'axios';
// Importa dotenv e carrega as variáveis do arquivo .env
import dotenv from 'dotenv';
dotenv.config();

// Pega os valores do .env com fallback para evitar erros
const GLPI_URL = import.meta.env.VITE_GLPI_API_URL;
const APP_TOKEN = import.meta.env.VITE_GLPI_APP_TOKEN;
const USER_TOKEN = import.meta.env.VITE_GLPI_USER_TOKEN;

// Inicia uma sessão no GLPI e retorna o token de sessão
export async function iniciarSessao() {
  try {
    const resposta = await axios.post(`${GLPI_URL}/initSession`, null, {
      headers: {
        'App-Token': APP_TOKEN,
        'Authorization': `user_token ${USER_TOKEN}`
      }
    });

    const { session_token } = resposta.data as { session_token: string };
    return session_token;
  } catch (erro) {
    console.error('Erro ao iniciar sessão:', erro);
    throw erro;
  }
}

// Função para encerrar a sessão (opcional)
export async function encerrarSessao(sessionToken: string) {
  try {
    await axios.get(`${GLPI_URL}/killSession`, {
      headers: {
        'App-Token': APP_TOKEN,
        'Session-Token': sessionToken
      }
    });
  } catch (erro) {
    console.error('Erro ao encerrar sessão:', erro);
  }
}

// Consulta chamados com status e filtro de categoria
export async function buscarChamados(status: number) {
  const sessionToken = await iniciarSessao();

  try {
    const resposta = await axios.get(`${GLPI_URL}/Ticket`, {
      headers: {
        'App-Token': APP_TOKEN,
        'Session-Token': sessionToken
      },
      params: {
        // status 1 = Novo, 2 = Em andamento
        is_deleted: 0,
        // Filtro para categorias que contenham 'sistemas' ou 'infraestrutura'
        searchText: 'sistemas infraestrutura'
      }
    });

    return resposta.data;
  } catch (erro) {
    console.error('Erro ao buscar chamados:', erro);
    throw erro;
  } finally {
    await encerrarSessao(sessionToken);
  }
}
