const roomNameLabel = document.getElementById("roomNameLabel")
const roomContentTextarea = document.getElementById("notepadContent")

const params = new URLSearchParams(window.location.search)
const roomName = params.get("name")
roomNameLabel.innerText = roomName

roomContentTextarea.addEventListener(("keyup", (e) => {
    console.log("changing")
    
}))