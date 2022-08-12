import React, { useCallback, useEffect, useReducer, useState } from "react";
import { ArrowLeft, Bookmark, Trash2 } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deletNote, updateNote } from "../../Utils/dbUtlility";
import { colors, styles } from "../../Utils/theme";
import _ from "lodash";
import ErrorToast from "../../Components/ErrorToast";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;

const IconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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

const Note = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [toast, setToast] = useState({
    active: false,
    type: "",
  });
  const [toastMessage, setToastMessage] = useState("");

  const reducer = (state, action) => {
    switch (action.type) {
      case "title":
        return { ...state, title: action.value };
      case "tagline":
        return { ...state, tagline: action.value };
      case "description":
        return { ...state, description: action.value };
      case "pinned":
        return { ...state, isPinned: !state.isPinned };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    title: data.title,
    tagline: data.tagline,
    description: data.description,
    id: data.id,
    isPinned: data?.isPinned,
  });

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

  const goBack = async () => {
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
    const check = _.isEqual(state, data);
    if (check) {
      navigate("/");
      return;
    }
    const res = await handleUpdate();
    console.log(res);
    if (res.success) {
      navigate("/");
    }
  };

  const handleUpdate = useCallback(async () => {
    const res = await updateNote(state);
    return res;
  }, [state]);

  const handleDelete = async () => {
    const res = await deletNote(state.id);
    console.log(state);
    if (res.success) {
      navigate("/");
    }
  };

  useEffect(() => () => handleUpdate(), [handleUpdate]);

  return (
    <Wrapper>
      {toast.active && <ErrorToast toastMessage={toastMessage} toast={toast} />}
      <Container>
        <IconContainer>
          <ArrowLeft
            onClick={() => {
              goBack();
            }}
          />
          <div style={{ display: "flex", gap: "5px" }}>
            <Bookmark
              onClick={() => {
                dispatch({ type: "pinned" });
              }}
              fill={state.isPinned ? colors.primary : "none"}
              stroke={colors.primary}
            />
            <Trash2 onClick={handleDelete} stroke={colors.error} />
          </div>
        </IconContainer>

        <TitleInput
          onChange={(e) => dispatch({ type: "title", value: e.target.value })}
          placeholder="Title"
          value={state.title}
          type="text"
        />
        <TaglineInput
          onChange={(e) => dispatch({ type: "tagline", value: e.target.value })}
          placeholder="Add a tag line"
          type="text"
          value={state.tagline}
        />
        <DescriptionInput
          onChange={(e) =>
            dispatch({ type: "description", value: e.target.value })
          }
          value={state.description}
          placeholder="Describe the note"
        />
      </Container>
    </Wrapper>
  );
};

export default Note;
