const service = require('../services/restaurantService');

exports.list = async (req, res) => res.json({ data: service.list() });
exports.popular = async (req, res) => res.json({ data: service.popular() });
exports.get = async (req, res) => res.json({ data: service.get(req.params.id) });
exports.create = async (req, res) => res.status(201).json({ data: service.create(req.body) });
exports.update = async (req, res) => res.json({ data: service.update(req.params.id, req.body) });
exports.remove = async (req, res) => { service.remove(req.params.id); res.status(204).end(); };
