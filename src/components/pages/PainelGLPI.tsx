// src/pages/PainelGLPI.tsx

import { useEffect, useState } from "react";
import axios from "axios";



type Chamado = {
  id: number;
  titulo: string;
  solicitante: string;
  tecnico: string;
  tempo_aberto: string;
  sla: string;
};

export default function PainelGLPI() {
  const [chamados, setChamados] = useState<Chamado[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/chamados")
  .then((res) => setChamados(res.data as Chamado[]))

  .catch((err) => console.error(err));

  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Painel de Chamados GLPI</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => window.location.reload()}
        >
          Atualizar
        </button>
      </div>

      <div className="overflow-auto rounded shadow bg-white">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-800 text-white text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Título</th>
              <th className="p-3">Solicitante</th>
              <th className="p-3">Técnico</th>
              <th className="p-3">Tempo Aberto</th>
              <th className="p-3">SLA</th>
            </tr>
          </thead>
          <tbody>
            {chamados.map((c) => {
              let bg = "bg-green-100";
              if (parseInt(c.tempo_aberto) >= parseInt(c.sla)) bg = "bg-red-100";
              else if (parseInt(c.tempo_aberto) >= parseInt(c.sla) / 2) bg = "bg-yellow-100";

              return (
                <tr key={c.id} className={`${bg} border-b`}>
                  <td className="p-3">{c.id}</td>
                  <td className="p-3">{c.titulo}</td>
                  <td className="p-3">{c.solicitante}</td>
                  <td className="p-3">{c.tecnico}</td>
                  <td className="p-3">{c.tempo_aberto}</td>
                  <td className="p-3">{c.sla}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
