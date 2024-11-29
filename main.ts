import { ApolloServer } from "@apollo/server";
import { squema } from "./squema.ts";
import { MongoClient } from "mongodb";
import { vueloModel } from "./types.ts";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";

const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  throw new Error("Please provide a MONGO_URL");
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();

console.info("Connected to MongoDB");

const mongoDB = mongoClient.db("vuelos");
const vuelosCollection = mongoDB.collection<vueloModel>("vuelos");

const server = new ApolloServer({
  typeDefs: squema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ vuelosCollection }),
});

console.info(`Server ready at ${url}`);
