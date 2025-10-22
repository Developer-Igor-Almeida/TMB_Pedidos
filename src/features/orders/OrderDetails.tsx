import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getJSON } from "../../services/http";
import type { Pedido } from "./orders.types";
import { Card } from "../../components/Card";
import { Loader } from "../../components/Loader";

export function OrderDetails() {
  const { id } = useParams();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [erro, setErro] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getJSON<Pedido>(`/Orders/${id}`)
      .then(setPedido)
      .catch((e) => setErro(String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (erro) return <p className="text-red-600 p-6">{erro}</p>;
  if (!pedido) return <p className="p-6">Pedido não encontrado</p>;

  return (
    <div className="max-w-xl mx-auto mt-8">
      <Card>
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">
            Pedido #{pedido.id}
          </h1>

          <div className="space-y-3 text-gray-700">
            <p><span className="font-semibold">Cliente:</span> {pedido.cliente}</p>
            <p><span className="font-semibold">Produto:</span> {pedido.produto}</p>
            <p><span className="font-semibold">Valor:</span> R$ {pedido.valor.toFixed(2)}</p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  pedido.status === "Pendente"
                    ? "bg-yellow-100 text-yellow-800"
                    : pedido.status === "Processando"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {pedido.status}
              </span>
            </p>
            <p>
              <span className="font-semibold">Criado em:</span>{" "}
              {new Date(pedido.data_criacao).toLocaleString()}
            </p>
          </div>

          <div className="mt-6">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Voltar para pedidos
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
