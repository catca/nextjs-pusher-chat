import Pusher from "pusher-js";
import axios from "axios";
import { useEffect, useState } from "react";

import { Members, Member, MessageData } from "../types";

type ChatProps = {
  username: string;
};

export default function Chat({ username }: ChatProps) {
  // create instance of pusher in the client side.
  const pusher = new Pusher(
    process.env.NEXT_PUBLIC_KEY ? process.env.NEXT_PUBLIC_KEY : "",
    {
      cluster: "ap3",
      authEndpoint: "api/pusher/auth",
      auth: {
        params: {
          username,
        },
      },
    }
  );

  const [chats, setChats] = useState<{ username: string; message: string }[]>(
    []
  );
  const [message, setMessage] = useState("");
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState<{ username: string }[]>([]);

  // Handle the subscribe to the presence-channel which created in the server-side by using the useEffect.
  useEffect(() => {
    let subscribe = true;
    if (subscribe) {
      // subscribe to the channel.
      const channel: any = pusher.subscribe("presence-channel");

      // Now we can handle all event related to that channel. ==> using bind()
      // Ex. like when a user subscribes to the channel.
      channel.bind("pusher:subscription_succeeded", (members: Members) => {
        setOnlineUsersCount(members.count);
      });

      // when a new user join the channel.
      channel.bind("pusher:member_added", (member: Member) => {
        setOnlineUsersCount(channel.members.count);

        setOnlineUsers((prev) => [...prev, { username: member.info.username }]);
      });

      // when someone send a message.
      channel.bind("chat-update", (data: MessageData) => {
        const { username, message } = data;

        setChats((prev) => [...prev, { username, message }]);
      });
    }

    return () => {
      // last unsubscribe the user from the channel.
      pusher.unsubscribe("presence-channel");
      subscribe = false;
    };
  }, []);

  // function to handle the submit a message.
  const handleSubmitMsg = async () => {
    // posting the data to the route for messages.
    const { status } = await axios.post("/api/pusher", {
      username,
      message,
    });

    status === 200 && setMessage("");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-gray-900">
      <div className="h-fit w-fit bg-gray-700 p-4 rounded-md my-4">
        <h2 className="text-white font-medium text-center">
          Welcome back,{" "}
          <span className="text-blue-500 font-semibold">
            {username ? username.toUpperCase() : "Unknown User"}
          </span>
        </h2>
        <p>{onlineUsersCount} Online 🟢</p>
      </div>

      <div className="h-fit w-full mx-4 sm:w-1/2 xl:w-1/4 bg-gray-700 p-4 rounded-md max-h-[500px] overflow-y-auto max-w-[600px] my-4">
        {chats.length > 0 ? (
          chats.map((chat, index) => (
            <div
              key={index}
              className={`flex flex-col my-4 ${
                chat.username === username
                  ? "content-end items-end"
                  : "content-start items-start"
              }`}
            >
              <p
                className={`px-4 py-2 min-w-[100px] text-white shadow-lg rounded-lg w-fit ${
                  chat.username === username ? " bg-blue-600" : " bg-gray-900"
                }`}
              >
                {chat.message}
                <span
                  className={`block text-sm text-right ${
                    chat.username === username
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {chat.username}
                </span>
              </p>
            </div>
          ))
        ) : (
          <h2 className="text-white font-medium text-center">
            There is no messages!📌
          </h2>
        )}
      </div>

      <div className="h-fit w-fit bg-gray-700 p-4 rounded-md my-4">
        <input
          type="text"
          placeholder="Enter Your Message"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === "enter") {
              handleSubmitMsg();
            }
          }}
          className="h-10 border-2 border-solid border-white bg-white outline-none focus:border-blue-500 focus:border-2 text-black p-2 rounded-md block"
          value={message}
        />
        <button
          className="px-4 h-10 border-2 border-solid border-blue-500 text-blue-500 bg-white hover:bg-blue-500 py-2 hover:text-white w-full mt-4 rounded-md uppercase font-medium focus:bg-blue-500 focus:text-white outline-none"
          onClick={handleSubmitMsg}
        >
          Send
        </button>
      </div>
    </div>
  );
}
