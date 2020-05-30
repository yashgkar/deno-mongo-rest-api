import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");

const db = client.database("test");
const users = db.collection("pizzas");

const home = ({response}:{response:any}) => {
    response.body = "Hello to Pizzas REST API";
};

//@desc Get all products
//@route Get /api/v1/products

const getPizzas = async ({ response }: { response: any }) => {
  const products = await users.find();

  response.body = {
    success: true,
    data: products,
  };
};

//@desc Get single products
//@route Get /api/v1/products

const getPizza = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const product = await users.findOne({ _id: { $oid: params.id } });

  if (product) {
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.body = {
      success: false,
      data: "No product found for given ID",
    };
  }
};

//@desc Adds a product
//@route POST /api/v1/products

const addPizza = async ({
  response,
  request,
}: {
  response: any;
  request: any;
}) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      success: false,
      data: "No data provided",
    };
  } else {
    const product = body.value;
    await users.insertOne({
      product,
    });
    response.status = 201;
    response.body = {
      success: true,
      data: "Pizza added to pizzas database",
    };
  }
};

const updatePizza = async ({
  params,
  response,
  request,
}: {
  params: { id: string };
  response: any;
  request: any;
}) => {
  const body = await request.body();
  const product = await users.updateOne(
    { _id: { $oid: params.id } },
    {
      $set: {
        product: {
          pizza: body.value.pizzas,
          price: body.value.price,
        },
      },
    }
  );

  if (product.modifiedCount === 1) {
    response.body = {
      success: true,
      data: "Update Pizza!",
    };
  } else {
    response.body = {
      success: false,
      data: "No product found for given ID",
    };
  }
};

const deletePizza = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const product = await users.deleteOne({ _id: { $oid: params.id } });

  if (product) {
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.body = {
      success: false,
      data: "No product found for given ID",
    };
  }
};

export {home, getPizzas, getPizza, addPizza, updatePizza, deletePizza };