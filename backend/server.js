const express = require("express");
const pool = require("../backend/models/db");
const cors = require("cors");
const productRoutes = require("./routes/productsRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const finishingRoutes = require("./routes/finishing.routes");
const materialRoutes = require("./routes/materialRoutes");
const colorRoutes = require("./routes/colorRoutes");
const FrameType = require("./routes/FrameType.Routes");
const ShapeRoutes = require("./routes/shape.Routes");
const collectionRoutes = require("./routes/Collection.routes");
const StoreRoutes = require("./routes/store.Routes");
const loginUser = require("./routes/userRoutes");
const emailRoutes = require("./routes/Email.Routes");
const FooterEmail = require("./routes/FooterEmail.Routes");
const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 4000;

// midlle for FrontEnd
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(compression());

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost",
    "https://onedegreeeyewear.com",
    "https://148.66.155.235",
  ],
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use("/api", productRoutes);
app.use("/api/login", loginUser);

app.use("/api/categories", categoryRoutes);
app.use("/api/finishing", finishingRoutes);
app.use("/api/collection", collectionRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/products", productRoutes);
app.use("/api/colors", colorRoutes);

app.use("/api/frametype", FrameType);
app.use("/api/shape", ShapeRoutes);
app.use("/api/store", StoreRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/newsletter", FooterEmail);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// simple request logger so we can tell if a route is hit
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
