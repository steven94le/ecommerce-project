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

//creates a new order when someone checkout the cart
const addNewOder = async (req, res) => {
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
        { $inc: { numInStock: -item.quantity } },
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

module.exports = { addNewOder };
