import { defineConfig } from "cypress";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
    e2e: {
        baseUrl: "http://localhost",
        env: {
            MAGIC_USER_PASSWORD: process.env.CYPRESS_MAGIC_USER_PASSWORD,
            MAGIC_USER_LOGIN: process.env.CYPRESS_MAGIC_USER_LOGIN,
        },
        setupNodeEvents(on, config) {},
    },

    component: {
        devServer: {
            framework: "vue",
            bundler: "vite",
        },
    },
});
