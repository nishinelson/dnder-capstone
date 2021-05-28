import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import "./Chat.css"
let socket;

const Chat = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const {id} = useParams();

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on('connect', () => {
            socket.emit('join', {'room': id, 'name': user.firstName})
         })

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
        socket.emit("chat", { user: user.firstName, msg: chatInput, 'room': id });
        setChatInput("")
    }

    console.log(id, "=====================")

    return (user && (
        <div className="chat-container">
            <label className="chat-label">Party Chat</label>
            <div className="message-container">
                {messages.map((message, ind) => (
                    <div className="message-div" key={ind}><b>{message.user}:</b> {message.msg}</div>
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
