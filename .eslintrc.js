// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        'plugin:vue/recommended',
        'standard'
    ],
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 'off',
        'indent': [
            'error',
            4,
            {
                'SwitchCase': 1
            }
        ],
            // allow debugger during development
            'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
            'no-var': 'error',
            'prefer-const': "error",
            'vue/html-indent': ["error", 4]
    }
}
