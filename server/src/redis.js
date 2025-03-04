import { createClient } from 'redis';
import dotenv from "dotenv";

dotenv.config();

const username = process.env.REDIS_USERNAME;
const password = process.env.REDIS_PASSWORD;
const host = process.env.REDIS_HOST;
const port = process.env.REDIS_PORT;

const client = createClient({
    username: username,
    password: password,
    socket: {
        host: host,
        port: port
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar

export default client;

