import React, { useState, useEffect } from "react";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import axios from "axios";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const url = "https://jsonplaceholder.typicode.com/posts";
  const SEARCH_URL = "https://jsonplaceholder.typicode.com/posts?title=";

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(url);
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handleOnsubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetch(SEARCH_URL + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
        });
      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="inputbar">
        <form onSubmit={handleOnsubmit}>
          <input
            type="Search"
            className="search"
            placeholder="search"
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </div>

      <div className="container">
        <Posts posts={currentPosts} loading={loading} />
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
