import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiGetDocumentById, apiGetFilesByDocumentId } from "../api/upload";
import RightNavigate from "../components/RightNavigate";
import { useEffect } from "react";
import { List, ListItem, Typography } from "@mui/material";
import { path } from "../utils/path";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ModalEditDocument from "../components/ModalEditDocument";

const DocumentPage = () => {
  const { did } = useParams();
  const [document, setDocument] = useState([]);
  console.log("document: ", document);

  const getDocumentsById = async (did) => {
    try {
      const response = await apiGetDocumentById(did);
      setDocument(response?.data?.document);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    getDocumentsById(did);
  }, [did]);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFolderClick = () => {
    setIsExpanded(!isExpanded); // Toggle folder expansion state
  };

  const [docId, setDocId] = useState("");
  const [openModalEditDocument, setOpenModalEditDocument] = useState(false);

  const handleOpenModalEditDocument = (docId) => {
    setOpenModalEditDocument(true);
    setDocId(docId);
  };

  const handleCloseModalEditDocument = () => {
    setOpenModalEditDocument(false);
    getDocumentsById(did);
  };

  return (
    <>
      <div className="bg-white py-8">
        <div className="flex gap-8 px-5">
          <div className="w-[80%] pt-8">
            <Typography
              variant="h5"
              component="h4"
              className="w-[70%]"
              sx={{ fontWeight: "bold" }}
            >
              {document?.title}
            </Typography>
            <List>
              <div className="flex justify-between w-full">
                <div className="flex gap-4 w-[80%] items-center">
                  <div
                    className="flex items-center"
                    onClick={handleFolderClick}
                  >
                    {isExpanded ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                    <img
                      src="/../src/assets/icons/folder.png"
                      alt="Folder"
                      width={30}
                    />
                  </div>
                </div>
              </div>
              {isExpanded && (
                <List>
                  {document?.files?.map((item, index) => (
                    <ListItem key={index}>
                      <>
                        {item.split(".").pop() === "pdf" ? (
                          <img
                            src="/../src/assets/icons/pdf-icon.png"
                            alt="Folder"
                            width={40}
                          />
                        ) : (
                          <img
                            src="/../src/assets/icons/ppt.png"
                            alt="Folder"
                            width={40}
                          />
                        )}
                      </>
                      <Link to={`${import.meta.env.VITE_SERVER_URL}/${item}`}>
                        <span>{item}</span>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              )}
            </List>
            <div className="my-8">
              <button
                onClick={() => handleOpenModalEditDocument(document?._id)}
                className="text-white bg-primary hover:bg-hover transition-all ease-in-out duration-150 p-2"
              >
                Chỉnh sửa thư mục
              </button>
            </div>
          </div>
          <div className="w-[20%]">
            <RightNavigate></RightNavigate>
          </div>
        </div>
      </div>
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

export default DocumentPage;
