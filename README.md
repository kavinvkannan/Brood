# Brood API 
Brood api is a simple graphql server that serves querying and manipulation of few inventory items.
Learn more about [Graphiql here](https://github.com/graphql/graphiql).

In order to interact with this api, I will provide a Postman Collection that has sample graphQL requests.

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

[JEST Output](https://github.com/Candore/Brood/blob/master/images/jest_output.png)
# Docker

If you choose to build and use a docker image, make sure you have the Docker app running and from the rood directory of the project enter the command
```
docker-compose up
```

This will build the docker image and the server should be listening on the port 3000.
Once finished you should see this message in the console.

```
Server running at http://localhost:3000/graphql
```
