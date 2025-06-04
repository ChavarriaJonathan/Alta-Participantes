import axios from 'axios';

// Buscar personas con CVU por medio de un llamada a la Api
export const searchPersonaByCVU = async (cvu) => {
  try {
    const response = await axios.get(`http://localhost/Alta-Participantes/public/buscar-persona-cvu.php`, {
      params: { cvu }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Buscar personas por su nombre por medio de un llamada a la Api
export const searchPersonaByNombre = async (nombre) => {
  try {
    const response = await axios.get(`http://localhost/Alta-Participantes/public/buscar-persona-nombre.php`, {
      params: { nombre }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Buscar Instituciones por medio de un llamada a la Api
export const getInstituciones = async () => {
  try {
    const response = await axios.get(`http://localhost/Alta-Participantes/public/obtener-instituciones.php`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Registrar a personas con CVU al proyecto  por medio de un llamada a la Api
export const registrarPersonaConCVU = async (cvu, nombre, proyectoId) => {
  try {
    const formData = new FormData();
    formData.append('cvu', cvu);
    formData.append('nombre', nombre);
    formData.append('proyecto_id', proyectoId);
    
    const response = await axios.post(`http://localhost/Alta-Participantes/public/registrar-participante-cvu.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const registrarPersonaSinCVU = async (nombre, institucionId, proyectoId) => {
  try {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('instituciones_id', institucionId);
    formData.append('proyecto_id', proyectoId);
    
    const response = await axios.post(`http://localhost/Alta-Participantes/public/registrar-persona-sin-cvu.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getParticipantesByProyecto = async (proyectoId) => {
  try {
    const response = await axios.get(`http://localhost/Alta-Participantes/public/obtener-participantes.php`, {
      params: { proyecto_id: proyectoId }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};