import express from "express";

import userController from "../controllers/user.controller";

const router = express.Router();

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.put("/:id", userController.updateUserById);

router.patch("/profile-image/:id", userController.updateProfileImageById);

router.delete("/:id", userController.deleteUserById);

export default router;
