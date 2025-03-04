import express from "express";
import cors from "cors";
import pusher from "./pusher.js";
import client from "./redis.js";

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors());

app.post("/api/update-notepad", (req, res) => {

    const { noteName, noteContent, userId } = req.body;

    const noteObj = {
        content: noteContent,
        userId
    }; 

    const hourInMS = 6000 * 60 * 24;
    
    const expiry = hourInMS;

    pusher.trigger(noteName, "updated-note", noteObj);
    client.set(noteName, JSON.stringify(noteObj), "PX", expiry); 
    res.status(200).send(noteObj)
    console.log(noteContent)
})

app.get("/api/get-notepad/:noteName", async (req, res) => {
    const { noteName } = req.params 

    const note = await client.get(noteName);
    if (note) return res.status(200).send(JSON.parse(note))

    return res.sendStatus(404);
});

app.listen(3024, () => {
    console.log("Server running on porta 3024")
});

