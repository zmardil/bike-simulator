import React, { useState, useEffect, useRef } from "react";
import draw from "../utils/draw";

const Canvas = (props) => {
  const { settings, data } = props;
  const [img, setImg] = useState(null);
  const canvas = useRef(null);

  useEffect(() => {
    if (!data) return;
    const img = new Image();
    img.src = `/uploads/${data.filename}`;
    img.onload = () => setImg(img);
  }, [img]);

  useEffect(() => {
    // bike placement data
    if (img && canvas) {
      draw(canvas.current, img, settings, data);
    }
  }, [img, canvas, settings, data]);

  return (
    <canvas
      ref={canvas}
      width={1050}
      height={1050}
      style={{ display: "block", width: "100%" }}
    />
  );
};

export default Canvas;
