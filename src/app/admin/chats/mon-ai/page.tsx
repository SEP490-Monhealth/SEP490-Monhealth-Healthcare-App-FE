"use client"

import React, { useEffect, useState } from "react"

import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel
} from "@microsoft/signalr"

interface ChatMessage {
  sender: string
  content: string
  timestamp: string
}

function SignalRChatTest() {
  const [hubConnection, setHubConnection] = useState<HubConnection>()
  const [userName, setUserName] = useState<string>("User")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState<string>("")
  const [connectionStatus, setConnectionStatus] = useState<boolean>(false)

  useEffect(() => {
    createHubConnection()

    return () => {
      if (hubConnection) {
        hubConnection.stop()
      }
    }
  }, [hubConnection])

  const createHubConnection = async () => {
    const hubConnection = new HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_API_URL}/chatbox`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build()

    try {
      await hubConnection.start()
      console.log("Connection started")
      setConnectionStatus(true)

      hubConnection.on("ReceiveMessage", (message: ChatMessage) => {
        console.log("Received message:", message)
        if (message) {
          setMessages((prevMessages) => [...prevMessages, message])
        }
      })

      hubConnection.on(
        "LoadMessageHistory",
        (messageHistory: ChatMessage[]) => {
          console.log("Received message history:", messageHistory)
          setMessages(messageHistory || [])
        }
      )

      hubConnection.on("UserConnected", (connectionId: string) => {
        console.log(`User connected: ${connectionId}`)
      })

      hubConnection.on("UserDisconnected", (connectionId: string) => {
        console.log(`User disconnected: ${connectionId}`)
      })

      setHubConnection(hubConnection)
    } catch (error) {
      console.error("Error establishing connection:", error)
      setConnectionStatus(false)
    }
  }

  const sendMessage = async () => {
    if (hubConnection && newMessage.trim() !== "") {
      try {
        console.log("Sending message:", newMessage)
        await hubConnection.invoke("SendMessage", userName, newMessage)
        setNewMessage("")
      } catch (error) {
        console.error("Error sending message:", error)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  const handleReconnect = () => {
    if (hubConnection) {
      hubConnection.stop()
    }
    createHubConnection()
  }

  return (
    <div className="rounded-lg bg-gray-50 p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">SignalR Chat Test</h1>
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-3 w-3 rounded-full ${connectionStatus ? "bg-green-500" : "bg-red-500"}`}
          ></span>
          <span>{connectionStatus ? "Connected" : "Disconnected"}</span>
          <button
            onClick={handleReconnect}
            className="ml-2 rounded bg-blue-500 px-4 py-1 text-sm text-white"
          >
            Reconnect
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm">Your Name</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full rounded border border-gray-300 p-2"
        />
      </div>

      <div className="mb-4 h-64 overflow-y-auto rounded border border-gray-300 bg-white p-4">
        {messages.length === 0 ? (
          <p className="mt-16 text-center text-gray-500">No messages yet</p>
        ) : (
          messages.map((message, index) => (
            <div key={index} className="mb-2">
              <strong>{message.sender}:</strong> {message.content}
              <span className="ml-1 text-xs text-gray-500">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message"
          className="flex-grow rounded border border-gray-300 p-2"
        />
        <button
          onClick={sendMessage}
          className="rounded bg-blue-500 px-6 py-2 text-white"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default SignalRChatTest
