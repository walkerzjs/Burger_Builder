import React from "react";
import styles from "./App.module.css";
import styled from "styled-components";
import Layout from "./containers/Layout";
import BurgurBuilder from "./containers/BurgurBuilder";

const Container = styled.div`
  /* color: blue;
  font-size: 1rem; */
`;
function App() {
  return (
    <Container>
      <Layout>
        <BurgurBuilder />
      </Layout>
    </Container>
  );
}

export default App;
