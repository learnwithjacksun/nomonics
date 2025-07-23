import { Client, Storage } from "appwrite";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT!)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID!)

const storage = new Storage(client)

const BUCKET = import.meta.env.VITE_APPWRITE_BUCKET_ID!

export { client, storage, BUCKET }
