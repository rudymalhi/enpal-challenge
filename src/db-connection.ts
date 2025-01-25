import pg from "pg";

// TODO: Use environment variables for the connection parameters
export const dbClient = new pg.Pool({
	host: "localhost",
	port: 5432,
	user: "postgres",
	password: "mypassword123!",
	database: "coding-challenge",
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});
