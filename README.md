# Deno / MongoDB / Oak Test API
A basic API built with [Deno](https://deno.land/) and TypeScript that uses [Oak](https://oakserver.github.io/oak/) to talk to MongoDB.

An implementation of [this tutorial](https://blog.logrocket.com/building-a-restful-api-in-deno-with-oak-and-mongodb/) with a few tweaks and updates.

You need to have Deno installed to run the API with the following command:

`deno run --allow-net --allow-read --allow-write --unstable server.ts`

You will also need MongoDB running on the host machine. The app uses a collection called 'rooms'.