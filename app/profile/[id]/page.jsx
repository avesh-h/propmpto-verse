"use client";

import React, { useEffect, useState } from "react";
import Profile from "../../../components/Profile";
import { useSearchParams } from "next/navigation";

const UserProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (params?.id) fetchPosts();
  }, [params?.id]);
  return (
    <div>
      <Profile
        name={userName}
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        data={posts}
      />
    </div>
  );
};

export default UserProfile;
