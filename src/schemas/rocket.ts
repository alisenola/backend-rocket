import { FastifySchema } from "fastify";
import { errorSchemas, fileSchema } from "./common";

const rocketSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    description: { type: "string" },
    height: { type: "number" },
    diameter: { type: "number" },
    mass: { type: "number" },
    photo: { type: "string" },
  },
};

export const getRocketSchema: FastifySchema = {
  response: {
    200: rocketSchema,
  },
};

export const putRocketSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["name", "description", "height", "diameter", "mass"],
    properties: {
      name: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
        },
      },
      description: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
        },
      },
      height: {
        type: "object",
        properties: {
          value: {
            type: "number",
          },
        },
      },
      diameter: {
        type: "object",
        properties: {
          value: {
            type: "number",
          },
        },
      },
      mass: {
        type: "object",
        properties: {
          value: {
            type: "number",
          },
        },
      },
      photo: fileSchema,
    },
  },
  response: {
    200: rocketSchema,
    ...errorSchemas,
  },
};
