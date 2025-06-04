import axios from 'axios';

export const searchOficios = async (query) => {
  try {
    const response = await axios.get(`http://localhost/Alta-Participantes/public/buscar-oficio.php`, {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};