const baseUrl = "https://notes-api.dicoding.dev/v1";

const register = async (name, email, password) => {
  const response = await fetch(`${baseUrl}/register`, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();
  return responseJson;
};

const login = async (email, password) => {
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();
  return responseJson;
};

const getUserLoggedIn = async () => {
  const response = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const responseJson = await response.json();
  return responseJson;
};

const createNote = async (title, body) => {
  const response = await fetch(`${baseUrl}/notes`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      body: body,
    }),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();
  return responseJson;
};

const getNotes = async () => {
  const response = await fetch(`${baseUrl}/notes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const responseJson = await response.json();
  return responseJson;
};

const getArchivedNotes = async () => {
  const response = await fetch(`${baseUrl}/notes/archived`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const responseJson = await response.json();
  return responseJson;
};

const getNote = async (id) => {
  const response = await fetch(`${baseUrl}/notes/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const responseJson = await response.json();
  return responseJson;
};

const archiveNote = async (id) => {
  const response = await fetch(`${baseUrl}/notes/${id}/archive`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();
  return responseJson;
};

const unarchiveNote = async (id) => {
  const response = await fetch(`${baseUrl}/notes/${id}/unarchive`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();
  return responseJson;
};

const deleteNote = async (id) => {
  const response = await fetch(`${baseUrl}/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();
  return responseJson;
};

export {
  register,
  login,
  getUserLoggedIn,
  createNote,
  getNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
};
