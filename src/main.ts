import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { app } from "./app.ts";

app.doc("/docs", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

app.get("/ui", swaggerUI({ url: "/docs" }));

serve(app, (info) => {
  const url = `http://localhost:${info.port}`;
  console.log(`Server listening on ${url}`);
  console.log(`Swagger UI available at ${url}/ui`)
});
