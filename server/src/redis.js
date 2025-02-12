import { Redis } from "ioredis"
export function getRedisInstance() {
    const instance = new Redis( {        
        host: "redis-11291.c308.sa-east-1-1.ec2.redns.redis-cloud.com", 
        port: 11291,
        username: "default", 
        password: "aXKqucJeu9jmjHjm4ZiTA6io1TycQFSb", 
    })

    instance.on("connect", () => console.log("Redis connected"))
    instance.on("error", (error) => console.log("Redis error", error))
    
    return instance
}