import express from "express";
import { getRedisInstance } from "./redis";
const app = express();
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.post("/api/update-notepad", (req, res) => {

    const { noteName, noteContent } = req.body;

    const redisInstance = getRedisInstance();

    const noteObj = {
        content: noteContent
    }; 

    const hourInMS = 6000 * 60 * 24;
    
    const expiry = hourInMS
    redisInstance.set(noteName, JSON.stringify(noteObj), "PX", expiry)
})
app.listen(3024, () => {
    console.log("Server running on port 3024");
})