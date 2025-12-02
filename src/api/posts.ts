import api from "./axios";

export const createPost = async (data: FormData) => {
  return api.post("/posts", data);
};

export const getFeedPosts = async (page = 1) => {
  return api.get(`/posts/feed?page=${page}`);
};
