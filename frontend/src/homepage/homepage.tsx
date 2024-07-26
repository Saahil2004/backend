import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
} from "@mui/material";



interface Message {
  sender: "user" | "bot";
  text: string;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim()) {
      // Add user message to the chat
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');

      try {
        // Send the input text to your backend
        const response = await axios.post('http://localhost:3000/summarizer', { text: input }   );
        console.log("This is the response",response);
        const summary = response.data.summary;

        // Add bot response to the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: summary }
        ]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    // <div style={{width:"100%",height:'100%',backgroundColor: "#212121",margin:'50px'}}>
    <>
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">
        ChatGPT Interface
      </Typography>
    </Toolbar>
  </AppBar>
     <Container style={{
        backgroundColor: "#212121",
        height:'100vh',
        maxWidth:'100%',
    }}> 
    
      <Paper
        elevation={3}
        style={{
          margin:'0px 200px',
          padding: "20px",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#212121",
        
        }}
      >
        <List style={{ flexGrow: 1, overflow: "auto", marginBottom: "20px" }}>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={msg.text}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  backgroundColor:
                    msg.sender === "user" ? "#212121" : "#2F2F2F",
                  color: "white",
                  borderRadius: "10px",
                  padding: "10px",
                  margin: "5px 0",
                }}
              />
            </ListItem>
          ))}
        </List>
        <Box display="flex" mt={2}>
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            InputProps={{
              style: { color: "white" }
            }}
            style={{ backgroundColor: "#2F2F2F"}}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            style={{ marginLeft: "10px" }}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Container> 
    {/* </div> */}
    </>
  );
}

export default Chat;
