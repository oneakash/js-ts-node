const express = require("express");
const path = require("path");

const propertyRoutes = require("./routes/property.routes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve backend images
app.use(
  "/images",
  express.static(path.join(__dirname, "images"))
);

// API routes
app.use("/", propertyRoutes);

// Frontend entry page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});