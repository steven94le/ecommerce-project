// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const {
  getItems,
  getBrands,
  getBrandItems,
  getCategories,
  getCategoryItems,
  getUsers,
  findUser,
  addOrderDetails,
  addUserDetails,
  sendResponse,
} = require("./utils.js");

/**
 * handler to get all wearable items
 * @param {*} req
 * @param {*} res
 * @return {} {res, 200, items, "Items fetch successful."}
 */
const handleGetItems = async (req, res) => {
  try {
    const items = await getItems();
    sendResponse(res, 200, items, "Items fetch successful.");
  } catch (err) {
    console.log(err);
  }
};

/**
 * handler to get a particular wearable item based on item id
 * @param {*} req - with item id
 * @param {*} res
 * @return {} {res, 200, foundItem, "Item fetch successful."} or {res, 404, null, "Invalid id."}
 */
const handleGetItem = async (req, res) => {
  const reqId = parseInt(req.params.id);
  try {
    const items = await getItems();
    const itemIds = items.map((item) => {
      return item._id;
    });
    const doesIdExist = itemIds.find((id) => id === reqId);
    const foundItem = items.find((item) => item["_id"] === reqId);

    if (doesIdExist === undefined) {
      sendResponse(res, 404, null, "Invalid id.");
    } else {
      sendResponse(res, 200, foundItem, "Item fetch successful.");
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * handler to get all the wearable brands
 * @param {*} req
 * @param {*} res
 * @return {} {res, 200, brands, "Brands fetch successful."}
 */
const handleGetBrands = async (req, res) => {
  try {
    const brands = await getBrands();
    sendResponse(res, 200, brands, "Brands fetch successful.");
  } catch (err) {
    console.log(err);
  }
};

/**
 * handler to get all the wearables from a single brand based on brand id
 * @param {*} req - with brand id
 * @param {*} res
 * @return {} {res, 200, brandItems, "Brand items fetch successful."} or {res, 404, null, "Brand not found."}
 */
const handleGetBrandItems = async (req, res) => {
  const { id } = req.params;
  try {
    const brands = await getBrands();
    if (!brands.includes(id)) {
      sendResponse(res, 404, null, "Brand not found.");
      return;
    }
    const brandItems = await getBrandItems(id);
    sendResponse(res, 200, brandItems, "Brand items fetch successful.");
  } catch (err) {
    console.log(err);
  }
};

/**
 * handler to get all the categories of wearables
 * @param {*} req
 * @param {*} res
 * @return {} {res, 200, categories, "Categories fetch successful."}
 */
const handleGetCategories = async (req, res) => {
  try {
    const categories = await getCategories();
    sendResponse(res, 200, categories, "Categories fetch successful.");
  } catch (err) {
    console.log(err);
  }
};

/**
 * handler to get all the wearables from a single brand based on category id
 * @param {*} req - with category id
 * @param {*} res
 * @return {} {res, 200, category, "Category fetch successful."} or {res, 404, null, "Category not found."}
 */
const handleGetCategoryItems = async (req, res) => {
  const { id } = req.params;

  try {
    const categories = await getCategories();
    if (!categories.includes(id)) {
      sendResponse(res, 404, null, "Category not found.");
      return;
    }

    const category = await getCategoryItems(id);
    sendResponse(res, 200, category, "Category fetch successful.");
  } catch (err) {
    console.log(err);
  }
};

/**
 * handler to create new order when user makes a purchase
 * @param {*} req - with body of order form data: `givenName, `surname`, `creditCard`, `expiration`, `orderedItems`, `email`
 * @param {*} res
 * @returns new order entry
 */
const addNewOrder = async (req, res) => {
  const { givenName, surname, creditCard, expiration, orderedItems, email } =
    req.body;

  const numbers = /^[0-9]+$/;

  if (creditCard.split("").length !== 8 || creditCard.match(numbers) === null) {
    sendResponse(res, 400, null, "Invalid card number format.");
    return;
  }

  if (expiration.split("").length !== 4 || expiration.match(numbers) === null) {
    sendResponse(res, 400, null, "Invalid expiration format.");
    return;
  }

  if (!email.includes("@")) {
    sendResponse(res, 400, null, "Invalid email format.");
    return;
  }

  if (orderedItems.length === 0) {
    sendResponse(res, 400, null, "Cart is empty.");
    return;
  }

  try {
    const newOrderDetails = {
      _id: uuidv4(),
      givenName,
      surname,
      creditCard,
      expiration,
      orderedItems,
      email,
    };

    await addOrderDetails(orderedItems, newOrderDetails);
    sendResponse(res, 201, newOrderDetails, "Order has been placed.");
  } catch (err) {
    console.log(err);
  }
};

/**
 * handler to create new user when a user signs up for the first time
 * @param {*} req - with body of registration data: `givenName, `surname`, `email`, `password`
 * @param {*} res
 * @returns new user
 */
const addNewUser = async (req, res) => {
  const { givenName, surname, email, password } = req.body;

  try {
    const newUserDetails = {
      _id: uuidv4(),
      givenName,
      surname,
      email,
      password,
    };

    const users = await getUsers();
    const foundUser = users.find((user) => user.email === email);

    if (foundUser) {
      sendResponse(res, 404, null, "User email already exists.");
      return;
    } else {
      await addUserDetails(newUserDetails);
    }

    sendResponse(
      res,
      201,
      newUserDetails,
      "User has been registered successfully."
    );
  } catch (err) {
    console.log(err);
  }
};

/**
 * handler to verify if user exists when user attempts to sign in
 * @param {*} req - with body of log in data: `email`, `password`
 * @param {*} res
 * @return user verification
 */
const verifyUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await findUser(email, password);

    if (foundUser) {
      sendResponse(res, 200, foundUser, "User verified.");
    } else {
      sendResponse(res, 200, foundUser, "Please check your email or password.");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addNewOrder,
  handleGetCategories,
  handleGetCategoryItems,
  handleGetItems,
  handleGetItem,
  handleGetBrands,
  handleGetBrandItems,
  addNewUser,
  verifyUser,
};
