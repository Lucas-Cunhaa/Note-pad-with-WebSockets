import express from "express";
import cors from "cors";
import pusher from "./pusher.js";
import client from "./redis.js";

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors());

app.post("/api/update-notepad", (req, res) => {

    const { noteName, noteContent, user_id } = req.body;

    const noteObj = {
        content: noteContent,
        user_id
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

app.post("/pusher/authorize", async(req, res) => {
    const socketId = req.body.socket_id;
    const user_id = req.body.user_id;
    const username = req.body.username;
    const channel_name = req.body.channel_name;

    const data = {
        user_id: user_id,
        user_info: {
            id: user_id,
            username
        }
    }

    const authUser = await pusher.authorizeChannel(socketId, channel_name, data)
    console.log("chanel", {authUser})
    return res.status(200).send(authUser)
})

app.post("/pusher/auth", async(req, res) => {
    const socketId = req.body.socket_id;
    const user_id = req.body.user_id;
    const username = req.body.username;

    const user = {
        id: user_id,
        name: username
    }
    const pusherUser = await pusher.authenticateUser(socketId, user)
    console.log(pusherUser)
    return res.status(200).send({pusherUser})

})

app.listen(3024, () => {
    console.log("Server running on porta 3024")
});

