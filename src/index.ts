import { app } from "./app";
import { env } from "./utils/env";

await app.listen({ port: env.PORT });

function onCloseSignal() {
  app.log.info("SIGINT received, shutting down");
  app.close(() => {
    app.log.info("Server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
}

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);

process.on("unhandledRejection", (err) => {
  app.log.fatal("Unhandled rejection", err);
});

process.on("uncaughtException", (err) => {
  app.log.fatal("Unhandled exception, shutting down", err);
  process.exit();
});
