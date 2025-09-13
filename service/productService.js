const products = [];

function validateProduct(product) {
  if (!product.id || !product.name || product.quantity == null) {
    return false;
  }
  return true;
}

module.exports = {
  getAll: () => products,
  getById: (id) => products.find(p => p.id === id),
  create: (data) => {
    if (!validateProduct(data)) throw new Error('Dados inválidos');
    products.push(data);
    return data;
  },
  update: (id, data) => {
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Produto não encontrado');
    products[idx] = { ...products[idx], ...data };
    return products[idx];
  },
  delete: (id) => {
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Produto não encontrado');
    products.splice(idx, 1);
    return true;
  },
  entry: (id, qty) => {
    const product = products.find(p => p.id === id);
    if (!product) throw new Error('Produto não encontrado');
    if (qty <= 0) throw new Error('Quantidade inválida');
    product.quantity += qty;
    return product;
  },
  output: (id, qty) => {
    const product = products.find(p => p.id === id);
    if (!product) throw new Error('Produto não encontrado');
    if (qty <= 0) throw new Error('Quantidade inválida');
    if (product.quantity < qty) throw new Error('Movimentação inválida');
    product.quantity -= qty;
    return product;
  }
};
