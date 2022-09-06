import axios from "axios";
// const GITHUB_CLIENT_ID = "22bfe85b0f9406dc9fb2";
// const gitHubRedirectURL = "http://localhost:3000";
// const path = "/";

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  console.log("check token ", token);
  const res = await axios.post(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const postGGDataAPI = async (url, post, token) => {
  const res = await axios.post(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postGoogleDataAPI = async (url, post, token) => {
  const res = await axios.post(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};
// export const postGitHubDataAPI = async (req, res) => {
//   return res;
// };
// // export const getGitHubDataAPI = async (req, res) => {
// //   const data = await fetch(
// //     `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`
// //   );
// //   return data;
// // };
