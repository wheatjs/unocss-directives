# Unocss Directives

Enables CSS directives in Unocss

## Install
```bash
npm install --save-dev unocss-directives
```

```ts
// vite.config.ts
import Unocss from 'unocss/vite'
import UnocssDirectives from 'unocss/directives'

export default defineConfig({
  plugins: [
    // Unocss({ plugins: [...] }), Replace with UnocssDirectives
    UnocssDirectives({ plugins: [...] }),
  ]
})
```

## Features
Will automatically convert valid Unocss class names to valid css when used with `@apply`

The following
```css
html {
  @apply p-4;
}
```
will be converted to
```css
html {
  padding: 1rem;
}
```

## TODO
[ ] Variants

## License
[MIT License](https://github.com/jacobclevenger/vite-plugin-vue-gql/blob/main/LICENSE) © 2021-PRESENT [Jacob Clevenger](https://github.com/jacobclevenger)