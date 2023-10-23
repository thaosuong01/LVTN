import AddIcon from "@mui/icons-material/Add";
import { Checkbox, List, ListItem, Stack } from "@mui/material";
import { Fragment, useState } from "react";

import { default as React } from "react";

import { useParams } from "react-router-dom";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiDeleteTopic, apiGetTopicByClass } from "../api/topic";
import ModalEditTopic from "./ModalEditTopic";
import ModalAdd from "./ModalAdd";
import ModalAddTopic from "./ModalAddTopic";
import { apiGetClassById } from "../api/class";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

const ListDocument = () => {
  const { isEditMode: editMode } = useSelector((state) => state.course);

  const [open, setOpen] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openAddTopic, setOpenAddTopic] = useState(false);

  const [topics, setTopics] = useState();

  const [topicId, setTopicId] = useState("");
  const [classId, setClassId] = useState("");

  const handleOpen = (topicId) => {
    setOpen(true);
    setTopicId(topicId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
  };

  const handleOpenModalAdd = (classId, topicId) => {
    setOpenModalAdd(true);
    setTopicId(topicId);
    setClassId(classId);
  };

  const handleCloseAddTopic = () => {
    setOpenAddTopic(false);
  };

  const handleOpenAddTopic = (cid) => {
    setOpenAddTopic(true);
  };

  const { user } = useSelector((state) => state.user);

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

  const { types } = useSelector((state) => state.topic);
  console.log(types);

  const handleDelete = (tid) => {
    console.log(tid);
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

              {topic?.documents?.map((doc, docIndex) => (
                <List key={docIndex}>
                  <ListItem disablePadding>
                    <div className="flex justify-between w-full">
                      <div className="flex gap-4 w-[80%]">
                        {doc.type === "folder" && (
                          <img src="/../src/assets/icons/document.svg" alt="" />
                        )}
                        {doc.type === "pdf" && (
                          <img src="/../src/assets/icons/pdf.png" alt="" />
                        )}
                        <span>{doc.document}</span>
                      </div>
                    </div>

                    <div className="flex justify-end items-center w-[20%] text-sm text-primary hover:text-hover cursor-pointer">
                      <Checkbox />
                      {editMode ? (
                        <>
                          <span>Chỉnh sửa</span>
                        </>
                      ) : null}
                    </div>
                  </ListItem>
                </List>
              ))}
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
    </>
  );
};

export default ListDocument;
