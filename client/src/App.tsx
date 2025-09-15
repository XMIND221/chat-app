import { useState } from "react";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    setMessages([...messages, newMessage]);
    setNewMessage("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>💬 Chat App</h1>

      <div style={styles.chatBox}>
        {messages.length === 0 ? (
          <p style={styles.placeholder}>Aucun message pour le moment...</p>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.message,
                ...(i % 2 === 0 ? styles.myMessage : styles.otherMessage),
              }}
            >
              {msg}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSend} style={styles.form}>
        <input
          type="text"
          placeholder="Écris ton message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          ➤
        </button>
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "16px",
    fontFamily: "Segoe UI, Arial, sans-serif",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  header: {
    textAlign: "center",
    color: "#1976d2",
    fontSize: "1.8rem",
    marginBottom: "20px",
    fontWeight: 600,
  },
  chatBox: {
    height: "350px",
    overflowY: "auto",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)",
  },
  placeholder: {
    color: "#aaa",
    textAlign: "center",
    marginTop: "40px",
    fontStyle: "italic",
  },
  message: {
    padding: "10px 15px",
    margin: "8px 0",
    borderRadius: "18px",
    maxWidth: "70%",
    wordWrap: "break-word",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    fontSize: "0.95rem",
  },
  myMessage: {
    backgroundColor: "#1976d2",
    color: "#fff",
    marginLeft: "auto",
    borderBottomRightRadius: "4px",
  },
  otherMessage: {
    backgroundColor: "#e0e0e0",
    color: "#333",
    marginRight: "auto",
    borderBottomLeftRadius: "4px",
  },
  form: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "1rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  button: {
    width: "45px",
    height: "45px",
    border: "none",
    borderRadius: "50%",
    backgroundColor: "#1976d2",
    color: "#fff",
    fontSize: "1.2rem",
    cursor: "pointer",
    boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
    transition: "0.3s",
  },
};

export default App;
