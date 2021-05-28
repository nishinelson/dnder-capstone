import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
import "./Chat.css"
let socket;

const Chat = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { user: user.firstName, msg: chatInput });
        setChatInput("")
    }

    return (user && (
        <div className="chat-container">
            <div className="message-container">
                {messages.map((message, ind) => (
                    <div className="message-div" key={ind}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>
            <form className="chat-form" onSubmit={sendChat}>
                <input
                    className="chat-input"
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button className="chat-button" type="submit">Send</button>
            </form>
        </div>
    )
    )
};


export default Chat;
