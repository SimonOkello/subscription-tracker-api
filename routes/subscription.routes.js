import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
    res.send("Get all subscriptions");
});
subscriptionRouter.get("/:id", (req, res) => {
    res.send("Get Single Subscription");
});
subscriptionRouter.post("/", (req, res) => {
    res.send("Create Subscription");
});
subscriptionRouter.put("/:id", (req, res) => {
    res.send("Update Subscription");
});
subscriptionRouter.delete("/:id", (req, res) => {
    res.send("Delete Subscription");
});
subscriptionRouter.get("/user/:id", (req, res) => {
    res.send("Get all user's subscriptions");
});
subscriptionRouter.put("/:id/cancel", (req, res) => {
    res.send("Cancel Subscription");
});
subscriptionRouter.put("/upcoming-renewals", (req, res) => {
    res.send("Get all upcoming renewals");
});
export default subscriptionRouter;
