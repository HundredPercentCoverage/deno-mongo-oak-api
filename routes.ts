import { RouterContext } from "https://deno.land/x/oak@v8.0.0/mod.ts";
import { Bson } from "https://deno.land/x/mongo@v0.24.0/mod.ts";

import db from './mongodb.ts';
import { Room } from './types/globalTypes.ts';

const roomsCollection = db.collection('rooms');

export const getAllRooms = async (ctx: RouterContext) => {
  const rooms = await roomsCollection.find();
  ctx.response.body = rooms;
}

export const createRoom = async (ctx: RouterContext) => {
  const { room_number, size, price, isAvailable } = await ctx.request.body().value;
  const room: Room = {
    room_number,
    size,
    price,
    isAvailable
  };

  const id = await roomsCollection.insertOne(room);
  room._id = id;
  ctx.response.status = 201;
  ctx.response.body = room;
}

export const getRoom = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const room = await roomsCollection.findOne({ _id: new Bson.ObjectID(id) }) as Room;
  ctx.response.body = room;
}

export const updateRoom = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const { price, isAvailable } = await ctx.request.body().value;
  const { modifiedCount } = await roomsCollection.updateOne(
    { _id: new Bson.ObjectID(id) },
    {
      $set: {
        price,
        isAvailable,
      }
    }
  );

  if (!modifiedCount) {
    ctx.response.status = 404;
    ctx.response.body = { message: 'Room not found, or no change made' };
    return;
  }

  ctx.response.body = await roomsCollection.findOne({ _id: new Bson.ObjectID(id) }) as Room;
}

export const deleteRoom = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const room = await roomsCollection.deleteOne({ _id: new Bson.ObjectID(id) });

  if (!room) {
    ctx.response.status = 404;
    ctx.response.body = { message: 'Room not found' };
    return;
  }

  ctx.response.status = 204;
}