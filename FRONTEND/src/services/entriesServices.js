const API_URL = import.meta.env.VITE_API_URL_BACKEND

// Botón de like
export async function likesButtomService(newsId, token) {
    const response = await fetch(`${API_URL}/entries/like/${newsId}`, {
        method: "POST",
        headers: {
            Authorization: token
        },

    })
    const json = await response.json()
    
    if (!response.ok) {
        throw new Error(json.message)
    }
    return json.data
}

// Estado de likes en BBDD
export async function likesStatusService(newsId, token) {
    
    const response = await fetch(`${API_URL}/entries/likestatus/${newsId}`, {
        headers: {
            Authorization: token
        },
    })
    const json = await response.json()

    if (!response.ok) {
        throw new Error(json.message)
    }
    return json.data
}

// Función que da todas las entradas
export async function getAllEntriesService() {


    const response = await fetch(`${API_URL}/entries/allentries`);
    const json = await response.json();


    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
}

// Función que da una entrada por id
export async function getEntryService (id) {
    
    const response = await fetch(`${API_URL}/entries/view/${id} `)
    const json = await response.json()
  
    if (!response.ok) {
      throw new Error(json.message)
    }
    return json.data
  }
  
// Función que crea una entrada
  export async function createEntryService ({ data, token })  {
    const response = await fetch(`${API_URL}/entries`, {
        method: 'POST',
        body: data,
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    return json;
};


// Función que elimina una entrada
export async function deleteEntryService(id, token) {
  
    const response = await fetch(`${API_URL}/entries/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
  
    const json = await response.json()
  
    if (!response.ok) {
      throw new Error(json.message)
    }
  };
  
// Función que obtiene las entradas de un usuario logueado
  export async function MeNewsService (token) {
    const response = await fetch(`${API_URL}/entries/meentries`, {
      headers: {
        Authorization: token
      }
    })
    const json = await response.json()
  
    if (!response.ok) {
      throw new Error(json.message)
    }
    return json.data
  }
  

//Función que actualiza una entrada

import { getToken } from '../utilities/getToken';
export async function updateEntryService ({ formData, entryId })  {
    const token = getToken();
    const response = await fetch(
        `${API_URL}/entries/update/${entryId}`,
        {
            method: 'POST',
            headers: {
                Authorization: token,
            },
            body: formData,
        }
    );

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json;
};
