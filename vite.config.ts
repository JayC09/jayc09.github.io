import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ command }) => ({
  base: "./",
  define: command === "build" ? { "process.env.NODE_ENV": JSON.stringify("production") } : {},
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
  publicDir: false,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "portfolio-about-development",
      apply: "serve",
      transformIndexHtml(html) {
        return html
          .replace(/src="assets\/react\/about\.js(?:\?[^"]*)?"/, 'src="/src/about/main.tsx"')
          .replace(/<link[^>]*id="about-react-styles"[^>]*>/, "");
      }
    }
  ],
  build: {
    minify: true,
    outDir: "assets/react",
    emptyOutDir: true,
    target: "es2022",
    lib: {
      entry: fileURLToPath(new URL("./src/about/main.tsx", import.meta.url)),
      name: "JayAbout",
      formats: ["es"],
      fileName: () => "about.js",
      cssFileName: "about"
    }
  }
}));
