class CustomError extends Error {
  constructor(type = '', message = '', ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.type = type;
    this.message = message;
    this.date = new Date();
  }
}

module.exports = CustomError;
