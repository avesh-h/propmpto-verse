"use client";

import React, { useEffect, useState, useRef } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  // console.log("data", data);
  return (
    <div className="mt-16 prompt_layout">
      {data.length ? (
        data.map((post) => {
          return (
            <PromptCard
              post={post}
              key={post._id}
              handleTagClick={() => handleTagClick(post.tag)}
            />
          );
        })
      ) : (
        <p>Empty prompts!</p>
      )}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [serchedResult, setSearchedResult] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [posts, setPosts] = useState([]);
  const searchInputTag = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  //Only get those post based on search filter
  const filteredPrompts = (searchTxt) => {
    const regex = new RegExp(searchTxt, "i");

    return posts.filter(
      (p) =>
        regex.test(p.creator.username) ||
        regex.test(p.tag) ||
        regex.test(p.prompt)
    );
  };
  const handleSearchChange = (e) => {
    //Debounce method
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filteredPrompts(e.target.value);
        setSearchedResult(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (searchTag) => {
    if (searchTag) {
      searchInputTag.current.focus();
      setSearchText(searchTag);
      const searchResult = filteredPrompts(searchTag);
      setSearchedResult(searchResult);
    }
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
          ref={searchInputTag}
        />
      </form>
      {searchText ? (
        <PromptCardList data={serchedResult} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
