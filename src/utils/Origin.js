import React, { useState, useEffect, useMemo } from "react";
import { Spinner } from "react-bootstrap";

import classes from "./index.module.css";

import OriginCards from "./OriginCards";

const Origin = ({ data }) => {
  const [origin, setOrigin] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let arrayNum = useMemo(() => [], []);

  useEffect(() => {
    const getOrigin = async () => {
      const response = await fetch(data.url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const origin = await response.json();
      origin.residents.map((res, index) => {
        let theNum = res.replace(/^\D+/g, "");
        theNum = res.match(/\d+/)[0];
        arrayNum.push(theNum);
      });
      setOrigin(origin);
      setIsLoading(false);
    };
    getOrigin();
  }, [data.url, arrayNum]);

  let urlCharacters = `https://rickandmortyapi.com/api/character/${arrayNum},`;

  return (
    <div className={classes.origin}>
      {!isLoading ? (
        <>
          <h1>{origin.name}</h1>
          <p className={classes["p-all"]}>All characters from origin place.</p>
          {arrayNum.length > 0 ? (
            <OriginCards data={urlCharacters} />
          ) : (
            <h4>There are no characters here.</h4>
          )}
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
};

export default Origin;
