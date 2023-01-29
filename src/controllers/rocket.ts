import { Rocket } from "@entity/Rocket";
import { RouteHandlerMethod } from "fastify";
import { MultipartFile, MultipartValue } from "@fastify/multipart";
import * as fs from "fs";
import { randomUUID } from "crypto";

interface IRocketFormData {
  id?: MultipartValue<number>;
  name: MultipartValue<string>;
  description: MultipartValue<string>;
  height: MultipartValue<number>;
  diameter: MultipartValue<number>;
  mass: MultipartValue<number>;
  photo?: MultipartFile;
}

export const createRocket: RouteHandlerMethod = async (request, reply) => {
  try {
    const { name, description, height, diameter, mass, photo } =
      request.body as IRocketFormData;

    const repository = request.server.db.getRepository(Rocket);

    let path = "";
    if (photo) {
      const buffer = await photo.toBuffer();
      path = `uploads/images/gallery/${randomUUID() + "_" + photo.filename}`;

      fs.appendFileSync(`storage/${path}`, buffer);
    }

    const data = repository.create({
      name: name.value,
      description: description.value,
      height: height.value,
      diameter: diameter.value,
      mass: mass.value,
      photo: path,
    });

    const rocket = await repository.save(data);

    return rocket;
  } catch (error: any) {
    reply.internalServerError(error);
  }
};

export const updateRocket: RouteHandlerMethod = async (request, reply) => {
  try {
    const repository = request.server.db.getRepository(Rocket);

    const { id } = request.params as { id: number };

    const rocket = await repository.findOne({ where: { id } });

    if (rocket === null) throw new Error("Rocket with the id not found!");

    const { name, description, height, diameter, mass, photo } =
      request.body as IRocketFormData;

    let path = "";
    if (photo) {
      const buffer = await photo.toBuffer();
      path = `uploads/images/gallery/${randomUUID() + "_" + photo.filename}`;

      fs.appendFileSync(`storage/${path}`, buffer);
    }

    const data = {
      name: name.value,
      description: description.value,
      height: height.value,
      diameter: diameter.value,
      mass: mass.value,
      photo: path,
    };

    await repository.update({ id }, data);

    return { ...data, id };
  } catch (error: any) {
    reply.internalServerError(error);
  }
};

export const getRockets: RouteHandlerMethod = async (request, reply) => {
  try {
    const repository = request.server.db.getRepository(Rocket);

    const rockets = await repository.find({ order: { id: "ASC" } });

    return rockets;
  } catch (error: any) {
    reply.internalServerError(error);
  }
};

export const getRocket: RouteHandlerMethod = async (request, reply) => {
  const repository = request.server.db.getRepository(Rocket);

  const { id } = request.params as { id: number };

  try {
    const rocket = await repository.findOne({ where: { id } });

    if (rocket === null) throw new Error("Rocket with the id not found!");

    return rocket;
  } catch (error: any) {
    reply.internalServerError(error);
  }
};

export const deleteRocket: RouteHandlerMethod = async (request, reply) => {
  const repository = request.server.db.getRepository(Rocket);

  const { id } = request.params as { id: number };

  try {
    const rocket = await repository.findOne({ where: { id } });

    if (rocket === null) throw new Error("Rocket with the id not found!");

    await repository.delete(id);

    return id;
  } catch (error: any) {
    reply.internalServerError(error);
  }
};
