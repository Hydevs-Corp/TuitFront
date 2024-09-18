import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default ({ mode }: { mode: string }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    console.log(process.env.VITE_OUTDIR);
    return defineConfig({
        plugins: [vue()],
        build: {
            outDir: process.env.VITE_OUTDIR || "dist",
            emptyOutDir: true,
        },
    });
};
