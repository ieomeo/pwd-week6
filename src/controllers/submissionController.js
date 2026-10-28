const service = require('../services/submissionService');

exports.list = async (req, res) => res.json({ data: service.list(req.query.status) });
exports.get = async (req, res) => res.json({ data: service.get(req.params.id) });
exports.create = async (req, res) => res.status(201).json({ data: service.create(req.body) });
exports.updateStatus = async (req, res) => res.json({ data: service.updateStatus(req.params.id, req.body.status) });
exports.remove = async (req, res) => { service.remove(req.params.id); res.status(204).end(); };
