import React, { useContext } from "react";
import { Image } from "react-bootstrap";

import classes from "./index.module.css";

import rick from "../../images/rick.png";
import { Context } from "../../App";

const Home = () => {
  const context = useContext(Context);
  const userName = context.userName;
  
  return (
    <div className={classes.home}>
      {userName.length > 0 ? (
        <h1 className={classes["home-heading"]}>
          Welcome, {userName}!
        </h1>
      ) : (
        <h1 className={classes["home-heading"]}>Welcome, Home!</h1>
      )}
      <div className={classes["home-image"]}>
        <Image className={classes.image} src={rick} />
      </div>
    </div>
  );
};

export default Home;
