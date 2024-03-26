import mongoose from "mongoose";

mongoose.set('strictQuery', true);

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URL || 
            'mongodb+srv://admin:admin@curbfresh.awht4ze.mongodb.net/CurbFresh?retryWrites=true&w=majority&appName=CurbFresh'
        );
        console.log('Database connected')
    } catch (error) {
        console.log("Database connection failed: ", error);
    }
};