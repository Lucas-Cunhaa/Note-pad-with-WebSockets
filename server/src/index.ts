import express from "express";
import cors from "cors";
import { getRedisInstance } from "./redis.ts";

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors());

app.post("/api/update-notepad", (req, res) => {

    const { noteName, noteContent } = req.body;

    const redisInstance = getRedisInstance();

    const noteObj = {
        content: noteContent
    }; 

    const hourInMS = 6000 * 60 * 24;
    
    const expiry = hourInMS;

    redisInstance.set(noteName, JSON.stringify(noteObj), "PX", expiry); 
    res.status(200).send(noteObj)
    console.log("bateu")

})

app.get("/api/get-notepad/:noteName", async (req, res) => {
    const { noteName } = req.params 

    const redisInstance = getRedisInstance(); 
    const note = await redisInstance.get(noteName);
    if (note) return res.status(200).send(JSON.parse(note))

    return res.sendStatus(404);
});

app.listen(3060, () => {
    console.log("Server running on port 3060")
});

