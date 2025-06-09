import dotenv from 'dotenv';
import express from "express";
import policyRoutes from "./routes/policy";

dotenv.config()

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/', policyRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

export default app;