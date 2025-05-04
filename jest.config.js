module.exports = {
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.(js|jsx)", "**/?(*.)+(spec|test).(js|jsx)"],
};
