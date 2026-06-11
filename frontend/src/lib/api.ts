import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

let tokenPromise: Promise<string | null> | null = null;
let token: string | null = null;

// Auto-authenticate for the PoC
export const authenticate = async () => {
  if (token) return token;
  if (tokenPromise) return tokenPromise;

  tokenPromise = (async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: 'admin@ai-recruiter.com',
        password: 'password123'
      });
      token = res.data.token;
      return token;
    } catch (error) {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
          name: 'Admin Recruiter',
          email: 'admin@ai-recruiter.com',
          password: 'password123',
          company: 'Tech Corp'
        });
        token = res.data.token;
        return token;
      } catch (regError) {
        console.error('Failed to auto-authenticate', regError);
        return null;
      }
    } finally {
      tokenPromise = null;
    }
  })();

  return tokenPromise;
};

api.interceptors.request.use(async (config) => {
  const currentToken = await authenticate();
  if (currentToken) {
    config.headers.Authorization = `Bearer ${currentToken}`;
  }
  return config;
});

export default api;
