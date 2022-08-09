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

//get all wearable items
const handleGetItems = async (req, res) => {
  try {
    const items = await getItems();
    sendResponse(res, 200, items);
  } catch (err) {
    console.log(err);
    sendResponse(res, 404, null, "Items not found.");
  }
};

//get a particular wearable item
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
      sendResponse(res, 400, null, "Invalid id.");
    } else {
      sendResponse(res, 200, foundItem);
    }
  } catch (err) {
    console.log(err);
    sendResponse(res, 404, null, "Item not found.");
  }
};

//get all brand names
const handleGetBrands = async (req, res) => {
  try {
    const brands = await getBrands();
    sendResponse(res, 200, brands, "Companies fetched.");
  } catch (err) {
    console.log(err);
  }
};

//get wearables from a single brand
const handleGetBrandItems = async (req, res) => {
  const { id } = req.params;
  try {
    const brands = await getBrands();
    if (!brands.includes(id)) {
      sendResponse(res, 404, null, "Brand not found.");
      return;
    }
    const brandItems = await getBrandItems(id);
    sendResponse(res, 200, brandItems, "Brand items fetched.");
  } catch (err) {
    console.log(err);
  }
};

//get all category names
const handleGetCategories = async (req, res) => {
  try {
    const categories = await getCategories();
    sendResponse(res, 200, categories, "Categories fetched.");
  } catch (err) {
    console.log(err);
  }
};

//get wearables from a single category
const handleGetCategoryItems = async (req, res) => {
  const { id } = req.params;

  try {
    const categories = await getCategories();
    if (!categories.includes(id)) {
      sendResponse(res, 404, null, "Category not found.");
      return;
    }

    const category = await getCategoryItems(id);
    sendResponse(res, 200, category, "Category fetched.");
  } catch (err) {
    console.log(err);
  }
};

//creates a new order when someone checkout the cart
const addNewOrder = async (req, res) => {
  const { givenName, surname, creditCard, expiration, orderedItems, email } =
    req.body;

  // ^ and $ define start and end of string, respectively
  //+ define one or multiple occurrences
  //[] range of all digits between 0 and 9, inclusive
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

// Creates new user when someone sign up
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

// verify user when signing in
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
