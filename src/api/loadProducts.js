import axios from "axios";
export const loadProducts = async (authRequest) => {
  let url = `${process.env.hostUrl || "http://localhost:8080"}/product`;
  return await axios.get(url);
};
