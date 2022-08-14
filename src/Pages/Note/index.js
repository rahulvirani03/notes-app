import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
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
  const [isEqual, setIsEqual] = useState(true);
  const equalRef = useRef(false);
  const stateRef = useRef(null);

  const reducer = (state, action) => {
    let localState;
    switch (action.type) {
      case "title":
        localState = { ...state, title: action.value };
        stateRef.current = localState;
        return localState;
      case "tagline":
        localState = { ...state, tagline: action.value };
        stateRef.current = localState;
        return localState;
      case "description":
        localState = { ...state, description: action.value };
        stateRef.current = localState;
        return localState;
      case "pinned":
        localState = { ...state, isPinned: !state.isPinned };
        stateRef.current = localState;
        return localState;
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
    time: data.time,
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

  useEffect(() => {
    setIsEqual(_.isEqual(state, data));
  }, [state, data]);

  useEffect(() => {
    if (!isEqual) {
      equalRef.current = true;
    }
  }, [isEqual]);

  const goBack = async () => {
    if (isEqual) {
      return navigate("/");
    }
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

    const res = await handleUpdate();
    if (res.success) {
      navigate("/");
    }
  };

  const handleUpdate = useCallback(
    async (refVal) => {
      let payload = state;
      if (refVal !== undefined) payload = refVal;
      const res = await updateNote(payload);
      return res;
    },
    [state]
  );

  const handleDelete = async () => {
    const res = await deletNote(state.id);
    if (res.success) {
      navigate("/");
    }
  };

  useEffect(() => {
    return () => {
      if (equalRef.current) {
        handleUpdate(stateRef.current);
      }
    };
  }, [handleUpdate]);

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
