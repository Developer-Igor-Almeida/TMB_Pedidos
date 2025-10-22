export type Status = "Pendente" | "processando" | "finalizado";

export interface Pedido {
  id: string;
  cliente: string;
  produto: string;
  valor: number;
  status: Status;
  data_criacao: string; // ISO
}

export interface NovoPedido {
  cliente: string;
  produto: string;
  valor: number;
}
