import express from "express";
import {
  createRoleController,
  deleteRoleController,
  getAllRoleController,
  updateRoleController,
} from "../controllers/roleController.js";

const router = express.Router();

router.post("/create", createRoleController);
router.get("/", getAllRoleController);
router.get("/:id", updateRoleController);
router.put("/update/:id", updateRoleController);
router.delete("/:id", deleteRoleController);

export default router;
