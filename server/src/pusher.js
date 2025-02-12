import Pusher from "pusher"; 

const pusher = new Pusher({
  appId: "1941035",
  key: "964d7c423e891c0a791e",
  secret: "87a5614b590801f718da",
  cluster: "mt1",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

export default pusher;