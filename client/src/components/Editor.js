import React, { useState, useEffect, useRef, useContext } from "react";
import edit from "../utils/editor";
import { ImageList, recomposeColor } from "@material-ui/core";
import { PayloadContext } from "./PayloadContext";

const Editor = (props) => {
  const { values, setValues } = useContext(PayloadContext);
  const { img, selectedPos } = props;
  const canvas = useRef(null);

  useEffect(() => {
    if (img && canvas) {
      edit(canvas.current, img, values, selectedPos, true);
    }
  }, [img, canvas, values]);

  const handleClick = (event) => {
    // console.log(points);
    var rect = event.target.getBoundingClientRect();
    let aspectR = img.naturalWidth / img.naturalHeight;
    let x = Math.round((event.clientX - rect.left) * aspectR);
    let y = Math.round((event.clientY - rect.top) * aspectR);
    let coordinates;
    switch (selectedPos) {
      case "handleBar":
        coordinates = { lenkerx: x, lenkery: y };
        break;
      case "driverSeat":
        coordinates = { sitzx: x, sitzy: y };
        break;
      case "driverFootPeg":
        coordinates = { fussx: x, fussy: y };
        break;
      case "pillionSeat":
        coordinates = { soziussitzx: x, soziussitzy: y };
        break;
      case "pillionFootPeg":
        coordinates = { soziusfussx: x, soziusfussy: y };
        break;
    }
    setValues({
      ...values,
      ...coordinates,
    });
  };

  return (
    <canvas
      ref={canvas}
      // width={1050}
      // height={1050}
      style={{ width: "100%" }}
      // style={{
      //   display: "inline-block",
      //   outline: "2px solid red",
      // }}
      onClick={handleClick}
    />
  );
};

export default Editor;
