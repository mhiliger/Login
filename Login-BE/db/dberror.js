module.exports = class DatabaseError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "DatabaseError";
  }
};
