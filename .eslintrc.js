module.exports = {
  extends: ["plugin:flowtype/recommended", "airbnb", "prettier"],
  plugins: ["flowtype", "prettier", "react-hooks"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  settings: {
    "import/resolver": "webpack",
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  globals: {
    cy: true,
  },
  rules: {
    // Configure rules here
    quotes: [0, "single", { avoidEscape: true }],
    "arrow-body-style": ["error", "as-needed"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    // Disable rules here
    "jsx-a11y/click-events-have-key-events": "off",
    "import/prefer-default-export": "off",
    "import/no-named-as-default": "off",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react/jsx-boolean-value": "off",
    "no-prototype-builtins": "off",
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
    "import/no-cycle": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-closing-tag-location": "off",
    "no-param-reassign": 0,
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
  },
};
