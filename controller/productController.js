const service = require('../service/productService');

exports.getAll = (req, res) => {
  res.json(service.getAll());
};

exports.getById = (req, res) => {
  const product = service.getById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(product);
};

exports.create = (req, res) => {
  try {
    const { id, name, quantity } = req.body;
    const product = service.create({ id, name, quantity });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = (req, res) => {
  try {
    const product = service.update(req.params.id, req.body);
    res.json(product);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.delete = (req, res) => {
  try {
    service.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.entry = (req, res) => {
  if (!req.headers.authorization || req.headers.authorization !== 'Bearer token123') {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  try {
    const { qty } = req.body;
    const product = service.entry(req.params.id, qty);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.output = (req, res) => {
  if (!req.headers.authorization || req.headers.authorization !== 'Bearer token123') {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  try {
    const { qty } = req.body;
    const product = service.output(req.params.id, qty);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
