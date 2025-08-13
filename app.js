import express from "express";
import { PORT } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import limiter from "./middlewares/ratelimit.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(limiter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);

app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("Welcome to the Subscription Tracker API!");
});

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    //connect to database
    await connectToDatabase();
});

export default app;
