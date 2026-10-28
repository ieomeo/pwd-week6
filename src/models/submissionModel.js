const { randomUUID } = require('node:crypto');
let items = [];
const same = (a, b) => String(a) === String(b);

exports.reset = () => { items = []; };
exports.findAll = (status) => {
  if (status) return items.filter(s => s.status === status);
  return items;
};
exports.findById = (id) => items.find((s) => same(s.id, id));
exports.create = (data) => {
  const item = { ...data, id: randomUUID(), status: 'pending', createdAt: new Date() };
  items.push(item);
  return item;
};
exports.update = (id, data) => {
  const i = items.findIndex((s) => same(s.id, id));
  if (i === -1) return undefined;
  items[i] = { ...items[i], ...data, id: items[i].id };
  return items[i];
};
exports.remove = (id) => { items = items.filter((s) => !same(s.id, id)); };
