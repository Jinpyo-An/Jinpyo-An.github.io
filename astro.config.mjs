// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { visit } from 'unist-util-visit';

import tailwindcss from '@tailwindcss/vite';

// ```mermaid 코드 블록은 Shiki로 하이라이팅하지 않고
// 원문 그대로 <pre class="mermaid">에 담아서, 클라이언트에서
// mermaid.js가 다이어그램으로 렌더링할 수 있게 한다. (선택적 기능)
function remarkMermaid() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang === 'mermaid') {
        const escaped = node.value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        node.type = 'html';
        node.value = `<pre class="mermaid">${escaped}</pre>`;
      }
    });
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://jinpyo-an.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
    processor: unified({ remarkPlugins: [remarkMermaid] }),
  },
});
