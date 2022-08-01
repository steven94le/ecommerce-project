const { MongoClient } = require("mongodb");
const items = require("./data/items.json");
const companies = require("./data/items.json");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const {
  getItems
} = require('./handlers')

console.log("asdasd", MONGO_URI);
const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("GroupECommerce");

  await db.collection("items").insertMany(items);

  await db.collection("companies").insertMany(companies);
  console.log("Success!");
  client.close();
};

// batchImport();
