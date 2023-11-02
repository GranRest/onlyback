import axios from "axios";

/* const getToken = () => {
    return localStorage.getItem('USER_KEY');
} */

export const userLogin = async (authRequest) => {
  let url = `${
    process.env.hostUrl || "http://localhost:8080"
  }/api/v1/auth/login`;
  return await axios.post(url, authRequest);

  /* return await axios({
        method: 'POST',
        url: `${process.env.hostUrl || 'http://localhost:8080'}/api/v1/auth/login`,
        // url:`http://localhost:8080/api/v1/auth/login`,
        data: authRequest
    }) */
};

export const fetchUserData = async (token) => {
  const url = `${
    process.env.hostUrl || "http://localhost:8080"
  }/api/v1/auth/userinfo`;
  const headers = {
    Authorization: "Bearer " + token,
  };
  return await axios.get(url, headers);

  /*  return axios({
          method: 'GET',
          url: `${process.env.hostUrl || 'http://localhost:8080'}/api/v1/auth/userinfo`,
          headers: {
              'Authorization': 'Bearer ' + authRequest()
          }
      })*/
};
export const UserSave = (formData) => {
  return axios({
    method: "POST",
    url: `${process.env.hostUrl || "http://localhost:8080"}/api/v1/save/user`,
    data: formData,
  });
};
