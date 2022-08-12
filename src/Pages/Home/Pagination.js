import React from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

import styled from "styled-components";
import { colors, styles } from "../../Utils/theme";

const PagitationTile = styled.div`
  display: flex;
  width: 50%;
  user-select: none;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5em;
  margin-right: 1em;
  svg {
    cursor: pointer;
  }
`;
const Page = styled.p`
  cursor: pointer;
  padding: 0.6em 0.4em;
  display: flex;
  text-align: center;
  justify-content: center;
  width: 2em;
  color: ${(props) => (props.active ? `${colors.white}` : "black")};
  background-color: ${(props) =>
    props.active ? `${colors.primary}` : "white"};
  border-radius: ${(props) =>
    props.active ? `${styles.borderRadius}` : "none"};
`;

const Pagination = ({
  postsPerPage,
  totalPosts,
  changeCurrentPage,
  currentPage,
}) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <PagitationTile>
      <ChevronLeft
        onClick={() => {
          if (currentPage >= 2) {
            changeCurrentPage(currentPage - 1);
          }
        }}
      />
      {pageNumber.map((number) => {
        return (
          <div key={number}>
            {number === currentPage ? (
              <Page active key={number}>
                {number}
              </Page>
            ) : (
              <Page onClick={() => changeCurrentPage(number)} key={number}>
                {number}
              </Page>
            )}
          </div>
        );
      })}
      <ChevronRight
        onClick={() => {
          if (currentPage !== pageNumber.length) {
            changeCurrentPage(currentPage + 1);
          }
        }}
      />
    </PagitationTile>
  );
};

export default Pagination;
