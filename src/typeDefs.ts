import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import { gql } from "apollo-server-express";

/**
 * The purpose of this file is to support multiple .graphql types files,
 * so that the the graphQL schema definitions can be extracted to individual 
 * '.graphql' file extensions and they all will be merged together here with the help of 
 * "merge-graphql-schemas" library.
 */
const types = fileLoader(`${__dirname}/**/*.graphql`, {
  recursive: true
});

export const typeDefs = gql(mergeTypes(types, { all: true }));
