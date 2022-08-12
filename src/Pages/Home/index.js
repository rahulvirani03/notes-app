import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors, styles } from "../../Utils/theme";
import { Bookmark, PlusCircle, Search } from "react-feather";
import { Link } from "react-router-dom";
import { getAllLDocs } from "../../Utils/dbUtlility";
import Pagination from "./Pagination";
import Loader from "../../Components/Loader";
const HomeContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  display: grid;
  grid-template-rows: fit-content 90%;
  gap: 10px;
  padding: 2em 0;
  @media screen and (max-width: 600px) {
    gap: 2px;
  }
`;
const NoNoteTag = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: larger;
  justify-content: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  justify-content: flex-end;
  align-self: flex-end;
  text-align: end;
  margin-bottom: 0px;
  margin-top: auto;
`;
const SearcContainer = styled.div`
  height: 2.5em;
  padding: 0.5em;
  background: ${colors.white};
  border: 1px solid ${colors.grey};
  border-radius: ${styles.borderRadius};
  display: grid;
  grid-template-columns: 40px 1fr;
  place-items: center;
  input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0.2em 0.5em;
    font-weight: 400;
    font-size: medium;
    :focus {
      outline: none;
    }
    svg {
      cursor: pointer;
    }
  }
`;
const NoteContainerWrapper = styled.div`
  display: flex;
  background: ${colors.white};
  flex-direction: column;
  width: 100%;
  min-height: fit-content;
  border: 1px solid black;
  border: 1px solid ${colors.grey};
  border-radius: ${styles.borderRadius};
  gap: 10px;
  padding-top: 1em;
  margin-top: 1em;
  @media screen and (max-width: 600px) {
    margin-top: 5px;
    margin-top: 0.2em;
  }
`;
const NoteContianer = styled.div`
  padding-bottom: 2em;
  gap: 20px;
  margin-top: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    margin-top: 0.5em;
  }
`;

const Note = styled.div`
  height: fit-content;
  position: relative;
  margin: 0 1em;
  padding: 0.5em 1em;
  box-shadow: ${styles.boxShadow};
  border-radius: ${styles.borderRadius};
  border: 1px solid grey;
  .title {
    width: 90%;
    font-size: medium;
    color: ${colors.primary};
    font-weight: 500;
  }
  .tagline {
    font-style: italic;
    color: gray;
  }
  .pinned {
    position: absolute;
    top: 0px;
    right: 0px;
    margin: 0.5em;
  }
`;
const AddNote = styled.div`
  height: fit-content;
  margin: 0 1em;
  padding: 1em;
  border-radius: ${styles.borderRadius};
  border: 1px dashed ${colors.grey};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    padding: 0px;
    margin: 0px;
  }
`;

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const postsPerPage = 6;
  const lastNoteIndex = currentPage * postsPerPage;
  const firstNoteIndex = lastNoteIndex - postsPerPage;
  const currentPageNotes = notes.slice(firstNoteIndex, lastNoteIndex);
  const changeCurrentPage = (number) => {
    console.log(number);
    setCurrentPage(number);
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getAllLDocs();
      const sortedData = data.sort((a, b) => b.time - a.time);
      const sortedAndPinned = sortedData.sort(
        (a, b) => b.isPinned - a.isPinned
      );
      setNotes(sortedAndPinned);

      setLoading(false);
    };
    getData();
  }, [setNotes]);

  return (
    <HomeContainer>
      <SearcContainer>
        <Search />
        <input
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          type="text"
          placeholder="Search for title description or tagline..."
        />
      </SearcContainer>
      <NoteContainerWrapper>
        {/* <Title>Notes</Title> */}
        <Link
          style={{ textDecoration: "none", color: `${colors.primary}` }}
          to={"/add-note"}
        >
          <AddNote color={colors.primary}>
            <PlusCircle />
            <p>Add Note</p>
          </AddNote>
        </Link>
        {loading ? (
          <Loader />
        ) : (
          <>
            {currentPageNotes.length <= 0 ? (
              <NoNoteTag>No notes.</NoNoteTag>
            ) : (
              <NoteContianer>
                {currentPageNotes
                  .filter(
                    (note) =>
                      note.title
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                      note.description
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                      note.tagline
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                  )
                  .map((note) => {
                    return (
                      <Link
                        key={note.id}
                        style={{ textDecoration: "none" }}
                        to={`/note/${note.id}`}
                        state={note}
                      >
                        <Note>
                          {note.isPinned && (
                            <Bookmark
                              className="pinned"
                              fill={colors.primary}
                              stroke={colors.primary}
                            />
                          )}

                          <p className="title">{note.title}</p>
                          <p className="tagline">{note.tagline}</p>
                        </Note>
                      </Link>
                    );
                  })}
              </NoteContianer>
            )}
          </>
        )}

        <PaginationContainer>
          {currentPageNotes.length >= 1 && (
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={notes.length}
              changeCurrentPage={changeCurrentPage}
              currentPage={currentPage}
            />
          )}
        </PaginationContainer>
      </NoteContainerWrapper>
    </HomeContainer>
  );
};

export default Home;
