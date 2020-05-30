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
  .get("/pizzas", getPizzas)
  .get("/pizzas/:id", getPizza)
  .post("/pizzas", addPizza)
  .put("/pizzas/:id", updatePizza)
  .delete("/pizzas/:id", deletePizza);

export default router;
