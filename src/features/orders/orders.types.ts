export type Status = "Pendente" | "Processando" | "Finalizado";

export interface Pedido {
  id: number;
  cliente: string;
  produto: string;
  valor: number;
  status: Status;
  data_criacao: string;
}

export interface NovoPedido {
  cliente: string;
  produto: string;
  valor: number;
}
