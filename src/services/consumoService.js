import api from './api';

export async function buscarProdutos() {
  try {
    const response = await api.get('/products');

    return response.data.products;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);

    return [];
  }
}