Instala Playwright ejecutando en el directorio del nuevo proyecto el comando:

npm init playwright@latest

Definamos un script npm para ejecutar pruebas e informes de pruebas en package.json:

  "scripts": {
    "test": "playwright test",
    "test:report": "playwright show-report"
  },

Un reporte más detallado puede abrirse tanto con el comando sugerido en la consola, como con el script de npm que acabamos de definir:

npm run test:report

Las pruebas también pueden ejecutarse a través de la interfaz gráfica con el comando:

npm run test -- --ui