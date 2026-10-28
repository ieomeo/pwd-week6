const AppError = require('../utils/AppError');
module.exports = (req, res, next) => next(new AppError(404, `${req.method} ${req.originalUrl} 경로가 없습니다.`));
