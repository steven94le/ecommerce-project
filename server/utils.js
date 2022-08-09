"use strict";
const e = require("express");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const startClient = async () => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  return client;
};

const getItems = async () => {
  try {
    const client = await startClient();
    const db = client.db("GroupECommerce");
    const allItems = await db.collection("items").find().toArray();
    client.close();
    return allItems;
  } catch (err) {
    console.log(err);
  }
};

const getBrands = async () => {
  try {
    const client = await startClient();
    const db = client.db("GroupECommerce");
    const brands = await db.collection("companies").distinct("name");
    client.close();
    return brands;
  } catch (err) {
    console.log(err);
  }
};

const getBrandItems = async (id) => {
  try {
    const client = await startClient();
    const db = client.db("GroupECommerce");

    const brandDocument = await db
      .collection("companies")
      .findOne({ name: id });

    const brandId = brandDocument._id;
    const brandItems = await db
      .collection("items")
      .find({ companyId: brandId })
      .toArray();
    client.close();
    return brandItems;
  } catch (err) {
    console.log(err);
  }
};

const getCategories = async () => {
  try {
    const client = await startClient();
    const db = client.db("GroupECommerce");
    const categories = await db.collection("items").distinct("category");
    client.close();
    return categories;
  } catch (err) {
    console.log(err);
  }
};

const getCategoryItems = async (id) => {
  try {
    const client = await startClient();
    const db = client.db("GroupECommerce");
    const category = await db
      .collection("items")
      .find({ category: id })
      .toArray();
    client.close();
    return category;
  } catch (err) {
    console.log(err);
  }
};

const getUsers = async () => {
  try {
    const client = await startClient();
    const db = client.db("GroupECommerce");
    const users = await db.collection("users").find().toArray();
    client.close();
    return users;
  } catch (err) {
    console.log(err);
  }
};

const findUser = async (email, password) => {
  try {
    const client = await startClient();
    const db = client.db("GroupECommerce");
    const foundUser = await db.collection("users").findOne({ email, password });
    client.close();
    return foundUser;
  } catch (err) {
    console.log(err);
  }
};

const addUserDetails = async (newUserDetails) => {
  try {
    const client = await startClient();
    const db = client.db("GroupECommerce");
    await db.collection("users").insertOne(newUserDetails);
    client.close();
    return;
  } catch (err) {
    console.log(err);
  }
};

const updateStock = async (orderedItems) => {
  try {
    const client = await startClient();
    const db = client.db("GroupECommerce");

    orderedItems.forEach((item) => {
      db.collection("items").updateOne(
        { _id: item._id, name: item.name },
        { $inc: { numInStock: -1 } },
        (err, result) => {
          result
            ? console.log(
                "Found:",
                result.matchedCount,
                "Updated:",
                result.acknowledged
              )
            : console.log(err);
        }
      );
    });

    client.close();
    return;
  } catch (err) {
    console.log(err);
  }
};

const addOrderDetails = async (newOrderDetails) => {
  try {
    const client = await startClient();
    const db = client.db("GroupECommerce");
    await db.collection("orders").insertOne(newOrderDetails);
    client.close();
    return;
  } catch (err) {
    console.log(err);
  }
};

const sendResponse = (res, status, data, message = "No message included.") => {
  res.status(status).json({ status, data, message });
};

module.exports = {
  startClient,
  getItems,
  getBrands,
  getBrandItems,
  getCategories,
  getCategoryItems,
  getUsers,
  findUser,
  updateStock,
  addOrderDetails,
  addUserDetails,
  sendResponse,
};
