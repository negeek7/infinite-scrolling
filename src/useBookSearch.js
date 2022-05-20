import React from "react";
import books from "./api/photos";
import { useEffect } from "react";

// as soon as you get to the bottom of your result
// it will query the next page API and append it to the bottom
function useBookSearch(query, pageNumber) {
  // call useEffect whenever some parameter changes.
  useEffect(() => {
    books
      .get(`?q=${query}`, {
        params: {
          q: query,
        },
      })
      .then((res) => {
        console.log(res);
      });
  }, [query, pageNumber]);

  return <div>hello</div>;
}

export default useBookSearch;
