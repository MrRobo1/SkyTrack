import { Airport } from "../entities/airport.entity";
import dataSource from "../config/datasource";

async function seedAirports() {
  await dataSource.initialize();

  const airportRepo = dataSource.getRepository(Airport);
  const airportCount = await airportRepo.count();
  if (airportCount === 0) {
    await airportRepo.insert([
      {
        airport_name: "Paris Charles de Gaulle",
        code_ICAO: "LFPG",
        city: "Paris",
        country: "France",
      },
      {
        airport_name: "Lyon Saint-Exupéry",
        code_ICAO: "LFLL",
        city: "Lyon",
        country: "France",
      },
      {
        airport_name: "New York John F. Kennedy",
        code_ICAO: "KJFK",
        city: "New York",
        country: "USA",
      },
      {
        airport_name: "Los Angeles International",
        code_ICAO: "KLAX",
        city: "Los Angeles",
        country: "USA",
      },
    ]);
    console.log("Airport table seeded!");
  } else {
    console.log("Airport table not empty; skipping seed.");
  }
  await dataSource.destroy();
}

seedAirports().catch((err) => {
  console.error(err);
});