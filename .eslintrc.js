module.exports = {
	'env': {
		'browser': true,
		'es2020': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 11,
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'react-hooks'
	],
	'rules': {
		'semi': ['warn', 'always'],
		'quotes': ['warn', 'single'],
		'no-unused-vars': ['warn', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react/react-in-jsx-scope': 'off'
	},
	'settings': {
		'react': {
			'version': 'detect'
		}
	}
};
