const errorType = require("../constant/error_type.js");
const errHandler = (err, ctx) => {
  let message, status;
  console.log(err.message);
  switch (err.message) {

    default:
      message = "NOT FOUNT";
      status = 404;
  }
  ctx.response.status = status;
  ctx.response.body = message;
};

module.exports = errHandler;
