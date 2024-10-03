import "zod-openapi/extend";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import fastifyAutoLoad from "@fastify/autoload";
import fastifySwagger from "@fastify/swagger";
import fastifyScalarUI from "@scalar/fastify-api-reference";
import { fastify } from "fastify";
import {
  type FastifyZodOpenApiTypeProvider,
  fastifyZodOpenApiPlugin,
  fastifyZodOpenApiTransform,
  fastifyZodOpenApiTransformObject,
  serializerCompiler,
  validatorCompiler,
} from "fastify-zod-openapi";
import { env } from "./utils/env";
import { makeError } from "./utils/errors";
import { loggerConfig } from "./utils/logger";

export const app = fastify({
  logger: loggerConfig[env.NODE_ENV],
});

app.withTypeProvider<FastifyZodOpenApiTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(fastifyZodOpenApiPlugin);
await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Fastify API Boilerplate",
      version: "0.1.0",
    },
  },
  transform: fastifyZodOpenApiTransform,
  transformObject: fastifyZodOpenApiTransformObject,
});

await app.register(fastifyScalarUI, {
  routePrefix: "/docs",
  configuration: {
    theme: "kepler",
  },
});

app.setErrorHandler(async (err, request, reply) => {
  request.log.error(err);
  const error = makeError(err);

  return reply.status(error.statusCode).send(error);
});

await app.register(fastifyAutoLoad, {
  dir: join(fileURLToPath(import.meta.url), "..", "modules"),
  matchFilter: /\.router\./,
  ignorePattern: /^.*(?:test|spec).ts$/,
});
