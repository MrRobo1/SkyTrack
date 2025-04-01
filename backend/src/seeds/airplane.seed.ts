import { Airplane } from "../entities/airplane.entity";
import dataSource from "../config/datasource";

async function seedAirplanes() {
    await dataSource.initialize();

    const airplaneRepo = dataSource.getRepository(Airplane);

    const airplaneCount = await airplaneRepo.count();
    if (airplaneCount === 0) {
        await airplaneRepo.insert([
            {
                airplane_name: "Cessna 172",
                registration: "F-ABCD",
            },
            {
                airplane_name: "Airbus A320",
                registration: "F-HBNJ",
            },
            {
                airplane_name: "Boeing 737-800",
                registration: "G-XLEY",
            },
        ]);
        console.log("Airplane table seeded!");
    } else {
        console.log("Airplane table not empty; skipping seed.");
    };

    await dataSource.destroy();
}

seedAirplanes().catch((err) => {
    console.error(err);
});