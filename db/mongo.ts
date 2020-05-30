import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

const client = new MongoClient();
client.connectWithUri("mongodb://127.0.0.1:27017");

const db = client.database("test");
const pizzaObj = db.collection("pizzas");

export default pizzaObj;