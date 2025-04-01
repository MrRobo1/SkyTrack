import "reflect-metadata";
import dataSource from "./config/datasource";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSchema } from "type-graphql";
import { PilotResolver, AirportResolver, AirplaneResolver, FlightResolver } from "./resolvers";
import * as jwt from "jsonwebtoken";
import * as cookie from "cookie";
import cors from "cors";
import express from "express";
import { MyContext, AuthTokenPayload } from "./types/index";

async function start() {
  try {
    await dataSource.initialize();
    console.log("Connected to database successfully!");
  } catch (error) {
    console.error("database connection failed:", error);
  }

  // Vérifier la variable d'env du secret JWT
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  // Construire le schéma TypeGraphQL
  const schema = await buildSchema({
    resolvers: [PilotResolver, AirportResolver, AirplaneResolver, FlightResolver],
  });

  // Créer une instance ApolloServer
  const server = new ApolloServer<MyContext>({
    schema,
  });
  await server.start();

  // Créer l'application Express
  const app = express();

  app.use(express.json());

  // Configurer CORS pour autoriser localhost:3000 + envoi des credentials (cookies)
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  // Brancher le middleware Apollo sur le path /graphql
  // et gérer le contexte pour décoder le cookie "token"
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const cookieHeader = req.headers.cookie || "";
        if (!cookieHeader) {
          return { user: null };
        }

        const parsedCookies = cookie.parse(cookieHeader);
        const token = parsedCookies["token"];
        if (!token) {
          return { user: null };
        }

        try {
          const decodedToken = jwt.verify(token, jwtSecret) as AuthTokenPayload;
          return { user: decodedToken };
        } catch (error) {
          console.error("Invalid token:", error);
          return { user: null };
        }
      },
    })
  );

  // Lancer le serveur sur le port 4000
  app.listen(4000, "0.0.0.0", () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  });

  app.get("/", (_req, res) => {
    res.status(200).send("OK");
  });
}

start().catch((err) => console.error("Server error:", err));