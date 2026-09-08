const express = require("express");
const path = require("path");

const propertyRoutes = require("./routes/property.routes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve images
app.use(
  "/images",
  express.static(path.join(__dirname, "images"))
);

app.use("/", propertyRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});