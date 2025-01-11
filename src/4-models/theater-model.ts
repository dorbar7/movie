import mongoose from "mongoose";

// 1. Interface
export interface ITheaterModel extends mongoose.Document {
    name: string;
}

// 2. Schema
export const TheaterSchema = new mongoose.Schema<ITheaterModel>({
    name: {
        type: String,
        required: [true, "Missing name"]
    }
});

// 3. Model
export const TheaterModel = mongoose.model<ITheaterModel>("TheaterModel", TheaterSchema, "theaters");
