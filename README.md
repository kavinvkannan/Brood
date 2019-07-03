# Brood API 
Brood api is a simple graphql server that serves querying and manipulation of few inventory items.
Learn more about [Graphiql here](https://github.com/graphql/graphiql).

In order to interact with this api a Postman Collection is added to this project that contains sample graphQL requests.

But if you are familiar with graphQL, then you may access the api through this link http://localhost:3000/graphql once the api is running locally
or from the Docker image.

# Project Dependencies
* VS code Editor - Recommended since you may use the Launch Program from the Debug mode to start the project.
* Docker
* npm 6.9.2 or above
* node version 10.13.0 or above.

## GraphQL Dependencies 

* [Apollo Server](https://www.apollographql.com/docs/apollo-server/index.html) is our server middleware in Express 
* [GraphQL Tools](https://www.apollographql.com/docs/graphql-tools/index.html) is a library to generate graphql schemas
* [GraphQL Type Json](https://github.com/taion/graphql-type-json) is a scalar type for JSON  

# Node
This project is using that v10.13.0 LTS supported version of node

# Development

To run this application on your local environment do the following: 

1. Clone the repository and navigate to project root

```
$ git clone git@github.com:Candore/Brood.git && cd brood
```

2. Install depenencies

```
$ npm install
```

3. Start the application

Using the VS code Debug mode, choose 'Launch Program'

or you may use 
```
npm start
```
# Unit Testing

 This project uses [JEST](https://jestjs.io/docs/en/getting-started) for unit testing.
 In order to run the unit test you may,
 * Use the VS Code Debug option, and you will find the jest configuration. Chosse this option and press play.
   You should see the Passing/Failing tests in the debug console.

 * You may also run the tests manually by entering the command.
 
 ```
jest run test 
```
 A successful test run should look something like this,

![JEST Output](https://github.com/Candore/Brood/blob/master/images/jest_output.png)

# Postman Collection
 
 For your convenience I have added a [Postman Collection](https://github.com/Candore/Brood/blob/master/postman/Brood.postman_collection.json) here.

Please down load this file as a .json to your desktop or to a desired directory.

In order to make graphQL queries, you will need the latest version of the postman, i.e Version 7.2.2 (7.2.2) and above should support this 
collection file.


# Docker

If you may choose to build and use a docker image, after starting the Docker app, from the root directory of the project enter the command
```
docker-compose up
```

This will build the docker image and the server should be listening on the port 3000.
Once finished you should see this message in the console.

```
Server running at http://localhost:3000/graphql
```

# Build Issue ?

If you may encounter a build issue related to graphql type, it can be fixed by copying the src/inventory/inventory.graphql file into dist/inventory folder and rebuilding the project.
