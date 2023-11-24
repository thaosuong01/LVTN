import AddIcon from "@mui/icons-material/Add";
import { Checkbox, List, ListItem, Stack } from "@mui/material";
import { Fragment, useState } from "react";

import { default as React } from "react";

import { useParams } from "react-router-dom";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { apiGetClassById } from "../api/class";
import {
  apiDeleteExerciseById,
  apiGetExerciseByClassId,
} from "../api/exercise";
import { apiDeleteTopic, apiGetTopicByClass } from "../api/topic";
import { apiDeleteDocumentById, apiGetDocByClassId } from "../api/upload";
import { path } from "../utils/path";
import ModalAdd from "./ModalAdd";
import ModalAddTopic from "./ModalAddTopic";
import ModalEditDocument from "./ModalEditDocument";
import ModalEditTopic from "./ModalEditTopic";

const ListDocument = () => {
  const { isEditMode: editMode } = useSelector((state) => state.course);

  const [topics, setTopics] = useState();

  const [classId, setClassId] = useState("");

  const [topicId, setTopicId] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = (topicId) => {
    setOpen(true);
    setTopicId(topicId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
  };

  const handleOpenModalAdd = (classId, topicId) => {
    setOpenModalAdd(true);
    setTopicId(topicId);
    setClassId(classId);
  };

  const [openAddTopic, setOpenAddTopic] = useState(false);
  const handleCloseAddTopic = () => {
    setOpenAddTopic(false);
  };

  const handleOpenAddTopic = () => {
    setOpenAddTopic(true);
  };

  const onCloseModalAdd = () => {
    setOpenModalAdd(false);
    getDocumentsByClassId(cid);
  };

  const [docId, setDocId] = useState("");
  const [openModalEditDocument, setOpenModalEditDocument] = useState(false);

  const handleOpenModalEditDocument = (docId) => {
    setOpenModalEditDocument(true);
    setDocId(docId);
  };

  const handleCloseModalEditDocument = () => {
    setOpenModalEditDocument(false);
    getDocumentsByClassId(cid);
  };

  const { user } = useSelector((state) => state.user);
  console.log("user: ", user);

  const { cid } = useParams();

  const [classes, setClasses] = useState();
  useEffect(() => {
    async function getClass() {
      const response = await apiGetClassById(cid);
      setClasses(response?.data);
    }

    getClass();
  }, [cid]);

  async function getTopic() {
    const topics = await apiGetTopicByClass(cid);
    setTopics(topics?.data);
  }

  useEffect(() => {
    getTopic();
  }, [cid]);

  const [documents, setDocuments] = useState([]);

  const getDocumentsByClassId = async (cid) => {
    try {
      const response = await apiGetDocByClassId(cid);
      setDocuments(response?.data.documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    // Gọi hàm getDocumentsByClassId với cid hiện tại
    getDocumentsByClassId(cid);
  }, [cid]);

  const [exercises, setExercises] = useState([]);

  const getExercisesByClassId = async (cid) => {
    try {
      const response = await apiGetExerciseByClassId(cid);
      setExercises(response?.data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  useEffect(() => {
    // Gọi hàm getDocumentsByClassId với cid hiện tại
    getExercisesByClassId(cid);
  }, [cid]);

  const handleDelete = (tid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffae00",
      cancelButtonColor: "#90c446",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await apiDeleteTopic(tid);
          console.log(response);
          Swal.fire("Deleted!", "The topic has been deleted.", "success");
          getTopic();
        } catch (error) {
          Swal.fire("Fail!", "Delete fail", "error");
        }
      }
    });
  };

  const handleDeleteDocument = (did) => {
    console.log("did: ", did);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffae00",
      cancelButtonColor: "#90c446",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await apiDeleteDocumentById(did);
          console.log(response);
          Swal.fire("Deleted!", "The document has been deleted.", "success");
          getDocumentsByClassId(cid);
        } catch (error) {
          Swal.fire("Fail!", "Delete fail", "error");
        }
      }
    });
  };

  const handleDeleteExercise = (eid) => {
    console.log("eid: ", eid);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffae00",
      cancelButtonColor: "#90c446",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await apiDeleteExerciseById(eid);
          console.log(response);
          Swal.fire("Deleted!", "The exercise has been deleted.", "success");
          getExercisesByClassId(cid);
        } catch (error) {
          Swal.fire("Fail!", "Delete fail", "error");
        }
      }
    });
  };

  return (
    <>
      <div className="flex gap-1 items-end my-8">
        <img src="../../src/assets/icons/icon.svg" alt="" />
        <Link className="text-sm text-second hover:text-black">
          Các thông báo
        </Link>
      </div>
      <div className="my-4">
        <div className="mb-10">
          {user?._id === classes?.owner && (
            <>
              <Stack className="flex justify-end items-end text-sm mb-4">
                {editMode ? (
                  <>
                    <div
                      className="flex items-center"
                      onClick={() => handleOpenAddTopic(cid)}
                    >
                      <button className="text-white hover:bg-[#5b9608] cursor-pointer bg-button p-1">
                        Thêm chủ đề
                      </button>
                    </div>
                  </>
                ) : null}
              </Stack>
            </>
          )}

          {topics?.map((topic, index) => (
            <Fragment key={index}>
              <Stack className="flex justify-end items-end text-second text-sm cursor-pointer hover:text-hover">
                {editMode ? (
                  <>
                    <div
                      className="flex items-center"
                      onClick={() => handleOpenModalAdd(cid, topic?._id)}
                    >
                      <AddIcon sx={{ fontSize: "14px" }} />
                      <button>Thêm hoạt động hoặc tài nguyên</button>
                    </div>
                  </>
                ) : null}
              </Stack>
              <div className="bg-[#f2f1f1] p-2 flex justify-between items-center my-4">
                <h4 className=" text-second font-bold text-xl">
                  {topic.topic_name}
                </h4>
                {editMode ? (
                  <>
                    <div>
                      <span
                        className="text-primary cursor-pointer hover:text-hover mx-2"
                        onClick={() => handleOpen(topic?._id)}
                      >
                        Chỉnh sửa
                      </span>
                      <span
                        className="text-primary cursor-pointer hover:text-hover"
                        onClick={() => handleDelete(topic?._id)}
                      >
                        Xóa
                      </span>
                    </div>
                  </>
                ) : null}
              </div>

              {documents?.map((doc) => {
                if (doc?.topic_id === topic?._id)
                  return (
                    <List key={doc?._id}>
                      <ListItem disablePadding>
                        <div className="flex justify-between w-full">
                          <div className="flex gap-4 w-[80%] items-center">
                            {doc?.files?.length === 1 ? (
                              <>
                                {doc?.files[0].split(".").pop() === "pdf" ? (
                                  <img
                                    src="/../src/assets/icons/pdf-icon.png"
                                    alt="PDF"
                                    width={40}
                                  />
                                ) : (
                                  <img
                                    src="/../src/assets/icons/ppt.png"
                                    alt="PPT"
                                    width={40}
                                  />
                                )}

                                <Link
                                  to={`${import.meta.env.VITE_SERVER_URL}/${
                                    doc?.files[0]
                                  }`}
                                >
                                  {doc?.title}
                                </Link>
                              </>
                            ) : (
                              <>
                                <img
                                  src="/../src/assets/icons/folder.png"
                                  alt="Folder"
                                  width={40}
                                />
                                <Link to={`/${path.FOLDER}/${doc?._id}`}>
                                  {doc?.title}
                                </Link>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-end items-center w-[20%]  cursor-pointer">
                          <Checkbox />
                          {editMode ? (
                            <div className="flex gap-2">
                              <span
                                className="text-sm text-primary hover:text-hover"
                                onClick={() =>
                                  handleOpenModalEditDocument(doc?._id)
                                }
                              >
                                Chỉnh sửa
                              </span>
                              <span
                                className="text-primary text-sm hover:text-hover"
                                onClick={() => handleDeleteDocument(doc?._id)}
                              >
                                Xóa
                              </span>
                            </div>
                          ) : null}
                        </div>
                      </ListItem>
                    </List>
                  );
              })}

              {exercises.map((ex) => {
                if (ex.topic_id === topic?._id) {
                  if (
                    classes?.owner === user?._id ||
                    user?.role_id?.role_name === "Student"
                  ) {
                    return (
                      <List key={ex._id}>
                        <ListItem disablePadding>
                          <div className="flex justify-between w-full">
                            <div className="flex gap-4 w-[80%] items-center">
                              <img
                                src="/../src/assets/icons/practice.png"
                                alt="Folder"
                                width={40}
                              />
                              <Link to={`/${path.PRACTICEPAGE}/${ex._id}`}>
                                {ex.title}
                              </Link>
                            </div>
                          </div>

                          <div className="flex justify-end items-center w-[20%]  cursor-pointer">
                            <Checkbox />
                            {editMode ? (
                              <div className="flex gap-2">
                                <Link
                                  to={`/${path.UPDATEPRACTICE}/${ex?._id}`}
                                  className="text-sm text-primary hover:text-hover"
                                >
                                  Chỉnh sửa
                                </Link>
                                <span
                                  className="text-primary text-sm hover:text-hover"
                                  onClick={() => handleDeleteExercise(ex._id)}
                                >
                                  Xóa
                                </span>
                              </div>
                            ) : null}
                          </div>
                        </ListItem>
                      </List>
                    );
                  }
                }
              })}
            </Fragment>
          ))}
        </div>
      </div>

      {open && (
        <ModalEditTopic
          handleClose={handleClose}
          topicId={topicId}
          open={open}
          classId={cid}
          setTopics={setTopics}
        />
      )}
      {openModalAdd && (
        <ModalAdd
          onClose={onCloseModalAdd}
          handleClose={handleCloseModalAdd}
          classId={classId}
          topicId={topicId}
          open={openModalAdd}
        />
      )}
      {openAddTopic && (
        <ModalAddTopic
          handleClose={handleCloseAddTopic}
          classId={cid}
          open={openAddTopic}
          setTopics={setTopics}
        />
      )}
      {openModalEditDocument && (
        <ModalEditDocument
          handleClose={handleCloseModalEditDocument}
          documentId={docId}
          open={openModalEditDocument}
        />
      )}
    </>
  );
};

export default ListDocument;
