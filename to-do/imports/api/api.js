export const register = async (name, email, password) => {
    try {
        const response = await axios.post('/api/register', { name, email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post('/api/login', { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};