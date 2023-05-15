import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text_left">
        <span className="blue_gradient">{name} profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      {/* <PromptCard /> */}
      <div className="mt-10 prompt_layout">
        {data.length ? data.map((post) => {
          return (
            <PromptCard
              post={post}
              key={post._id}
              handleEdit={()=>handleEdit && handleEdit(post)}
              handleDelete={()=>handleDelete && handleDelete(post)}
            />
          );
        }): <p>Empty Prompts!</p>}
      </div>
    </section>
  );
};

export default Profile;
