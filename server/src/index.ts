import express from "express"

const app = express()
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

app.post("/api/update-notepad", (req, res) => {
    
})
app.listen(3024, () => {
    console.log("Server running on port 3024")
})