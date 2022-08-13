import React, { useCallback, useEffect, useReducer, useState } from "react";
import { ArrowLeft, Bookmark, Trash2 } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deletNote, updateNote } from "../../Utils/dbUtlility";
import { colors } from "../../Utils/theme";
import _ from "lodash";
import ErrorToast from "../../Components/ErrorToast";
import {
  Container,
  DescriptionInput,
  TaglineInput,
  TitleInput,
  Wrapper,
} from "../../Components/NoteShared";

const IconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
