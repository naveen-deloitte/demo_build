module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/**/tests/**/*.test.js"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx", "json"]
};
