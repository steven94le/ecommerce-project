# Wearables E-Commerce Project :shopping_cart:

# Introduction :wave:

A bootcamp group project featuring an e-commerce store with mock wearable items data. Users can browse through the collection, filter with product specifications, review/edit their cart, and complete purchases after filling out necessary form information. The user is able to create an account or sign into their existing account. Google sign-in is available as an alternative option and was implemented through Google Identity Services. User account data and purchase records are stored and accessed within the MongoDB database. We built this full-stack application in a short amount of time and learned a lot along the way, especially when it comes to version control protocols via Git and GitHub, iterative development, and collaborative programming.

<img width="750" alt="image" src="https://user-images.githubusercontent.com/76791687/186236204-001def0e-54d5-4d26-a0f0-6a25a9c25f26.png">


---

## **Features :computer:**

<details>
  <summary>Searchbar - clicking on a search result will direct you to the product page</summary>
<img width="500" alt="image" src="https://user-images.githubusercontent.com/76791687/186237056-32a6ec28-6e75-4bf3-bc00-40bd3e9c3614.png">
</details>

<details>
  <summary>"Best sellers" - carousel of randomized products</summary>
<img width="500" alt="image" src="https://user-images.githubusercontent.com/76791687/186237127-c0a635a7-d3b5-4a4b-82fc-043f634fe62e.png">
</details>

<details>
  <summary>Product catalogue - browse/filter entire collection, brands/categories pages show catalogue in alternative ways</summary>
<img width="500" alt="image" src="https://user-images.githubusercontent.com/76791687/186237181-9a4ef6ae-56c3-49f6-828b-2bbea0d5bdac.png">
<br/>
<img width="500" alt="image" src="https://user-images.githubusercontent.com/76791687/186237470-0b923a64-a8f8-4515-875e-7ef9473eb958.png">
<br/>
<img width="500" alt="image" src="https://user-images.githubusercontent.com/76791687/186237510-36b9e9fe-1ac1-4ace-b63e-50dceda60133.png">
</details>

<details>
  <summary>Product page - description, add to cart/out of stock, wishlist functionality only for signed-in users</summary>
<img width="500" alt="image" src="https://user-images.githubusercontent.com/76791687/186246001-4a1695ad-52f2-462f-a3c0-60259e165b19.png">
<br/>
<img width="500" alt="image" src="https://user-images.githubusercontent.com/76791687/186245862-985d6a9c-95f4-4b8b-826b-b5a1a85f2f2d.png">
<br/>
<img width="500" alt="image" src="https://user-images.githubusercontent.com/76791687/186247981-448af4d5-4eb4-4f7a-8a8d-4343a1a52727.png">
<br/>
<img width="436" alt="image" src="https://user-images.githubusercontent.com/76791687/186248958-28abac22-3c95-4f18-918d-50ccf05bc244.png">
</details>

<details>
  <summary>Sign in via account registration or email/google login (validation in place on both frontend and backend) - signed-in users can use the wishlist functionality and won't have to input their emails at checkout</summary>
<img width="500" alt="image" src="https://user-images.githubusercontent.com/76791687/186238041-bac16445-a09c-43ed-8010-adc059d34b62.png">
</details>

<details>
  <summary>Cart - users can review/remove items from their cart before proceeding to checkout</summary>
<img width="500" alt="image" src="https://user-images.githubusercontent.com/76791687/186237946-6dd7e060-39d1-4dd1-93cd-932a8c42c4dd.png">
</details>

<details>
  <summary>Checkout - users will need to fill out the necessary form information before placing their order </summary>
<img width="500" alt="image" src="https://user-images.githubusercontent.com/76791687/186239593-d169c282-c547-4569-b53e-1699c1696b18.png">
</details>

<details>
  <summary>Wishlist - only signed-in users can use/see this page and items here can be removed or added straight to cart</summary>
<img width="500" alt="image" src="https://user-images.githubusercontent.com/76791687/186239365-a86ce8c0-535f-4931-b517-5b50d0495f40.png">
</details>

<details>
  <summary>Confirmation page shows user's form information</summary>
<img width="500" alt="image" src="https://user-images.githubusercontent.com/76791687/186239816-91589052-9d68-4f09-a7f9-95d02243ed2a.png">
</details>

## **Deploying The Project :computer:**

Clone the repository to your local machine using the terminal:

`$ git clone git@github.com:steven94le/ecommerce-project.git`

### Installing the dependencies:

### The Client

1. Navigate to the client folder `cd client`
2. Install the required packages `yarn install`
3. Once that's done you can start the server with `yarn start`

This will run the app in development mode. Open http://localhost:3000 to view it in the browser! The page will reload if you make changes.

### The Server

1. Navigate to the server folder `cd server`
2. Install the required packages `yarn install`
3. Once that's done you can start the server with `yarn start`

The company and items json files in the `server/data` directory were provided by the bootcamp instructors. We imported these mock data onto our MongoDB which is then used throughout our application.

## **Technologies Used :computer:**

Frontend:
- JavaScript, HTML, CSS
- React.js
- Styled Components
- Google Identity Services JavaScript SDK

Backend:
- Node.js
- Express

Other Tools:
- GitHub
- Git
- MongoDB
- Trello

## **Authors :bust_in_silhouette:**

- Aidan Charlton (GitHub: [@AidanCharlton](https://github.com/AidanCharlton))
- Shane Castro (GitHub: [@CastroShane](https://github.com/CastroShane))
- Steven Le (GitHub: [@steven94le](https://github.com/steven94le))
