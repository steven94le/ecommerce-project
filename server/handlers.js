"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getItems = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("GroupECommerce")
    const allItems = await db.collection("items").find().toArray()
    await client.close() 
    res.status(200).json({
      status: 200,
      data: allItems,
    })
  } catch {
    res.status(404).json({
      status: 404,
      message: 'File not found.',
  });
  }
} 

const getItem = async (req, res) => { 
    const reqId = JSON.parse(req.params.id)
      try {
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("GroupECommerce");
        const allItems = await db.collection("items").find().toArray()
        await client.close()
        const itemIds = allItems.map((item) => {
          return item._id
        })  
        const doesIdExist = itemIds.find((id) => id === reqId)
        const foundItem = allItems.find(item => item["_id"] === reqId)
        if (doesIdExist === undefined) {
          res.status(400).json({
            status: 400,
            message: 'Invalid Id'
          })
        } else {
          res.status(200).json({
            status: 200,
            data: foundItem,
          })
        }
    } catch (err) {
      res.status(404).json({
        status: 404,
        message: 'File not found.',
    });
  }
}



// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

module.exports = {getItems, getItem};

