const express = require("express");
const { port } = require("./config/env");
const healthRoutes = require("./routes/health.routes");
const bfhlRoutes = require("./routes/bfhl.routes");
const { notFoundHandler, errorHandler } = require("./middlewares");

const app = express();

app.use(express.json());
app.use(healthRoutes);
app.use(bfhlRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});