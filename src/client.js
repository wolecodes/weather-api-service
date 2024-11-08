import { createClient } from "redis";

// redis client
const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

client.connect().then(() => {
  console.log("Redis client connected");
});
export default client;
