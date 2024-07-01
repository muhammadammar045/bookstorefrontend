import React from "react";
import Container from "./Container";
import BookShop from "../components/BookShop";
import envVars from "../../envexport";

function AllBooks() {
  return (
    <>
      <Container>
        <BookShop />
      </Container>
    </>
  );
}

export default AllBooks;
