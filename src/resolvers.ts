import { fileLoader, mergeResolvers } from "merge-graphql-schemas";
import path from "path";
/**
 * The purpose of this file is to support multiple graphql resolvers files,
 * so that the the graphQL resolver definitions can be extracted to individual 
 * '.resolvers.ts' file extensions and they all will be merged together here with the help of 
 * "merge-graphql-schemas" library.
 */
const resolversArray = fileLoader(path.join(__dirname, "./**/*.resolvers.*"));

export const resolvers = mergeResolvers(resolversArray);
