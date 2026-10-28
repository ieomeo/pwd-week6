const model = require('../models/restaurantModel');
const AppError = require('../utils/AppError');
const REQUIRED = ['name', 'category', 'location'];

function validate(body) {
  for (const key of REQUIRED) {
    if (typeof body[key] !== 'string' || !body[key].trim()) {
      throw new AppError(400, `${key}은(는) 필수입니다.`);
    }
  }
}

exports.list = () => model.findAll();
exports.popular = () =>
  [...model.findAll()].sort((a, b) => b.rating - a.rating).slice(0, 5);
exports.get = (id) => {
  const item = model.findById(id);
  if (!item) throw new AppError(404, '맛집을 찾을 수 없습니다.');
  return item;
};
exports.create = (body) => {
  validate(body);
  return model.create({
    name: body.name.trim(),
    category: body.category,
    location: body.location.trim(),
    priceRange: body.priceRange,
    description: body.description,
    image: body.image,
    rating: body.rating ?? 0,
    recommendedMenu: body.recommendedMenu ?? [],
    likes: 0,
  });
};
exports.update = (id, body) => {
  const item = model.update(id, body);
  if (!item) throw new AppError(404, '맛집을 찾을 수 없습니다.');
  return item;
};
exports.remove = (id) => model.remove(id);
