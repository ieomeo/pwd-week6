const model = require('../models/submissionModel');
const AppError = require('../utils/AppError');
const REQUIRED = ['restaurantName', 'category', 'location'];
const ALLOWED_STATUS = ['pending', 'approved', 'rejected'];

function validateCreate(body) {
  for (const key of REQUIRED) {
    if (typeof body[key] !== 'string' || !body[key].trim()) {
      throw new AppError(400, `${key}은(는) 필수입니다.`);
    }
  }
}

exports.list = (status) => {
  if (status && !ALLOWED_STATUS.includes(status)) {
    throw new AppError(400, '유효하지 않은 status 필터입니다.');
  }
  return model.findAll(status);
};

exports.get = (id) => {
  const item = model.findById(id);
  if (!item) throw new AppError(404, '제보를 찾을 수 없습니다.');
  return item;
};

exports.create = (body) => {
  validateCreate(body);
  return model.create({
    restaurantName: body.restaurantName.trim(),
    category: body.category,
    location: body.location.trim(),
    content: body.content || '',
  });
};

exports.updateStatus = (id, status) => {
  if (!ALLOWED_STATUS.includes(status)) {
    throw new AppError(400, '허용되지 않는 status 값입니다.');
  }
  const item = model.update(id, { status });
  if (!item) throw new AppError(404, '제보를 찾을 수 없습니다.');
  return item;
};

exports.remove = (id) => model.remove(id);
