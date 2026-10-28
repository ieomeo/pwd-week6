const seed = require('../data/restaurants.json');
const { randomUUID } = require('node:crypto');
let items = structuredClone(seed);
const same = (a, b) => String(a) === String(b);

exports.reset = () => { items = structuredClone(seed); };
exports.findAll = () => items;
exports.findById = (id) => items.find((r) => same(r.id, id));
exports.create = (data) => {
  const item = { ...data, id: randomUUID() };
  items.push(item);
  return item;
};
exports.update = (id, data) => {
  const i = items.findIndex((r) => same(r.id, id));
  if (i === -1) return undefined;
  items[i] = { ...items[i], ...data, id: items[i].id };
  return items[i];
};
exports.remove = (id) => { items = items.filter((r) => !same(r.id, id)); };
