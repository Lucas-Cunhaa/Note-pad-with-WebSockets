const roomName = document.getElementById("roomName");
const joinroomButton = document.getElementById("joinRoomButton");

joinroomButton?.addEventListener("click", () => {
    if(!roomName.value) return;
    
    window.location.href =`/web/room.html?name=${roomName.value}`;
});