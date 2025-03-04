const roomName = document.getElementById("roomName");
const joinroomButton = document.getElementById("joinRoomButton");
const usernameInput = document.getElementById("username");

joinroomButton?.addEventListener("click", () => {
    if(!roomName.value || !usernameInput.value) return;
    
    const randomNumber = Math.floor(Math.random() * 1000);
    localStorage.setItem("username", usernameInput.value);
    localStorage.setItem("user_id", `${usernameInput.value}-${randomNumber}`)
    window.location.href =`/web/room.html?name=${roomName.value}`;
});