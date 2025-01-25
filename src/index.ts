import express from "express";
import bodyParser from "body-parser";
import * as OpenApiValidator from "express-openapi-validator";
import { calendarQueryController } from "./controller.ts";
import { getFullPathForFile } from "./util.ts";

const app = express();
const port = 3000; // TODO: Use environment variables for the port

app.use(bodyParser.json());

// This middleware will validate the request against the OpenAPI schema
app.use(
	OpenApiValidator.middleware({
		apiSpec: getFullPathForFile("openapi.yaml"),
		validateRequests: true,
	}),
);

// This middleware will handle any validation errors and return a 400 response
const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
};
app.use(errorHandler);

// API Routes
app.post("/calendar/query", calendarQueryController);

// Start the server
app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});
