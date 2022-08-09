"use strict";

const express = require("express");
const morgan = require("morgan");

const {
  addNewOrder,
  handleGetCategories,
  getCategoryItems,
  handleGetItems,
  handleGetItem,
  handleGetBrands,
  handleGetBrandItems,
  handleGetCategoryItems,
  addNewUser,
  verifyUser,
} = require("./handlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(
    express.urlencoded({
      extended: false,
    })
  )
  .use("/", express.static(__dirname + "/"))

  .get("/category", handleGetCategories)
  .get("/category/:id", handleGetCategoryItems)
  .get("/brand", handleGetBrands)
  .get("/brand/:id", handleGetBrandItems)
  .get("/api/get-items", handleGetItems)
  .get("/api/get-item/:id", handleGetItem)
  .post("/checkout", addNewOrder)
  .post("/users", verifyUser)

  .post("/add-user", addNewUser)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
