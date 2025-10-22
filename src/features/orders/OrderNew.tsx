import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postJSON } from "../../services/http";
import type { NovoPedido } from "./orders.types";
import type { Pedido } from "./orders.types";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function OrderNew() {
  const [cliente, setCliente] = useState("");
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState<number>(0);
  const [erro, setErro] = useState<string>();
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErro(undefined);

    try {
      const body: NovoPedido = { cliente, produto, valor };
      await postJSON<Pedido, NovoPedido>("/Orders", body);
      nav("/");
    } catch (e) {
      setErro(String(e));
    }
  }

  return (
    <div className="max-w-md mx-auto mt-6">
      <Card>
        <h1 className="text-xl font-semibold mb-4">Novo Pedido</h1>
        {erro && <p className="text-red-600 mb-3">{erro}</p>}
        <form className="space-y-3" onSubmit={submit}>
          <Input placeholder="Cliente" value={cliente} onChange={e => setCliente(e.target.value)} required />
          <Input placeholder="Produto" value={produto} onChange={e => setProduto(e.target.value)} required />
          <Input type="number" step="0.01" placeholder="Valor" value={valor} onChange={e => setValor(Number(e.target.value))} required />
          <Button type="submit">Salvar</Button>
        </form>
      </Card>
    </div>
  );
}
