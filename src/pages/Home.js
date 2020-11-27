import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const Home = () => {
  return (
    <Page>
      <Link to="/single-draft">
        Go to single-draft
      </Link>
      <Link to="/multi-draft">
        Go to multi-draft
      </Link>
      <Link to="/moment-draft">
        Go to moment-draft
      </Link>
      <Link to="/read-only-draft">
        Go to read-only-draft
      </Link>
    </Page>
  );
};

export default Home;