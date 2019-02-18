import { mergeResolvers } from "merge-graphql-schemas";
import Client from "./Client/";
import Order from "./Order/";

const resolvers = [Client, Order];

export default mergeResolvers(resolvers);