import React, { useEffect, useReducer, useState } from "react";
import { FilePlus } from "react-feather";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addDocument } from "../../Utils/dbUtlility";
import { colors, styles } from "../../Utils/theme";
import ErrorToast from "../../Components/ErrorToast";
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  height: 90%;
  width: 50%;
  margin: auto;
  padding: 1em;
  display: flex;
  gap: 1em;
  flex-direction: column;
  border-radius: ${styles.borderRadius};
  box-shadow: ${styles.boxShadow};
  background-color: ${colors.white};
  border: 1px solid ${colors.grey};
  @media screen and (max-width: 600px) {
    width: 80%;
  }
`;

const TitleInput = styled.input`
  width: 90%;
  padding: 0.5em;
  font-size: larger;
  font-weight: 900;
  color: ${colors.primary};
  border: none;
  :focus {
    outline: none;
  }
`;
const TaglineInput = styled.input`
  width: 90%;
  padding: 0.5em 1em;
  font-size: medium;
  font-style: italic;
  border: none;
  :focus {
    outline: none;
  }
`;
const DescriptionInput = styled.textarea`
  max-width: 90%;
  height: 60vh;
  font-family: inherit;
  text-align: justify;
  text-justify: inter-ideograph;
  padding: 0.5em 1em;
  font-size: medium;
  text-align: start;
  border: none;
  :focus {
    outline: none;
  }
`;
const SaveButton = styled.button`
  height: 3em;
  width: 100%;
  font-size: medium;
  display: flex;
  cursor: pointer;
  gap: 5px;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: ${styles.borderRadius};
  background-color: ${colors.primary};
  align-self: baseline;
  border: none;
`;

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
        <SaveButton onClick={handleSave}>
          <FilePlus size={15} />
          Save
        </SaveButton>
      </Container>
    </Wrapper>
  );
};

export default AddNote;
