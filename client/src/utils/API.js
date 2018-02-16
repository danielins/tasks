export const SERVER_URL = 'http://localhost:5000';

export const getTasks = () => fetch(`${SERVER_URL}/tasks`).then(res => res.json());