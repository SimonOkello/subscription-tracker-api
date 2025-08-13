import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.send("GET all users");
});
userRouter.get("/:id", (req, res) => {
    res.send("GET Single User");
});
userRouter.post("/", (req, res) => {
    res.send("Create User");
});
userRouter.put("/:id", (req, res) => {
    res.send("Update User");
});
userRouter.delete("/:id", (req, res) => {
    res.send("Delete User");
});

export default userRouter;
