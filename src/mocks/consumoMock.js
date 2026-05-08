// src/mocks/consumoMock.js
// Estrutura de dado bruto: cada transação possui tipo, data, e flag recorrente.
// recorrente: true  → gasto fixo (assinatura, aluguel, salário)
// recorrente: false → gasto pontual/sazonal (viagem, lazer)
export const transacoesMock = [
  // --- Abril ---
  { id: 1,  categoria: "Salário",      tipo: "receita", valor: 4500, data: "2025-04-05", recorrente: true  },
  { id: 2,  categoria: "Alimentação",  tipo: "despesa", valor: 850,  data: "2025-04-08", recorrente: true  },
  { id: 3,  categoria: "Streaming",    tipo: "despesa", valor: 120,  data: "2025-04-01", recorrente: true  },
  { id: 4,  categoria: "Transporte",   tipo: "despesa", valor: 280,  data: "2025-04-10", recorrente: true  },
  { id: 5,  categoria: "Lazer",        tipo: "despesa", valor: 400,  data: "2025-04-15", recorrente: false },
  { id: 6,  categoria: "Saúde",        tipo: "despesa", valor: 200,  data: "2025-04-20", recorrente: false },

  // --- Maio ---
  { id: 7,  categoria: "Salário",      tipo: "receita", valor: 4500, data: "2025-05-05", recorrente: true  },
  { id: 8,  categoria: "Alimentação",  tipo: "despesa", valor: 780,  data: "2025-05-07", recorrente: true  },
  { id: 9,  categoria: "Streaming",    tipo: "despesa", valor: 120,  data: "2025-05-01", recorrente: true  },
  { id: 10, categoria: "Transporte",   tipo: "despesa", valor: 280,  data: "2025-05-10", recorrente: true  },
  { id: 11, categoria: "Viagem",       tipo: "despesa", valor: 1200, data: "2025-05-18", recorrente: false },
  { id: 12, categoria: "Restaurante",  tipo: "despesa", valor: 350,  data: "2025-05-25", recorrente: false },
];