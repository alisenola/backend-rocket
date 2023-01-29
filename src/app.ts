import { join, resolve } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyBcrypt from "fastify-bcrypt";
import fastifyMultipart from "@fastify/multipart";
import fastifyFormbody from "@fastify/formbody";
import fastifyStatic from "@fastify/static";
import * as fs from "fs";

(function createStorage() {
  fs.mkdirSync("storage/uploads/images/gallery", { recursive: true });
})();

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
  // Place here your custom code!
  void fastify.register(fastifyFormbody);
  void fastify.register(fastifyMultipart, {
    attachFieldsToBody: true,
  });

  void fastify.register(fastifyStatic, {
    root: resolve(__dirname, "../storage"),
    prefix: "/assets",
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });

  void fastify.register(fastifyJwt, {
    secret: process.env.SECRET || "secret",
  });

  void fastify.register(fastifyBcrypt, {
    saltWorkFactor: parseInt(process.env.SALT || "!2"),
  });
};

export default app;
export { app, options };
