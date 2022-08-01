"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//get all category names
const getCategories = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GroupECommerce");

    const categories = await db.collection("items").distinct("category");

    console.log("categories", categories);
    client.close();
    res.status(200).json({
      status: 200,
      data: categories,
      message: "Categories fetched!",
    });
  } catch (err) {
    console.log(err);
  }
};

//get wearables from a single category
const getCategoryItems = async (req, res) => {
  const { id } = req.params;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GroupECommerce");

    const modifiedId = id[0].toUpperCase() + id.slice(1).toLowerCase();

    const categories = await db.collection("items").distinct("category");

    if (!categories.includes(modifiedId)) {
      return res
        .status(404)
        .json({ status: 404, message: "Category not found!" });
    }

    const category = await db
      .collection("items")
      .find({ category: modifiedId })
      .toArray();

    client.close();
    res.status(200).json({
      status: 200,
      data: category,
      message: "Category fetched!",
    });
  } catch (err) {
    console.log(err);
  }
};

//creates a new order when someone checkout the cart
const addNewOrder = async (req, res) => {
  const { fullName, creditCard, expiration, orderedItems, email } = req.body;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GroupECommerce");

    const newOrderDetails = {
      _id: uuidv4(),
      fullName,
      creditCard,
      expiration,
      orderedItems,
      email,
    };

    orderedItems.forEach((item) => {
      console.log(item._id);
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
    await db.collection("orders").insertOne(newOrderDetails);
    client.close();
    res.status(201).json({
      status: 201,
      data: newOrderDetails,
      message: "Order has been placed!",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addNewOrder, getCategories, getCategoryItems };
