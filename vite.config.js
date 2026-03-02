import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `$assets: '${env.VITE_ASSETS_PATH}';`,
        },
      },
    },
  };
});
