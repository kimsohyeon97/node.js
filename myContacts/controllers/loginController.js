const asyncHandler = require("express-async-handler");

// 로그인 페이지 - GET /
const getLogin = (req, res) => {
  res.render("home");
};

module.exports = getLogin;
