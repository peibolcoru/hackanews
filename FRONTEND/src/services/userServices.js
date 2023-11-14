// Obtenemos la URL de nuestra API.
const API_URL = import.meta.env.VITE_API_URL_BACKEND;

// Función de registro.
export async function registerService({user_name,user_email,user_password}) {
    const response = await fetch(`${API_URL}/users`, {
      method: "post",
      body: JSON.stringify({ user_name, user_email, user_password }),
      headers: {
        "Content-Type":"application/json",
      },
    }) 
    const json = await response.json()
    if (!response.ok) {
      throw new Error (json.message)
    }
  };

// Función de login.
export const loginService = async ({ email, password }) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};

// Obtener perfil privado.
export async function getPrivateProfileService (token) {
    const response = await fetch(`${API_URL}/users/getMeUsers`, {
        headers: {
            Authorization: token,
        },
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
}
