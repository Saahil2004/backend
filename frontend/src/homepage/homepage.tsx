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
  AppBar,
  Toolbar,
  InputAdornment,
  IconButton,
  Avatar,
  LinearProgress,
  Stack,
  ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { blue } from "@mui/material/colors";
import "./homepage.css";

interface Message {
  sender: "user" | "bot";
  text: string;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      // Add user message to the chat
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
      setLoading(true);

      try {
        // Send the input text to your backend
        const response = await axios.post("http://127.0.0.1:8000/chat", {
          text: input,
        });

        console.log("This is the response", response);
        const botResponse = response.data.response;

        // Add bot response to the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: botResponse },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents the default action (new line) if Enter is pressed without Shift
      handleSend();
    }
  };

  return (
    <>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#212121",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Toolbar>
          <Typography variant="h5" sx={{ padding: "25px" }}>
            SaranshAI
            <AutoAwesomeIcon sx={{ paddingLeft: "5px" }} />
          </Typography>
        </Toolbar>
        <Avatar
          sx={{ bgcolor: blue[900], color: "white", marginRight: "25px" }}
        >
          AI
        </Avatar>
      </AppBar>
      <Container
        style={{
          backgroundColor: "#212121",
          height: "calc(100vh - 64px)", // Adjust height to account for AppBar
          maxWidth: "100%",
          padding: "0px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "auto",
          }}
        >
          <Paper
            style={{
              width: "100%",
              maxWidth: "800px",
              padding: "20px",
              height: "calc(100% - 80px)", // Adjust height to account for margins
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#212121",
              margin: "20px",
              boxShadow: "none",
              overflow: "hidden",
            }}
            className="custom-scrollbar"
          >
            <List
              style={{ flexGrow: 1, overflow: "auto", marginBottom: "20px" }}
            >
              {messages.map((msg, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                    }
                    style={{
                      textAlign: msg.sender === "user" ? "right" : "left",
                      backgroundColor:
                        msg.sender === "user" ? "#343541" : "#444654",
                      color: "white",
                      borderRadius: "10px",
                      padding: "10px",
                      margin: "5px 0",
                    }}
                  />
                </ListItem>
              ))}
              {loading && (
                <ListItem style={{ justifyContent: "flex-start" }}>
                  <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                    <AutoAwesomeOutlinedIcon
                      sx={{ fontSize: 40, color: "rgba(168,85,247,1)" }}
                    />
                    <LinearProgress
                      sx={{
                        height: "10px",
                        background:
                          "linear-gradient(90deg, rgba(168,85,247,1) 0%, rgba(255,255,255,0) 100%)",
                        "& .MuiLinearProgress-bar": {
                          background:
                            "linear-gradient(90deg, rgba(168,85,247,1) 0%, rgba(255,255,255,0.5) 100%)",
                          backdropFilter: "blur(5px)",
                        },
                        borderRadius: "5px",
                        width: "80%",
                      }}
                    />
                    <LinearProgress
                      sx={{
                        height: "10px",
                        background:
                          "linear-gradient(90deg, rgba(168,85,247,1) 0%, rgba(255,255,255,0) 100%)",
                        "& .MuiLinearProgress-bar": {
                          background:
                            "linear-gradient(90deg, rgba(168,85,247,1) 0%, rgba(255,255,255,0) 100%)",
                          backdropFilter: "blur(5px)",
                        },
                        borderRadius: "5px",
                        width: "80%",
                      }}
                    />
                    <LinearProgress
                      sx={{
                        height: "10px",
                        background:
                          "linear-gradient(90deg, rgba(168,85,247,1) 0%, rgba(255,255,255,0) 65%)",
                        "& .MuiLinearProgress-bar": {
                          background:
                            "linear-gradient(90deg, rgba(168,85,247,1) 0%, rgba(255,255,255,0) 65%)",
                          backdropFilter: "blur(5px)",
                        },
                        borderRadius: "5px",
                        width: "65%",
                      }}
                    />
                  </Stack>
                </ListItem>
              )}
            </List>
            <Box display="flex">
              <TextField
                fullWidth
                multiline
                minRows={1}
                maxRows={4}
                variant="outlined"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={handleKeyDown}
                InputProps={{
                  style: { color: "white", borderRadius: "25px" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleSend}
                        color="secondary"
                        disabled={!input.trim()}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                style={{ backgroundColor: "#444654", borderRadius: "25px" }}
              />
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
}

export default Chat;
