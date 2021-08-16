import { Document } from "https://deno.land/x/mongo@v0.24.0/src/types.ts";

export interface Room {
  _id?: Document;
  room_number: number;
  size: string;
  price: number;
  isAvailable: boolean;
}