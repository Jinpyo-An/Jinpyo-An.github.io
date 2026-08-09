## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Gotchas

- Astro 7+("Sätteri" 프로세서)에서 `markdown.remarkPlugins`/`rehypePlugins`는 top-level에서 deprecated. `npm install @astrojs/markdown-remark` 후 `markdown.processor: unified({ remarkPlugins: [...] })`로 설정할 것.
- Content collection은 Content Layer `glob` 로더(`astro/loaders`)를 `src/content.config.ts`에서 사용 (legacy `type: 'content'` 아님) — 새 컬렉션도 동일 패턴 유지.
