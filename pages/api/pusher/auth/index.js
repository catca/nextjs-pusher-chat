import { pusher } from "../../../../lib";

export default async function handler(req, res) {
  const { socket_id, channel_name, username } = req.body;
  const randomId = Math.random().toString(32).slice(2);

  const presenceData = {
    user_id: randomId,
    user_info: {
      username,
    },
  };

  // Now we need to authorize the user using try and catch block
  try {
    const auth = pusher.authorizeChannel(socket_id, channel_name, presenceData);
    res.send(auth);
  } catch (error) {
    console.error(error);
  }
}
