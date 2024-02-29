import mongoose from "mongoose";

mongoose.set('strictQuery', true);

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URL || 
            'mongodb://127.0.0.1/ROPMS'
        );
        console.log('Database connected')
    } catch (error) {
        console.log("Database connection failed: ", error);
    }
};