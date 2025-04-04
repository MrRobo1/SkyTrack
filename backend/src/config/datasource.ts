import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/entities/*.ts"],
    synchronize: true
});

export default dataSource;