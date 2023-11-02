import axios from "axios";
export const loadCategories = async (authRequest) => {
  let url = `${process.env.hostUrl || "http://localhost:8080"}/category`;
  return await axios.get(url);
};
