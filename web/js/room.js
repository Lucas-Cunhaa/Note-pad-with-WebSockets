const roomNameLabel = document.getElementById("roomNameLabel")
const roomContentTextarea = document.getElementById("notepadContent")

const params = new URLSearchParams(window.location.search)
const roomName = params.get("name")
roomNameLabel.innerText = roomName

roomContentTextarea.addEventListener("keyup", async (e) => {
    console.log("changing")
    const { value } = e.target

    await fetch(`http://localhost:3024/api/update-notepad/`, {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteName: roomName, noteContent: value })
    }).then((data) => console.log(data))
    }
)

window.addEventListener("load", async () => {
    const data = await fetch(`http://localhost:3024/api/get-notepad/${roomName}`)
})