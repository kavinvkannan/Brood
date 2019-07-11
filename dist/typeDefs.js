"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge_graphql_schemas_1 = require("merge-graphql-schemas");
const apollo_server_express_1 = require("apollo-server-express");
/**
 * The purpose of this file is to support multiple .graphql types files,
 * so that the the graphQL schema definitions can be extracted to individual
 * '.graphql' file extensions and they all will be merged together here with the help of
 * "merge-graphql-schemas" library.
 */
const types = merge_graphql_schemas_1.fileLoader(`${__dirname}/**/*.graphql`, {
    recursive: true
});
exports.typeDefs = apollo_server_express_1.gql(merge_graphql_schemas_1.mergeTypes(types, { all: true }));
//# sourceMappingURL=typeDefs.js.map