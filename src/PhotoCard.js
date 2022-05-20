import React, { useState, useEffect, useRef } from "react";
import "./style/App.scss";

function PhotoCard(props) {
  const { urls } = props.image;
  const imageRef = useRef();
  const [spans, setSpans] = useState(0);

  useEffect(() => {
    imageRef.current.addEventListener("load", () => {
      const height = imageRef.current.clientHeight;
      const spans = Math.ceil(height / 10);
      setSpans(spans);
    });
  }, []);
  return (
    <div style={{ gridRowEnd: `span ${spans}` }} className="photo-block">
      <img ref={imageRef} src={urls.small} alt="unsplash source" />
    </div>
  );
}

export default PhotoCard;
