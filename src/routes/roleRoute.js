import express from "express";
import {
  createRoleController,
  deleteRoleController,
  getAllRoleController,
  getRoleByIdController,
  updateRoleController,
} from "../controllers/roleController.js";

const router = express.Router();

router.post("/create", createRoleController);
router.get("/", getAllRoleController);
router.get("/get-role/:id", getRoleByIdController);
router.put("/update/:id", updateRoleController);
router.delete("/:id", deleteRoleController);

export default router;
