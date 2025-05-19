import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);

    if (response.status === 200) {

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email); 
      localStorage.setItem('username', response.data.username);
      return { token: response.data.token, username: response.data.username, emailUser: response.data.email };

    }

  } catch (error) {
    
    if(error.response && error.response.status === 401) {
      return { error: 'Credenciales incorrectas' };
    }
    return { error: 'Error al iniciar sesión. Inténtalo de nuevo.' };
    
  }
};

const createAccount = async ({ email, password, name }) => {
  const response = await axios.post(`${API_URL}/auth/register`, { email, password, name });
  return response.data;
};

export { loginUser, createAccount };