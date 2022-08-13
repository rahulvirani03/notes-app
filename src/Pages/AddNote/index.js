import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDocument } from "../../Utils/dbUtlility";
import ErrorToast from "../../Components/ErrorToast";
import {
  Container,
  DescriptionInput,
  SaveButton,
  TaglineInput,
  TitleInput,
  Wrapper,
} from "../../Components/NoteShared";

const AddNote = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    active: false,
    type: "",
  });
  const [toastMessage, setToastMessage] = useState("");
  const reducer = (state, action) => {
    //     return { ...state, [action.type]: action.value };
    //   };
    switch (action.type) {
      case "title":
        return { ...state, title: action.value };
      case "tagline":
        return { ...state, tagline: action.value };
      case "description":
        return { ...state, description: action.value };

      default:
        return state;
    }
  };

  useEffect(() => {
    let interval;
    if (toast.active) {
      interval = setInterval(() => {
        setToast({
          ...toast,
          active: false,
        });
      }, 5000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [toast]);
  const handleSave = async () => {
    if (
      state.title === "" ||
      state.tagline === "" ||
      state.description === ""
    ) {
      setToastMessage("Please fill all Fielfs");
      setToast({
        type: "Error",
        active: true,
      });
      return;
    }

    const res = await addDocument(state);
    if (res.success) {
      setToast({
        type: "Success",
        active: true,
      });
    }
    setToastMessage("Note saved");

    navigate("/");
  };

  const [state, dispatch] = useReducer(reducer, {
    title: "",
    tagline: "",
    description: "",
    isPinned: false,
  });

  return (
    <Wrapper>
      {toast.active && <ErrorToast toastMessage={toastMessage} toast={toast} />}
      <Container>
        {/* <Title>Add New Note</Title> */}
        <TitleInput
          onChange={(e) => dispatch({ type: "title", value: e.target.value })}
          placeholder="Title"
          type="text"
        />
        <TaglineInput
          onChange={(e) => dispatch({ type: "tagline", value: e.target.value })}
          placeholder="Add a tag line"
          type="text"
        />
        <DescriptionInput
          onChange={(e) =>
            dispatch({ type: "description", value: e.target.value })
          }
          placeholder="Describe the note"
        />
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </Container>
    </Wrapper>
  );
};

export default AddNote;
