import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJSON, postJSON } from "./http";
import type { Pedido, NovoPedido } from "./types";
import "./index.css";

/* LISTAR */
function OrdersList() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [erro, setErro] = useState<string>();

  useEffect(() => {
    getJSON <Pedido[]>("/orders")
      .then(setPedidos)
      .catch((e) => setErro(String(e)));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold">TMB Pedidos</h1>
      <div className="mt-3">
        <Link to="/new" className="text-blue-600 underline">Novo</Link>
      </div>

      {erro && <p className="mt-4 text-red-600">{erro}</p>}

      <table className="mt-4 w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Cliente</th>
            <th className="p-2 border">Produto</th>
            <th className="p-2 border">Valor</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Criado em</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.cliente}</td>
              <td className="border p-2">{p.produto}</td>
              <td className="border p-2">R$ {p.valor.toFixed(2)}</td>
              <td className="border p-2">{p.status}</td>
              <td className="border p-2">{new Date(p.data_criacao).toLocaleString()}</td>
              <td className="border p-2">
                <Link className="text-blue-600 underline" to={`/order/${p.id}`}>Ver</Link>
              </td>
            </tr>
          ))}
          {pedidos.length === 0 && (
            <tr><td className="p-4 text-gray-500 text-center" colSpan={7}>Sem pedidos</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* CRIAR */
function OrderNew() {
  const [cliente, setCliente] = useState("");
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState<number>(0);
  const [erro, setErro] = useState<string>();
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErro(undefined);
    const body: NovoPedido = { cliente, produto, valor: Number(valor) };
    try {
      await postJSON<Pedido, NovoPedido>("/orders", body);
      nav("/");
    } catch (e) {
      setErro(String(e));
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Novo pedido</h1>
      {erro && <p className="mb-3 text-red-600">{erro}</p>}
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border p-2" placeholder="Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} required />
        <input className="w-full border p-2" placeholder="Produto" value={produto} onChange={(e) => setProduto(e.target.value)} required />
        <input className="w-full border p-2" placeholder="Valor" type="number" step="0.01"
               value={valor} onChange={(e) => setValor(Number(e.target.value))} required />
        <button className="bg-blue-600 text-white px-3 py-2 rounded w-full">Salvar</button>
      </form>
    </div>
  );
}

/* DETALHES */
function OrderDetails() {
  const { id } = useParams();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [erro, setErro] = useState<string>();

  useEffect(() => {
    if (!id) return;
    getJSON <Pedido>(`/orders/${id}`)
      .then(setPedido)
      .catch((e) => setErro(String(e)));
  }, [id]);

  if (erro) return <p className="p-6 text-red-600">{erro}</p>;
  if (!pedido) return <p className="p-6">Carregando...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Pedido #{pedido.id}</h1>
      <div className="space-y-1">
        <p><b>Cliente:</b> {pedido.cliente}</p>
        <p><b>Produto:</b> {pedido.produto}</p>
        <p><b>Valor:</b> R$ {pedido.valor.toFixed(2)}</p>
        <p><b>Status:</b> {pedido.status}</p>
        <p><b>Criado em:</b> {new Date(pedido.data_criacao).toLocaleString()}</p>
      </div>
    </div>
  );
}

/* APP */
export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-blue-700 text-white p-4">
        <div className="max-w-6xl mx-auto flex gap-4">
          <Link to="/" className="font-semibold">TMB Pedidos</Link>
          <Link to="/new" className="underline">Novo</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<OrdersList />} />
        <Route path="/new" element={<OrderNew />} />
        <Route path="/order/:id" element={<OrderDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
