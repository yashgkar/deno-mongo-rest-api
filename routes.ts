import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  home,
  getPizzas,
  getPizza,
  addPizza,
  updatePizza,
  deletePizza,
} from "./pizzas.ts";

const router = new Router();

router
  .get("/", home)
  .get("/api/v1/pizzas", getPizzas)
  .get("/api/v1/pizzas/:id", getPizza)
  .post("/api/v1/pizzas", addPizza)
  .put("/api/v1/pizzas/:id", updatePizza)
  .delete("/api/v1/pizzas/:id", deletePizza);

export default router;
