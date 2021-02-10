import React, { useState, useEffect, useMemo } from "react";
import { Spinner } from "react-bootstrap";

import classes from "./index.module.css";

import LocationCards from "./LocationCards";

const Location = ({ data }) => {
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let arrayNum = useMemo(() => [], []);

  useEffect(() => {
    const getLocation = async () => {
      const response = await fetch(data.url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const location = await response.json();
      location.residents.map((res, index) => {
        let theNum = res.replace(/^\D+/g, "");
        theNum = res.match(/\d+/)[0];
        arrayNum.push(theNum);
      });
      setLocation(location);
      setIsLoading(false);
    };
    getLocation();
  }, [data.url, arrayNum]);

  let urlCharacters = `https://rickandmortyapi.com/api/character/${arrayNum},`;

  return (
    <div className={classes.location}>
      {!isLoading ? (
        <>
          <h1>{location.name}</h1>
          <p className={classes["p-all"]}>
            All characters who have been last seen in the location.
          </p>
          {arrayNum.length > 0 ? (
            <LocationCards data={urlCharacters} />
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

export default Location;
