module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2020,
    sourceType: "module"
  },
  env: {
    browser: true
  },
  extends: ["plugin:vue/essential", "prettier"],
  plugins: ["vue"],
  globals: {
    ga: "readonly",
    cordova: "readonly",
    __statics: "readonly",
    process: "readonly",
    Capacitor: "readonly",
    chrome: "readonly"
  },
  rules: {
    "prefer-promise-reject-errors": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};
