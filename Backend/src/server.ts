import app from "./app.js";

// Deployment trigger: Quota-friendly Titan Arena (Mistral Medium vs Llama 3.1)
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})