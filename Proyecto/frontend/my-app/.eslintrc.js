module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "plugin:react/recommended",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/jsx-no-undef": "error",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "no-unused-vars": "warn",
        "no-console": "warn"
    },"settings": {
        "react": {
          "version": "detect"
        }
      }
}
