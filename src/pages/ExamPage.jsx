import React, { useEffect, useState } from "react";
import Quiz from "react-quiz-component";
import "./style.css";
import { useParams } from "react-router-dom";
import { apiGetExamSetById } from "../api/examSet";

// const segment = {
//   basic: "Cơ bản",
//   medium: "Trung bình",
//   advanced: "Nâng cao",
// };
const quizDataa = {
  quizTitle: "Tiêu đề bài thi",
  quizSynopsis: "Mô tả đề thi...",
  // nrOfQuestions: "6",
  questions: [
    {
      id: 1,
      question:
        "How can you access the state of a component from inside of a member function?",
      questionType: "text",
      // answerSelectionType: "single",
      answers: [
        "this.getState()",
        "this.prototype.stateValue",
        "this.state",
        "this.values",
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      // explanation:
      //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20",
    },
    {
      id: 2,
      question: "ReactJS is developed by ?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Google Engineers", "Facebook Engineers"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20",
    },
    {
      id: 3,
      question: "ReactJS is an MVC based framework?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["True", "False"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "10",
    },
    {
      question: "Which of the following concepts is/are key to ReactJS?",
      questionType: "text",
      answerSelectionType: "single",
      answers: [
        "Component-oriented design",
        "Event delegation model",
        "Both of the above",
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "30",
    },
    {
      question:
        "How does the initial page of any react project looks like if we create the project using vite",
      questionType: "text",
      answerSelectionType: "single",
      answers: [
        "https://github.com/wingkwong/react-quiz-component/assets/35857179/e169cd44-13a7-4301-9d30-6c0859d3ac35",
        "https://github.com/wingkwong/react-quiz-component/assets/35857179/30b4aa3d-2523-4d73-9e3b-27ce44ffd50a",
        "https://github.com/wingkwong/react-quiz-component/assets/35857179/64da0348-30b7-4a13-9fea-791537c49109",
        "https://github.com/wingkwong/react-quiz-component/assets/35857179/660e9255-8a16-4e0f-a7e4-81ba6ac0f9bc",
      ],
      correctAnswer: "1",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20",
    },
    {
      question: "What are the advantages of React JS?",
      questionType: "text",
      answerSelectionType: "multiple",
      answers: [
        "React can be used on client and as well as server side too",
        "Using React increases readability and makes maintainability easier. Component, Data patterns improves readability and thus makes it easier for manitaining larger apps",
        "React components have lifecycle events that fall into State/Property Updates",
        "React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer",
      ],
      correctAnswer: [1, 2, 4],
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20",
    },
  ],
  appLocale: {
    startQuizBtn: "Bắt đầu",
    landingHeaderText: "<questionLength> câu hỏi",
    question: "Câu hỏi",
    prevQuestionBtn: "Quay lại",
    nextQuestionBtn: "Kế tiếp",
    resultFilterAll: "Tất cả",
    resultFilterCorrect: "Đúng",
    resultFilterIncorrect: "Sai",
    singleSelectionTagText: "Câu hỏi đơn",
    marksOfQuestion: "(<marks> điểm)",
    multipleSelectionTagText: "Câu hỏi nhiều đáp án",
    pickNumberOfSelection: "Chọn <numberOfSelection> đáp án",
    resultPagePoint: "Điểm số của bạn là <correctPoints>/<totalPoints>.",
    resultPageHeaderText:
      "Bạn đã hoàn thành phần thi. Bạn đã trả lời đúng <correctIndexLength>/<questionLength> câu hỏi.",
  },
};

const segment = {
  basic: "Basic",
  medium: "Medium",
  advanced: "Advanced",
};

const quiz = {
  quizTitle: "React Quiz Component Demo",
  quizSynopsis:
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
  nrOfQuestions: "6",
  questions: [
    {
      question:
        "How can you access the state of a component from inside of a member function?",
      questionPic: "https://dummyimage.com/600x400/000/fff&text=X",
      questionType: "text",
      answerSelectionType: "single",
      answers: [
        "this.getState()",
        "this.prototype.stateValue",
        "this.state",
        "this.values",
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20",
      segment: segment.advanced,
    },
    {
      question: "ReactJS is developed by ?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Google Engineers", "Facebook Engineers"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20",
      segment: segment.basic,
    },
    {
      question: "ReactJS is an MVC based framework?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["True", "False"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "10",
    },
    {
      question: "Which of the following concepts is/are key to ReactJS?",
      questionType: "text",
      answerSelectionType: "single",
      answers: [
        "Component-oriented design",
        "Event delegation model",
        "Both of the above",
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "30",
      segment: segment.medium,
    },
    {
      question:
        "How does the initial page of any react project looks like if we create the project using vite",
      questionType: "photo",
      answerSelectionType: "single",
      answers: [
        "https://github.com/wingkwong/react-quiz-component/assets/35857179/e169cd44-13a7-4301-9d30-6c0859d3ac35",
        "https://github.com/wingkwong/react-quiz-component/assets/35857179/30b4aa3d-2523-4d73-9e3b-27ce44ffd50a",
        "https://github.com/wingkwong/react-quiz-component/assets/35857179/64da0348-30b7-4a13-9fea-791537c49109",
        "https://github.com/wingkwong/react-quiz-component/assets/35857179/660e9255-8a16-4e0f-a7e4-81ba6ac0f9bc",
      ],
      correctAnswer: "1",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20",
    },
    {
      question: "What are the advantages of React JS?",
      questionType: "text",
      answerSelectionType: "multiple",
      answers: [
        "React can be used on client and as well as server side too",
        "Using React increases readability and makes maintainability easier. Component, Data patterns improves readability and thus makes it easier for manitaining larger apps",
        "React components have lifecycle events that fall into State/Property Updates",
        "React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer",
      ],
      correctAnswer: [1, 2, 4],
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20",
    },
  ],
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
  const [quizResult, setQuizResult] = useState();
  console.log("quizResult: ", quizResult);

  const { exam_id } = useParams();
  console.log("exam_id: ", exam_id);

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

        console.log(`after random`, randomDataQuestions);

        // const randomData =

        console.log("data: ", data);
        setQuizData({
          quizTitle: data.quizTitle,
          quizSynopsis: data.quizSynopsis,
          questions: randomDataQuestions,
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getExamSetById(exam_id);
  }, [exam_id]);
  return (
    <div>
      {quizData && (
        <Quiz
          quiz={quizData}
          // allowNavigation
          // shuffle={true}
          // shuffleAnswer={true}
          // showInstantFeedback={false}
          onComplete={setQuizResult}
          onQuestionSubmit={(obj) => console.log("user question results:", obj)}
          disableSynopsis
        />
      )}
    </div>
  );
};

export default ExamPage;
