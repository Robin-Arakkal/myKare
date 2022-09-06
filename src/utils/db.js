import { encrypt } from "./helpers";

export const getUsers = () => {
  if (JSON.parse(localStorage.getItem("users")))
    return JSON.parse(localStorage.getItem("users"));
  else return [];
};

export const getUser = (email) => {
  const users = getUsers();
  return users.filter((u) => u.email === email)[0];
};

export const setUser = (user) => {
  const users = getUsers();
  if (!users.find((element) => element.email === user.email))
    localStorage.setItem(
      "users",
      JSON.stringify([
        ...users,
        {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: encrypt(user.password),
          role: 2,
        },
      ])
    );
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("activeUser"));
};
