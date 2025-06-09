import dotenv from 'dotenv';
import express from "express";
import policyRoutes from "./routes/policy";
import { errorHandler } from "./middlewares/auth";

dotenv.config()

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/', policyRoutes);

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

export default app;