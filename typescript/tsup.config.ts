import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/openai/index.ts',
    'src/langchain/index.ts',
    'src/ai-sdk/index.ts',
    'src/mcp-server/index.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  external: ['openai', '@langchain/core', 'ai'],
});