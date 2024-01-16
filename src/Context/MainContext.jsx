/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import axios from "axios";

import { apiUrl, headerOptions } from "../utils/Constants/constants";

export const ContextMain = createContext();

export const MainContext = ({ children }) => {
  const [initialState, setInitialState] = useState({
    users: [],
    leads: [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        company_name: "ABC Corp",
        mobile_no: "9876543210",
        phone: "1234567890",
        address: "123 Main Street, Cityville",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        company_name: "XYZ Ltd",
        mobile_no: "9876543211",
        phone: "1234567891",
        address: "456 Oak Avenue, Townsville",
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        company_name: "PQR Inc",
        mobile_no: "9876543212",
        phone: "1234567892",
        address: "789 Pine Street, Villagetown",
      },
      {
        id: 4,
        name: "Alice Brown",
        email: "alice.brown@example.com",
        company_name: "LMN Co",
        mobile_no: "9876543213",
        phone: "1234567893",
        address: "101 Cedar Road, Boroughville",
      },
      {
        id: 5,
        name: "Chris Wilson",
        email: "chris.wilson@example.com",
        company_name: "UVW Ltd",
        mobile_no: "9876543214",
        phone: "1234567894",
        address: "222 Maple Lane, Hamlet",
      },
      {
        id: 6,
        name: "Eva Davis",
        email: "eva.davis@example.com",
        company_name: "RST Inc",
        mobile_no: "9876543215",
        phone: "1234567895",
        address: "333 Birch Street, Township",
      },
      {
        id: 7,
        name: "Samuel Miller",
        email: "samuel.miller@example.com",
        company_name: "FGH Corp",
        mobile_no: "9876543216",
        phone: "1234567896",
        address: "444 Pine Avenue, Village",
      },
      {
        id: 8,
        name: "Sophie Anderson",
        email: "sophie.anderson@example.com",
        company_name: "JKL Ltd",
        mobile_no: "9876543217",
        phone: "1234567897",
        address: "555 Oak Road, City",
      },
    ],
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
