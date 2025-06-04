import axios from 'axios';

export const searchProyectos = async (query, searchBy) => {
  try {
    const response = await axios.get(`http://localhost/Alta-Participantes/public/buscar-proyecto.php`, {
      params: { query, searchBy }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getProyectoDetails = async (proyectoId) => {
  try {
    const response = await axios.get(`http://localhost/Alta-Participantes/public/proyecto-detalles.php`, {
      params: { id: proyectoId }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};