import dataSource from "./config/datasource";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { PilotResolver } from "./resolvers";

const start = async () => {
    await dataSource.initialize();


    const schema = await buildSchema({
        resolvers: [PilotResolver],
    });

    const server = new ApolloServer({ schema});
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4001 },
    });

    console.log(`🚀 Server ready at ${url}`);
}

start();