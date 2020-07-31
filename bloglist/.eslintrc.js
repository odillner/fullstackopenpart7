module.exports = {
    'env': {
        'browser': true,
        'es2020': true,
        'jest': true,
        "cypress/globals": true
    },
    "plugins": [
        "react", "jest", "cypress"
    ],
    "extends": [ 
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'never'
        ],
        'arrow-spacing': [
            'error', {'before': true, 'after': true}
        ],
        'no-console': 0,
        'react/prop-types': 0
    },
    'globals': {
        'process': true
    }

}
