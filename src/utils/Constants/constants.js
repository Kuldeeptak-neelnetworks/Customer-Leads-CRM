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

export const clientsEmailCommunication = {
  list: [
    {
      id: 1,
      time: "11:00 am",
      date: "23rd Feb, 2024",
      subject: "Query Regarding a Service",
      imgUrl:
        "https://crm.neelnetworks.org/users_profile_pictures/1706691363-Jacob.png",
      messages: [
        "Hello, how are you? Hope so you're doing good.",
        "I had a query regarding your services, kindly please call me asap.",
      ],
    },
    {
      id: 2,
      time: "08:30 am",
      date: "10th Jan, 2024",
      imgUrl:
        "https://crm.neelnetworks.org/users_profile_pictures/1706691363-Jacob.png",
      subject: "I won't be able to make it on time...",
      messages: ["Hi I'm stuck somewhere, can we connect at 4pm"],
    },
    {
      id: 3,
      time: "04:45 pm",
      date: "03rd Dec, 2023",
      imgUrl:
        "https://crm.neelnetworks.org/users_profile_pictures/1706691363-Jacob.png",
      subject: "Excited to work along with your team!",
      messages: ["Hi, I checked all your services, can we have a talk?"],
    },
  ],
};
