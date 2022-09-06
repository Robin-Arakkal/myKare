import { AES, enc } from "crypto-js";
import { getUser, getUsers, setUser } from "./db";
import { NotificationManager } from "react-notifications";

export const decrypt = (str) => {
  const decodedStr = decodeURIComponent(str);
  return AES.decrypt(decodedStr, "MyKare092022").toString(enc.Utf8);
};

export const encrypt = (str) => {
  const ciphertext = AES.encrypt(str, "MyKare092022");
  const dt = encodeURIComponent(ciphertext.toString());
  return dt;
};

export const notifyUser = ({ status, message, delay }) => {
  switch (status) {
    case "success":
      return NotificationManager.success(message, "", delay);
    case "error":
      return NotificationManager.error(message, "", delay);
    case "warning":
      return NotificationManager.warning(message, "", delay);
    case "info":
      return NotificationManager.info(message, "", delay);
  }
};

export const logInUser = (user) => {
  if (user.email !== undefined && user.password !== undefined) {
    const dbUser = getUser(user.email);
    if (dbUser && user.password === decrypt(dbUser.password)) {
      localStorage.setItem("activeUser", JSON.stringify(dbUser));
      notifyUser({
        status: "success",
        message: "Login successful",
        delay: 3000,
      });
      return { status: true };
    } else {
      notifyUser({
        status: "error",
        message: "Incorrect email or password",
        delay: 3000,
      });
      return { status: false };
    }
  } else {
    notifyUser({
      status: "error",
      message: "Please enter email and password",
      delay: 3000,
    });
    return { status: false };
  }
};

export const signUpUser = (user) => {
  user.role = 2;
  if (user.email !== undefined && user.password !== undefined) {
    const dbUsers = getUsers();
    if (dbUsers.find((u) => u.email === user.email)) {
      notifyUser({
        status: "error",
        message: "User already exists",
        delay: 3000,
      });
      return { status: false };
    } else {
      setUser(user);
      notifyUser({
        status: "success",
        message: "User created successfully",
        delay: 3000,
      });
      return { status: true };
    }
  } else {
    notifyUser({
      status: "error",
      message: "Please enter email and password",
      delay: 3000,
    });
    return { status: false };
  }
};

export const signUpAdminUser = () => {
  const user = {
    firstname: "Admin",
    lastname: "",
    email: "admin",
    password: "admin",
    role: 1,
  };
  const dbUsers = getUsers();
  if (!dbUsers.find((u) => u.email === user.email)) {
    setUser(user);
  }
};

export const logOutUser = () => {
  localStorage.removeItem("activeUser");
  notifyUser({
    status: "success",
    message: "User logged out successfully",
    delay: 3000,
  });
  return { status: true };
};

export const isLogedIn = () => localStorage.getItem("activeUser") !== null;
