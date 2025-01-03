import { Client, Account, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export const CHAT_HISTORY_COLLECTION = '674d2c930001fe0f847d';
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;