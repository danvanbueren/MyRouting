import axios from "axios";

export const getUser = async (userId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API}/api/users/${userId}`
    );
    return (
      response.data.rank +
      " " +
      response.data.firstName +
      " " +
      response.data.lastName
    );
  } catch (error) {
    console.error("Get user failed:", error);
  }
};
