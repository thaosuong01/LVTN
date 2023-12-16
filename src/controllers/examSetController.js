import { ApiError } from "../middlewares/api-error.js";
import ExamSet from "../models/ExamSet.js";
import Question from "../models/Question.js";

export const createExamSet = async (req, res, next) => {
  try {
    console.log("req.body: ", req.body);

    const { set_name, desc, attempt_count, class_id, topic_id, questions } =
      req.body;

    const examSet = await ExamSet.create({
      set_name,
      desc,
      attempt_count,
      class_id,
      topic_id,
    });

    if (!examSet) throw new ApiError(400, "Fail to create exam set");
    const examSetId = examSet._id;

    const updatedQuestions = questions.map((question) => ({
      ...question,
      exam_set_id: examSetId,
    }));
    console.log("updatedQuestions: ", updatedQuestions);

    const questionsCreated = await Question.insertMany(updatedQuestions);
    if (questionsCreated) {
      return res.status(201).json(questionsCreated);
    }
  } catch (error) {
    console.log("error: ", error);
    next(new ApiError(500, error.message));
  }
};

export const updateExamSet = async (req, res, next) => {
  try {
    console.log("req.body: ", req.body);
    const { exam_id } = req.params;
    console.log("exam_id: ", exam_id);
    const { set_name, desc, attempt_count, questions } = req.body;

    const updatedExamSet = await ExamSet.findByIdAndUpdate(
      exam_id,
      {
        set_name,
        desc,
        attempt_count,
      },
      { new: true }
    );
    if (!updatedExamSet) throw new ApiError(400, "Fail to update exam");

    const deletedQuestions = await Question.deleteMany({
      exam_set_id: exam_id,
    });
    console.log("deletedQuestions: ", deletedQuestions);

    const updatedQuestions = questions.map((question) => ({
      ...question,
      exam_set_id: exam_id,
    }));
    console.log("updatedQuestions: ", updatedQuestions);

    const questionsCreated = await Question.insertMany(updatedQuestions);
    console.log("questionsCreated: ", questionsCreated);

    return res.status(200).json(updatedExamSet);
  } catch (error) {
    console.log("error: ", error);
    next(new ApiError(500, error.message));
  }
};

export const getExamSetById = async (req, res, next) => {
  try {
    const { exam_id } = req.params;

    let examSets = await ExamSet.findById(exam_id).lean();

    if (!examSets) {
      throw new ApiError(404, "Exam set not found!");
    }

    const exam_set_id = examSets?._id;

    const questions = await Question.find({ exam_set_id }).lean();

    if (!questions) {
      throw new ApiError(404, "questions not found!");
    }

    examSets = {
      ...examSets,
      quizTitle: examSets.set_name,
      quizSynopsis: examSets.desc,
      questions,
    };

    return res.status(200).json(examSets);
  } catch (error) {
    console.log("error: ", error);
    next(new ApiError(500, error.message));
  }
};

export const getExamSets = async (req, res, next) => {
  try {
    const examSet = await ExamSet.find();
    if (!examSet) {
      return res.status(404).json("Exam set not found");
    }
    return res.status(200).json(examSet);
  } catch (error) {
    next(new ApiError(500, error.message));
    console.log("error: ", error);
  }
};

export const getExamSetByClassId = async (req, res, next) => {
  try {
    const { class_id } = req.params;
    const examSets = await ExamSet.find({ class_id });

    if (!examSets) {
      return res.status(404).json("Exam set not found");
    }

    return res.status(200).json(examSets);
  } catch (error) {
    next(new ApiError(500, error.message));
    console.log("error: ", error);
  }
};


export const deleteExamSet = async (req, res, next) => {
  try {
    const { exam_id } = req.params;

    const deletedExamSet = await ExamSet.findByIdAndDelete(exam_id);
    if (!deletedExamSet) throw new ApiError(400, "Exam set not found!");
    console.log("deletedExamSet: ", deletedExamSet);

    const deletedQuestion = await Question.deleteMany({ exam_set_id: exam_id });
    if (!deletedQuestion) throw new ApiError(400, "Fail to delete question");
    console.log("deletedQuestion: ", deletedQuestion);

    return res.status(200).json(deletedExamSet);
  } catch (error) {
    console.log("error: ", error);
    next(new ApiError(500, error.message));
  }
};
