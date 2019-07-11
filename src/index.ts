import express from "express";
import dotenv from "dotenv";
import admin from "firebase-admin";
import functions from "firebase-functions";
import { ApolloServer, gql } from "apollo-server-express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
// import firebase from "firebase";

dotenv.config(); // Intializes configuration to manage environment variable

const port = process.env.SERVER_PORT;
const app = express();
admin.initializeApp();
// const firebaseConfig = {
//   databaseURL: "https://brood-api.firebaseio.com/",
//   serviceAccount: "./brood-api.json" 
// };
//  firebase.initializeApp(firebaseConfig);
// const database = firebase.database();
/**
 * I have considered using graphQL approach over
 * a traditional REST approach for this challenge.
 * 
 * There are several advantages of using graphQL over a traditional REST approach
 * and it provides all the CRUD operations that REST offers.
 * 
 * To list down some of the factors that were taken into consideration for choosing 
 * graphQL approach is to,
 * 
 * 1 To minimize the number of method and endpoints. 
 * 2 Allowing the client to to make minimal query as per the need.
 * Meaning instead of fetching a full blown inventory object like this,
 *    {
 *       "sku": "120P90",
 *       "name": "Google Home",
 *       "price": 49.99,
 *       "inventoryQty": 10
 *    }
 * 
 * Without any modification to the api, the user can simply fetch just the 'name' property of all the objects.
 * One such example call is provided in the Postman collection - 'Get only the name and quantity of the inventory'
 **/
const graphQLServer = new ApolloServer({ typeDefs, resolvers });
exports.graphql = functions.https.onRequest(app);
graphQLServer.applyMiddleware({ app, path: "/", cors: true });

app.listen(port, () => {
  //tslint:disable-next-line:no-console
  console.log(
    `Server running at http://localhost:${port}${graphQLServer.graphqlPath}`
  );
});
