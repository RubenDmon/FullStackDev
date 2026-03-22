import js from '@eslint/js'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,
  {
    // Ignoramos la carpeta del frontend compilado
    ignores: ["dist/**"] 
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      // Le decimos a ESLint que estamos en Node.js (para que no marque "require" o "process" como errores)
      globals: {
        ...globals.node
      }
    },
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      // Reglas de estilo (comillas simples, sin punto y coma, indentación de 2 espacios)
      '@stylistic/indent': ['error', 2],
      '@stylistic/linebreak-style': ['error', 'windows'], // Cambia 'windows' a 'unix' si usas Mac/Linux
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      
      // Reglas de buenas prácticas
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      
      // Apagamos la advertencia de console.log
      'no-console': 0,
      
      // Apagamos la advertencia de variables no usadas para evitar problemas con (request, response, next)
      'no-unused-vars': ['error', { 'argsIgnorePattern': 'next|request|response' }]
    }
  }
]