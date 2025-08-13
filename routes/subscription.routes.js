import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
    cancelUserSubscription,
    createSubscription,
    deleteUserSubscription,
    getSubscription,
    getSubscriptions,
    getUserSubscriptions,
    updateUserSubscription,
    userUpcomingRenewals,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getSubscriptions);
subscriptionRouter.get("/:id", authorize, getSubscription);
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);
subscriptionRouter.get("/user/:id/upcoming-renewals", authorize, userUpcomingRenewals);
subscriptionRouter.post("/:id/cancel", authorize, cancelUserSubscription);
subscriptionRouter.put("/:id", authorize, updateUserSubscription);
subscriptionRouter.delete("/:id", authorize, deleteUserSubscription);
export default subscriptionRouter;
