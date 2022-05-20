import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import loadingGif from "./loading.gif";
import "./style/App.scss";
import PhotoCard from "./PhotoCard";

function App() {
  const [photos, setPhotos] = useState([]);
  const [term, setTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [termErr, setTermErr] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   fetchPhotos(term, pageNumber);
  // }, [term, pageNumber]);

  // attach to the element at the end of the page (loading_gif, button)
  const pageEnd = useRef();
  //count page loading content

  useEffect(() => {
    fetchPhotos(term, pageNumber);
  }, [pageNumber]);

  const fetchPhotos = async (term, pageNumber) => {
    const response = await axios.get(
      "https://api.unsplash.com/search/photos/",
      {
        params: {
          query: term,
          page: pageNumber,
          per_page: 10,
        },
        headers: {
          Authorization:
            "Client-ID jMBsfIqFj88cgfsDPV4fRDfpZRwjP3zVN7nKohqWV6c",
        },
      }
    );
    // console.log(response.data.results);
    setPhotos((oldPhotos) => [...oldPhotos, ...response.data.results]);
    // console.log(response.data);
    // setPhotos(response.data);
    setLoading(!loading);
    // console.log(response.data);
  };

  const loadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    // console.log(pageNumber);
  };

  let num = 1;

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // console.log("this is the end");
            num++;
            // having trouble with loadMore()*
            // setPageNumber((prevPageNumber) => prevPageNumber + 1);
            // fetchPhotos(term, pageNumber);
            loadMore();
            if (num >= 5) {
              observer.unobserve(pageEnd.current);
            }
          }
        },
        { threshold: 1 }
      );
      observer.observe(pageEnd.current);
    }
  }, [loading, num, pageNumber]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  // Validation
  const validate = () => {
    let isValid = true;
    if (term === "") {
      setTermErr("**This field is required");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPhotos([]);
    const isValid = validate();
    if (isValid) {
      fetchPhotos(term, pageNumber);
      // console.log(photos);
      setTermErr("");
    }
    return;
  };

  return (
    <>
      <div className="header">
        <h1 className="title">Search for images you want to browse.</h1>
        <h3>Happy Scrolling!</h3>
        <input
          type="text"
          value={term}
          onChange={handleChange}
          placeholder="Search here..."
        />
        <div className="empty-field-err">{termErr}</div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="result-section">
        <div className="photo-container">
          {photos.map((photo, index) => {
            return <PhotoCard key={index} image={photo} />;
          })}
        </div>
        <div className={photos.length === 0 ? "hide" : "load-button"}>
          <div className="loading">
            <img src={loadingGif} alt="loading animation" ref={pageEnd} />
          </div>
          <button className="load-more" onClick={loadMore}>
            Load More
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
