"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_graphql_schemas_1 = require("merge-graphql-schemas");
const path_1 = __importDefault(require("path"));
/**
 * The purpose of this file is to support multiple graphql resolvers files,
 * so that the the graphQL resolver definitions can be extracted to individual
 * '.resolvers.ts' file extensions and they all will be merged together here with the help of
 * "merge-graphql-schemas" library.
 */
const resolversArray = merge_graphql_schemas_1.fileLoader(path_1.default.join(__dirname, "./**/*.resolvers.*"));
exports.resolvers = merge_graphql_schemas_1.mergeResolvers(resolversArray);
//# sourceMappingURL=resolvers.js.map