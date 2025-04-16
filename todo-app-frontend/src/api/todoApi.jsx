import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const todoApi = {
  getAllTodos: async (filter = '') => {
    const url = filter ? `${API_BASE_URL}/todos?filter=${filter}` : `${API_BASE_URL}/todos`;
    const response = await axios.get(url);
    return response.data;
  },
  
  getTodoById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/todos/${id}`);
    return response.data;
  },
  
  createTodo: async (todoData) => {
    const response = await axios.post(`${API_BASE_URL}/todos`, todoData);
    return response.data;
  },
  
  updateTodo: async (id, todoData) => {
    const response = await axios.put(`${API_BASE_URL}/todos/${id}`, todoData);
    return response.data;
  },
  
  toggleTodoCompletion: async (id) => {
    const response = await axios.patch(`${API_BASE_URL}/todos/${id}/toggle`);
    return response.data;
  },
  
  deleteTodo: async (id) => {
    await axios.delete(`${API_BASE_URL}/todos/${id}`);
    return id;
  }
};

export default todoApi;