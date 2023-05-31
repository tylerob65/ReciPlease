import { createContext, useContext, useState } from "react";

export const MessageContext = createContext();

export const useMessage = () => {
  return useContext(MessageContext)
}

const MessageContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([])

  const addMessage = (text, severity = "error") => {
    const newMessage = {
      text: text,
      severity: severity,
    }
    setMessages([...messages, newMessage])
  }

  const removeMessage = (i) => {
    const messageList = [...messages]
    messageList.splice(i, 1)
    setMessages(messageList)
  }

  const providedValues = {
    messages: messages,
    addMessage: addMessage,
    removeMessage: removeMessage,
  }

  return (
    <MessageContext.Provider value={providedValues}>
      {children}
    </MessageContext.Provider>
  )
}
export default MessageContextProvider


