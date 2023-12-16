import React, { useEffect, useState } from "react";
import Quiz from "react-quiz-component";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { apiGetExamResult, apiUpdateExamResult } from "../api/examResult";
import { apiGetExamSetById } from "../api/examSet";
import "./style.css";
import Swal from "sweetalert2";

const appLocale = {
  startQuizBtn: "Bắt đầu",
  landingHeaderText: "<questionLength> câu hỏi",
  question: "Câu hỏi",
  prevQuestionBtn: "Quay lại",
  nextQuestionBtn: "Kế tiếp",
  singleSelectionTagText: "Câu hỏi đơn",
  marksOfQuestion: "(<marks> điểm)",
  multipleSelectionTagText: "Câu hỏi nhiều đáp án",
  pickNumberOfSelection: "Chọn <numberOfSelection> đáp án",
  resultPagePoint: "Điểm số của bạn là <correctPoints>/<totalPoints>.",
  resultPageHeaderText:
    "Bạn đã hoàn thành phần thi. Bạn đã trả lời đúng <correctIndexLength>/<questionLength> câu hỏi.",
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const ExamPage = () => {
  const [quizData, setQuizData] = useState(null);
  // console.log("quizData: ", quizData);
  const [quizResult, setQuizResult] = useState();
  // console.log("quizResult: ", quizResult);

  const { exam_id } = useParams();
  const { user } = useSelector((state) => state.user);

  const handleBackClick = () => {
    window.history.back(); // This will navigate back in the browser history
  };

  const getExamSetById = async (exam_id) => {
    try {
      const response = await apiGetExamSetById(exam_id);
      console.log("response: ", response);

      if (response) {
        const data = response.data;
        let questionsData = [...data?.questions];

        const randomDataQuestions = [...shuffle(questionsData)].map((t) => {
          const answersRandom = [...shuffle([...t.answers])];

          const questionCorrect = t?.questionCorrect;

          const findIndex = answersRandom.findIndex((t) => {
            return (
              String(t)?.toLowerCase() === String(questionCorrect).toLowerCase()
            );
          });

          return {
            ...t,
            answers: answersRandom,
            correctAnswer: `${findIndex + 1}`,
          };
        });

        // console.log(`after random`, randomDataQuestions);

        // const randomData =

        console.log("data: ", data);
        setQuizData({
          appLocale,
          quizTitle: data.quizTitle,
          quizSynopsis: data.quizSynopsis,
          questions: randomDataQuestions,
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const checkAttemptCount = async (user_id, exam_id) => {
    try {
      const response = await apiGetExamSetById(exam_id);
      const attempt_count_exam = response?.data?.attempt_count;
      // console.log("attempt_count_exam: ", attempt_count_exam);

      if (user_id) {
        const response2 = await apiGetExamResult(user_id, exam_id);
        const attempt_count_user = response2?.data?.attempt_count;
        // console.log("attempt_count_user: ", attempt_count_user);

        if (+attempt_count_user > +attempt_count_exam) {
          Swal.fire({ text: "Đã vượt quá số lần thi" }).then(() => {
            handleBackClick();
          });
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    checkAttemptCount(user?._id, exam_id);
    getExamSetById(exam_id);
  }, [exam_id, user]);

  const handleComplete = async (data) => {
    try {
      setQuizResult(data);
      data.exam_set_id = exam_id;
      data.user_id = user?._id;

      console.log("data: ", data);
      const response = await apiGetExamResult(data?.user_id, data?.exam_set_id);

      data.attempt_count = +response?.data?.attempt_count || 0;
      console.log("data.attempt_count: ", data.attempt_count);
      // const response  = await apiUpdateExamResult(data)
      console.log("response: ", response);
      if (!response.data) {
        console.log("chua thi lan nao, tao moi");
        data.attempt_count += 1;
        const update = await apiUpdateExamResult(data);
        console.log("update 1: ", update);
        return;
      }

      if (
        +data.numberOfCorrectAnswers >= response.data?.numberOfCorrectAnswers
      ) {
        console.log("điểm thi mới lớn hơn hoặc bằng cập nhật db");
        data.attempt_count += 1;
        const update = await apiUpdateExamResult(data);
        console.log("update 2: ", update);
      } else if (
        +data.numberOfCorrectAnswers < response.data?.numberOfCorrectAnswers
      ) {
        console.log("điểm thi mới nhỏ hơn, cập nhật số lần thi ++");
        data.attempt_count += 1;
        const update = await apiUpdateExamResult({
          attempt_count: data.attempt_count,
          exam_set_id: data.exam_set_id,
          user_id: data.user_id,
        });
        console.log("update 3: ", update);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <div className="bg-white pb-4">
      {quizData && (
        <Quiz
          quiz={quizData}
          // allowNavigation
          // shuffle={true}
          // shuffleAnswer={true}
          // showInstantFeedback={false}
          onComplete={(data) => handleComplete(data)}
          onQuestionSubmit={(obj) => console.log("user question results:", obj)}
          // disableSynopsis
        />
      )}

      {quizResult && (
        <div className="flex justify-center">
          <button
            className="bg-primary text-white p-1 hover:bg-hover"
            variant="contained"
            onClick={handleBackClick}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default ExamPage;
