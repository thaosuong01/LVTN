import express from "express";
import {
  createTopicController,
  deleteTopicController,
  getAllTopicController,
  getTopicByIdController,
  getTopicsByClassController,
  getTypeOfTopic,
  updateTopicController,
} from "../controllers/topicController.js";

const router = express.Router();

router.post("/create", createTopicController);
router.get("/", getAllTopicController);
router.get("/get-topic/:id", getTopicByIdController);
router.get("/get-type-of-topic", getTypeOfTopic);
router.get("/get-topic-by-class/:cid", getTopicsByClassController);
router.put("/update-topic/:tid", updateTopicController);
router.delete("/delete/:tid", deleteTopicController);

export default router;
