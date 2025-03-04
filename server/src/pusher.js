import Pusher from "pusher"; 
import dotenv from "dotenv";

dotenv.config();
const appId = process.env.PUSHER_APP_ID;
const key = process.env.PUSHER_KEY;
const secret = process.env.PUSHER_SECRET;
const cluster = process.env.PUSHER_CLUSTER;

const pusher = new Pusher({
  appId: appId,
  key: key,
  secret: secret,
  cluster: cluster,
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

export default pusher;