export const apiUrl = "https://crm.neelnetworks.org/api";

// token
const getToken = () => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const newBearer = bearer.replace(/['"]+/g, "");
  return newBearer;
};

// api headers
export const headerOptions = (isFormData) => ({
  "Content-Type": isFormData ? "multipart/form-data" : "application/json",
  Accept: "application/json",
  Authorization: getToken(),
});
