import { Application, Router } from "https://deno.land/x/oak@v8.0.0/mod.ts";
import { getAllRooms, createRoom, getRoom, updateRoom, deleteRoom } from './routes.ts';

const app = new Application();
const router = new Router();
const port = 8000;

router.get('/', (ctx) => {
  ctx.response.body = 'Hello from Deno';
})
  .get('/rooms', getAllRooms)
  .get('/rooms/:id', getRoom)
  .post('/rooms', createRoom)
  .put('/rooms/:id', updateRoom)
  .delete('/rooms/:id', deleteRoom);

app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port });
console.log(`Server is running on port ${port}`);