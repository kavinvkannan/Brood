"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebase_functions_1 = __importDefault(require("firebase-functions"));
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = require("./resolvers");
const typeDefs_1 = require("./typeDefs");
// import firebase from "firebase";
dotenv_1.default.config(); // Intializes configuration to manage environment variable
const port = process.env.SERVER_PORT;
const app = express_1.default();
firebase_admin_1.default.initializeApp();
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
const graphQLServer = new apollo_server_express_1.ApolloServer({ typeDefs: typeDefs_1.typeDefs, resolvers: resolvers_1.resolvers });
exports.graphql = firebase_functions_1.default.https.onRequest(app);
graphQLServer.applyMiddleware({ app, path: "/", cors: true });
app.listen(port, () => {
    //tslint:disable-next-line:no-console
    console.log(`Server running at http://localhost:${port}${graphQLServer.graphqlPath}`);
});
//# sourceMappingURL=index.js.map