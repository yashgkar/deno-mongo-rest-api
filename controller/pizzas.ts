import pizzaObj from "../db/mongo.ts";

const home = ({ response }: { response: any }) => {
  response.body =
    "Hello to Pizzas REST API\n GET: '/api/v1/pizzas' returns all pizzas in database \n GET: '/api/v1/pizzas/:id' returns single pizza for given param id \n POST 'api/v1/pizzas' adds new pizza in the database \n PUT: '/api/v1/pizzas/:id' updates an existing pizza \n DELETE '/api/v1/pizzas/:id' deletes a pizza in database for given param id";
};

//@desc Get all products
//@route Get /api/v1/products

const getPizzas = async ({ response }: { response: any }) => {
  const products = await pizzaObj.find();

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
  const product = await pizzaObj.findOne({ _id: { $oid: params.id } });

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
    await pizzaObj.insertOne({
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
  const product = await pizzaObj.updateOne(
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
  const product = await pizzaObj.deleteOne({ _id: { $oid: params.id } });

  if (product === 1) {
    response.body = {
      success: true,
      data: "Pizza Deleted",
    };
  } else {
    response.body = {
      success: false,
      data: "No product found for given ID",
    };
  }
};

export { home, getPizzas, getPizza, addPizza, updatePizza, deletePizza };
