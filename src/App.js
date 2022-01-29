import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./App.css";

const ReactForm = () => {
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const [error, setError] = useState("");
  const [searchData, setSearchData] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      nameInput.current.value,
      emailInput.current.value,
      passwordInput.current.value
    );
  };

  const handleSearch = (e) => {
    const parsedQuery = e.target.value.replaceAll(" ", "+");
    setSearchValue(parsedQuery);
  };

  const fetchData = () => {
    if (searchValue) {
      axios
        .get(
          `https://api.giphy.com/v1/gifs/search?api_key=AZ5oeBqBoIMobRvz8ilSBtnQS5Kgec2M&q=${searchValue}`
        )
        .then((res) => {
          if (res.data.data.length > 0) {
            setSearchData(res.data.data);
            setError("");
          } else {
            setError("No data found");
          }
        })
        .catch(() => {
          setError("No data found");
        });
    }
  };

  useEffect(() => {
    const debounce = setTimeout(fetchData, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchValue]);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <p>part 1</p>
        <label>
          Name:
          <input placeholder="name" type="text" ref={nameInput} />
        </label>
        <br />
        <label>
          Email:
          <input placeholder="email" type="email" ref={emailInput} />
        </label>
        <br />
        <label>
          Password:
          <input placeholder="password" type="password" ref={passwordInput} />
        </label>
        <hr />
        <button onClick={() => passwordInput.current.focus()}>
          Focus Name Input
        </button>
        <button onClick={() => emailInput.current.focus()}>
          Focus Email Input
        </button>
        <button onClick={() => passwordInput.current.focus()}>
          Focus Password Input
        </button>
        <hr />
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>

      <div>
        <hr />
        <p>part 2</p>
        <label>
          Search:
          <input
            placeholder="search with debounce"
            type="text"
            onChange={handleSearch}
          />
        </label>
        <br />
        {error}

        {searchData.length > 0 && (
          <div className="list">
            {searchData.map((item, i) => {
              return (
                <div key={i}>
                  {item.images.original.url && (
                    <img src={item.images.original.url} alt="" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ReactForm;
