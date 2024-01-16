/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import axios from "axios";

import { apiUrl, headerOptions } from "../utils/Constants/constants";

export const ContextMain = createContext();

export const MainContext = ({ children }) => {
  const [initialState, setInitialState] = useState({
    users: [],
    leads: [],
    customers: [],
    isLoading: false,
  });

  // -----------common structure for GET method api calling-----------------
  const getData = async (url, successCallback) => {
    try {
      setInitialState((prev) => ({ ...prev, isLoading: true }));
      const result = await axios.get(url, {
        headers: headerOptions(),
      });

      if (result.status === 200) {
        successCallback(result);
      }
    } catch (e) {
      console.log("=> ", e);
    } finally {
      setInitialState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // --------------------- FOR ALL USERS ---------------------------------------------------
  // getting all users API
  const getAllUsers = () => {
    const url = `${apiUrl}/users`;
    getData(url, (result) => {
      setInitialState((prev) => ({
        ...prev,
        users: result?.data?.users_data ?? [],
      }));
    });
  };

  // --------------------- FOR ALL CUSTOMERS ---------------------------------------------------
  // getting all users API
  const getAllCustomers = () => {
    const url = `${apiUrl}/customers`;
    getData(url, (result) => {
      console.log("all customers: ", result);
      setInitialState((prev) => ({
        ...prev,
        customers: result?.data?.users_data ?? [],
      }));
    });
  };

  return (
    <ContextMain.Provider
      value={{ initialState, setInitialState, getAllUsers, getAllCustomers }}
    >
      {children}
    </ContextMain.Provider>
  );
};