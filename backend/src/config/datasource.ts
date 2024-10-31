import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "your_password",
    database: "skytracker",
    entities: ["src/entities/*.ts"],
    synchronize: true
});

export default dataSource;