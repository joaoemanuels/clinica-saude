import express from "express";
import cors from "cors";

import availableRoutes from "./routes/available.js";
import appointmentsRoutes from "./routes/appointments.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use(availableRoutes);
app.use(appointmentsRoutes);

app.get("/health", (_req, res) => res.json({ status: "ok" }));