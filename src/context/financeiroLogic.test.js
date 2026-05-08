import { 
  calcularTotais, 
  calcularSaldo, 
  agruparPorCategoria, 
  detectarPadroes, 
  gerarInsights, 
  agruparPorMes 
} from './financeiroLogic';

const mockTransacoes = [
  { id: 1, categoria: 'Salário', tipo: 'receita', valor: 5000, data: '2025-01-01', recorrente: true },
  { id: 2, categoria: 'Aluguel', tipo: 'despesa', valor: 2000, data: '2025-01-05', recorrente: true },
  { id: 3, categoria: 'Lazer', tipo: 'despesa', valor: 500, data: '2025-01-10', recorrente: false },
  { id: 4, categoria: 'Internet', tipo: 'despesa', valor: 100, data: '2025-01-15', recorrente: true },
  { id: 5, categoria: 'Alimentação', tipo: 'despesa', valor: 300, data: '2025-02-01', recorrente: true },
];

describe('Financeiro Logic', () => {
  test('calcularTotais soma receitas e despesas corretamente', () => {
    const totais = calcularTotais(mockTransacoes);
    expect(totais.totalReceitas).toBe(5000);
    expect(totais.totalDespesas).toBe(2900);
  });

  test('calcularSaldo subtrai despesas de receitas', () => {
    const totais = { totalReceitas: 5000, totalDespesas: 2900 };
    expect(calcularSaldo(totais)).toBe(2100);
  });

  test('agruparPorCategoria soma valores por categoria', () => {
    const grupos = agruparPorCategoria(mockTransacoes);
    expect(grupos['Aluguel']).toBe(2000);
    expect(grupos['Lazer']).toBe(500);
    expect(grupos['Alimentação']).toBe(300);
  });

  test('detectarPadroes separa fixos de sazonais', () => {
    const padroes = detectarPadroes(mockTransacoes);
    expect(padroes.gastoFixoTotal).toBe(2400); // 2000 (aluguel) + 100 (internet) + 300 (alimentação)
    expect(padroes.gastoSazonalTotal).toBe(500); // lazer
  });

  test('gerarInsights retorna mensagens apropriadas', () => {
    const gastos = { 'Aluguel': 2000 };
    const padroes = { gastoFixoTotal: 2000, gastoSazonalTotal: 0 };
    const insights = gerarInsights(3000, padroes, gastos);
    
    expect(insights.some(i => i.tipo === 'positivo')).toBe(true);
    expect(insights.some(i => i.mensagem.includes('Aluguel'))).toBe(true);
  });

  test('agruparPorMes agrupa dados por YYYY-MM', () => {
    const meses = agruparPorMes(mockTransacoes);
    expect(meses['2025-01']).toEqual({ receita: 5000, despesa: 2600 });
    expect(meses['2025-02']).toEqual({ receita: 0, despesa: 300 });
  });
});
