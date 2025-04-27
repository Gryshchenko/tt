import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import cors from "cors";

const startUp = async () => {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("🚀 Server ready at http://localhost:4000/graphql");
  });
};

startUp().catch((error) => {
  console.log(error, "Error while starting server");
});
