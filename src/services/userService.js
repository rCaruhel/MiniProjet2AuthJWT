import { postRequest } from "@/services/axios.service";

async function registerUserFromAPI(name, pass) {
    const payload = { username: name.toString(), password: pass.toString() };

    //console.log("Données envoyées :", JSON.stringify(payload));

    const response = await postRequest('/register', payload, 'register', {
        headers: { 'Content-Type': 'application/json' } // Forcer l'envoi en JSON
    });

    //console.log("Réponse register reçue :", response);

    return response;
}



async function loginUserFromAPI(name, pass) {
    const payload = { username: name.toString(), password: pass.toString() };
    const response = await postRequest('/login', payload, 'login', {
        headers: { 'Content-Type': 'application/json' }
    });
    return response;

}

async function registerUser(name, pass) {
    return await registerUserFromAPI(name, pass);
}

async function loginUser(name, pass) {
    return await loginUserFromAPI(name, pass);
}

export {
    registerUser,
    loginUser
};
