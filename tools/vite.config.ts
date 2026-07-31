import { promises as fs } from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const dataFile = path.resolve(process.cwd(), "src/data/tools.json");

function localToolsEditor(): Plugin {
  return {
    name: "local-tools-editor",
    configureServer(server) {
      server.middlewares.use("/api/tools", async (request, response) => {
        response.setHeader("Content-Type", "application/json; charset=utf-8");

        try {
          if (request.method === "GET") {
            response.end(await fs.readFile(dataFile, "utf8"));
            return;
          }

          if (request.method === "PUT") {
            const chunks: Buffer[] = [];
            for await (const chunk of request) chunks.push(Buffer.from(chunk));
            const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"));

            if (!Array.isArray(parsed)) {
              response.statusCode = 400;
              response.end(JSON.stringify({ error: "Expected an array of tools." }));
              return;
            }

            await fs.writeFile(dataFile, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
            response.end(JSON.stringify({ saved: true }));
            return;
          }

          response.statusCode = 405;
          response.end(JSON.stringify({ error: "Method not allowed." }));
        } catch (error) {
          response.statusCode = 500;
          response.end(JSON.stringify({
            error: error instanceof Error ? error.message : "Unknown server error."
          }));
        }
      });
    }
  };
}

export default defineConfig({
  base: "./",
  plugins: [react(), localToolsEditor()],
  server: {
    open: true
  }
});
