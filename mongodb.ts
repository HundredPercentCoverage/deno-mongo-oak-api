import { MongoClient } from "https://deno.land/x/mongo@v0.24.0/mod.ts";

const client = new MongoClient();

await client.connect("mongodb://localhost:27017");

const db = client.database('denoOakApi');

export default db;