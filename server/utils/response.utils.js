
const responseUtil = (res, code, status, message, payload, error) => {
  res.status(code).json({
    status,
    statusCode: code,
    message,
    data: payload,
    error,
  });
};

module.exports = {response:responseUtil};
