import { createClient } from "redis";

// redis client
const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

export default client;
