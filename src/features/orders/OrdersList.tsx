import { useEffect, useState } from "react";
import { getJSON } from "../../services/http";
import type { Pedido } from "./orders.types";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { Eye } from "lucide-react";

export function OrdersList() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [erro, setErro] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJSON<Pedido[]>("/Orders")
      .then((data) => setPedidos(data))
      .catch((e) => setErro(String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <Link
          to="/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <strong>Adicionar Pedido +</strong>
        </Link>
      </div>

      {erro && <p className="text-red-600">{erro}</p>}

      <div className="p-4 shadow-lg rounded-2xl bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado em</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pedidos.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    Sem pedidos
                  </td>
                </tr>
              )}
              {pedidos.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{p.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.cliente}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.produto}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ {p.valor.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        p.status === "Pendente"
                          ? "bg-yellow-100 text-yellow-800"
                          : p.status === "Processando"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(p.data_criacao).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-3">
                    <Link
                      to={`/order/${p.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 transition"
                      title="Visualizar"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
