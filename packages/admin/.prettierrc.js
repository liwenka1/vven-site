module.exports = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: false,
  trailingComma: 'none',
  bracketSpacing: true,
  endOfLine: 'lf',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json'
      }
    },
    {
      files: 'document.ejs',
      options: {
        parser: 'html'
      }
    }
  ]
}
