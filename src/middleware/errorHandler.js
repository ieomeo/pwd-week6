module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) console.error(err);
  res.status(status).json({
    error: { message: status === 500 ? '서버 오류가 발생했습니다.' : err.message },
  });
};
