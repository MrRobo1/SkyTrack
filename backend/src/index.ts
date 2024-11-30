import dataSource from "./config/datasource";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { PilotResolver } from "./resolvers";

const start = async () => {
    try {
      await dataSource.initialize();
      console.log("Connected to database successfully!");
    } catch (error) {
        console.error("database connection failed:", error);
    }

    const schema = await buildSchema({
        resolvers: [PilotResolver],
    });

    const server = new ApolloServer({ schema});
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`🚀 Server ready at ${url}`);
}

start();