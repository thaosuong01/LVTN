import { ApiError } from "../middlewares/api-error.js";
import Topic from "../models/Topic.js";

export const createTopicController = async (req, res, next) => {
  try {
    const { topic_name, topic_type, class_id } = await req.body;

    // const exist = await Topic.findOne({ topic_name });

    // if (exist) {
    //   return res.status(409).json("Topic already exists");
    // }

    const createTopic = await Topic.create({
      topic_name,
      topic_type,
      class_id,
    });

    const topic = await createTopic.populate(
      "class_id",
      "class_code class_name"
    );

    return res.status(201).json(topic);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const getAllTopicController = async (req, res, next) => {
  try {
    const topics = await Topic.find().populate(
      "class_id",
      "class_code class_name"
    );

    return res.status(200).json(topics);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const getTopicsByClassController = async (req, res, next) => {
  const classId = await req.params.cid;

  try {
    const topics = await Topic.find({ class_id: classId });

    return res.status(200).json(topics);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const getTopicByIdController = async (req, res, next) => {
  try {
    const topic_id = await req.params.id;

    const topic = await Topic.findById(topic_id).populate(
      "class_id",
      "class_code class_name"
    );

    if (!topic) {
      return next(new ApiError(404, "Topic not found"));
    }

    return res.status(200).json(topic);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const updateTopicController = async (req, res, next) => {
  const topicId = await req.params.tid;
  console.log(topicId);
  try {
    const { topic_name, topic_type } = req.body;
    const updatedTopic = await Topic.findByIdAndUpdate(
      topicId,
      { topic_name, topic_type },
      { new: true }
    );

    if (!updatedTopic) {
      return next(new ApiError(404, "Topic not found"));
    }

    return res.status(201).json(updatedTopic);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const getTypeOfTopic = async (req, res, next) => {
  try {
    const types = ["DOCUMENT", "PRACTICE"];
    return res.status(201).json(types);
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};

export const deleteTopicController = async (req, res, next) => {
  try {
    const tid = req.params.tid;

    // Kiểm tra xem topic có tồn tại không
    const topic = await Topic.findById(tid);
    if (!topic) {
      throw new ApiError(404, "Topic not found");
    }

    // Xóa topic
    await Topic.findByIdAndDelete(tid);

    return res.status(200).json({ message: "Topic deleted successfully" });
  } catch (error) {
    console.log(error);
    next(new ApiError(500, error.message));
  }
};
