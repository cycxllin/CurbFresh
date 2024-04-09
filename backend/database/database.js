import mongoose from "mongoose";

mongoose.set('strictQuery', true);

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URL || 
            'mongodb://localhost:27017/CurbFresh'
        );
        console.log('Database connected')
    } catch (error) {
        console.log("Database connection failed: ", error);
    }
};
