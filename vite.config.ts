import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // S'assurer que cela correspond à la structure attendue par Django
    assetsDir: '', // Peut aider à éviter un sous-dossier 'assets' supplémentaire dans 'static'
    // ou le laisser par défaut si vous voulez client/build/static/assets/
    manifest: true, // Utile pour des intégrations plus poussées, pas essentiel ici
    rollupOptions: { // Pour éviter les hashes dans les noms si non désiré,
      // mais généralement, les hashes sont bons pour le caching.
      // Si vous voulez des noms de fichiers prévisibles :
      // output: {
      //   entryFileNames: `[name].js`,
      //   chunkFileNames: `[name].js`,
      //   assetFileNames: `[name].[ext]`
      // }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
