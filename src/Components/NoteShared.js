import styled from "styled-components";
import { colors, styles } from "../Utils/theme";

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  height: 90%;
  width: 80%;
  margin: auto;
  padding: 1em;
  display: flex;
  gap: 1em;
  flex-direction: column;
  border-radius: ${styles.borderRadius};
  box-shadow: ${styles.boxShadow};
  background-color: ${colors.white};
`;

export const TitleInput = styled.input`
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
export const TaglineInput = styled.input`
  width: 90%;
  padding: 0.5em 1em;
  font-size: medium;
  font-style: italic;
  border: none;
  :focus {
    outline: none;
  }
`;
export const DescriptionInput = styled.textarea`
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
export const SaveButton = styled.button`
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
