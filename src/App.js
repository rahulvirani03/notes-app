import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import AddNote from "./Pages/AddNote";
import Home from "./Pages/Home";
import Note from "./Pages/Note";
import { colors } from "./Utils/theme";

const AppContainer = styled.div`
  height: 100%;
  width: 100vw;
  padding: 1em 0;
  background-color: ${colors.greyLight};
`;
function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/note/:id" element={<Note />} />
        <Route path="/add-note" element={<AddNote />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
