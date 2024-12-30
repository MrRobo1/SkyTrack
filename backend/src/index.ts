import dataSource from "./config/datasource";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { PilotResolver } from "./resolvers";
import * as jwt from "jsonwebtoken";

const start = async () => {
    try {
      await dataSource.initialize();
      console.log("Connected to database successfully!");
    } catch (error) {
        console.error("database connection failed:", error);
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    const schema = await buildSchema({
        resolvers: [PilotResolver],
    });

    const server = new ApolloServer({ schema });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req }) => {
            const token = req.headers.authorization?.split("Bearer ")[1];
            if (!token) {
                return { user: null };
            }
            
            try {
                const decodedToken = jwt.verify(token, jwtSecret);
                return { user: decodedToken };
            } catch (error) {
                console.error("Invalid token:", error);
                return { user: null };
            }
        },
    });

    console.log(`🚀 Server ready at ${url}`);
}

start();