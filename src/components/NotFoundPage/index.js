import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import "../../index.css";

const NotFoundPage = () => {
  const history = useHistory();

  return (
    <>
      <div className="not-found">
        <i className="fas fa-frown"></i>
        <h1 className="four-zero-four">404</h1>
        <h2 className="page-not-found">Page not found</h2>
        <Button
          size="lg"
          variant="outline-dark"
          onClick={() => {
            history.push("/");
          }}
        >
          Go back to main page <i className="fas fa-home"></i>
        </Button>
      </div>
    </>
  );
};

export default NotFoundPage;
