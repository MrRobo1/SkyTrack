import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "ulas",
    password: "selin26",
    database: "ulas",
    entities: ["src/entities/*.ts"],
    synchronize: true
});

export default dataSource;