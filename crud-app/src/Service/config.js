import axios from "axios";

// Allow overriding API base via environment variable for different backends
const apiBaseUrl = process.env.REACT_APP_API_BASE || "http://localhost:8080";

// TASKS API
export const getTasks = async (id) => {
  const suffix = id ? `/${id}` : "";
  try {
    return await axios.get(`${apiBaseUrl}/tasks${suffix}`);
  } catch (error) {
    console.log("Error while calling getTasks api ", error);
  }
};

export const addTask = async (task) => {
  return await axios.post(`${apiBaseUrl}/task`, task);
};

export const deleteTask = async (id) => {
  return await axios.delete(`${apiBaseUrl}/task/${id}`);
};

export const editTask = async (id, task) => {
  // Backend contract uses PUT /task with full task payload
  return await axios.put(`${apiBaseUrl}/task`, task);
};
