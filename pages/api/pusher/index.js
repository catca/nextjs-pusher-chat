import { pusher } from "../../../lib";

export default async function handler(req, res) {
  const { message, username } = req.body;

  await pusher.trigger("presence-channel", "chat-update", {
    message,
    username,
  });

  res.json({ status: 200 });
}
