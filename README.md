## SkyTrack

SkyTrack is a web application for pilots to manage their flights, track statistics (e.g., total flights, total distance, total hours flown), and store flight details (departure/arrival airports, aircraft, fuel usage, etc.). It’s designed to be simple and intuitive, offering insights into one’s flight history.

⸻

Features
	•	User Registration & Authentication: Easily create an account and sign in via email and password.
	•	Flight Management: Create and track flights, including departure/arrival airports, distance, and duration.
	•	Statistics: View total flights, distance, and hours flown in a handy dashboard.
	•	Responsive UI: Access the application from desktop or mobile devices.

⸻

Getting Started

These instructions will help you run SkyTrack locally for development and testing.

Prerequisites
	•	Node.js (v16 or higher recommended)
	•	pnpm or npm for dependency management
	•	Docker if you plan to run the application with Docker and Postgres

Installation Steps
	1.	Clone the repository:
       git clone https://github.com/YourUsername/SkyTrack.git
       cd SkyTrack

  	2.	Install dependencies:
	•	Backend:
      cd backend
      pnpm install

  •	Frontend:
      cd ../frontend
      pnpm install

3.	Configure environment variables:
	•	Create a .env file in backend/ containing database and JWT settings, for example:
      DB_HOST=localhost
      DB_PORT=5432
      DB_USERNAME=postgres
      DB_PASSWORD=postgres
      DB_NAME=skytrack
      JWT_SECRET=some_super_secret
  	  NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql

4.	Run the application:
	•	Using Docker (optional):
      docker-compose up --build

5.	Open your browser at http://localhost:3000/ and explore SkyTrack.

⸻

Future Updates
	•	Code Refactoring: Improving code structure, splitting logic into maintainable services/resolvers.
	•	Enhanced Statistics UI: Redesigning charts and analytics for more intuitive flight data visualization.
	•	Flight Edit & Delete Feature: Allowing users to modify or remove existing flights.
	•	Additional Upgrades: Potentially supporting multi-user roles, advanced filtering, or multi-lingual options.

⸻

Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss your ideas. Make sure to update tests as appropriate.
