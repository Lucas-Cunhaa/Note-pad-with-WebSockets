const roomNameLabel = document.getElementById("roomNameLabel")
const roomContentTextarea = document.getElementById("notepadContent")

const params = new URLSearchParams(window.location.search)
const roomName = params.get("name")

const pusher = new Pusher('964d7c423e891c0a791e', {
    cluster: 'mt1'
  });

  
roomNameLabel.innerText = roomName

roomContentTextarea.addEventListener("keyup", async (e) => {
    console.log("changing")
    const { value } = e.target

    await fetch(`http://localhost:3024/api/update-notepad`, {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteName: roomName, noteContent: value, userId: pusher.sessionID })
    })
    }
)

Pusher.logToConsole = true;


if (roomName) {
    const channel = pusher.subscribe(roomName);
    channel.bind("updated-note", data => {
        console.log({ data });
        if (data.content && data.userId !== pusher.sessionID) roomContentTextarea.value = data.content;
});
}


window.addEventListener("load", async () => {
    const data = await fetch(`http://localhost:3024/api/get-notepad/${roomName}`).then(res => res.json());
    roomContentTextarea.value = data.content;
})