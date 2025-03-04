import { createClient } from 'redis';
let instance;

const client = createClient({
    username: 'default',
    password: '2i00Vxh7LsMjqWTuc65REZSpY3kEAkeA',
    socket: {
        host: 'redis-11293.crce181.sa-east-1-2.ec2.redns.redis-cloud.com',
        port: 11293
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar

export default client;

