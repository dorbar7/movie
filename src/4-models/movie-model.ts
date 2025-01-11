import mongoose from "mongoose";
import { TheaterModel } from "./theater-model";

// 1. Interface
export interface IMovieModel extends mongoose.Document {
    theaterId: mongoose.Schema.Types.ObjectId;
    name: string;
    dateTime: string;
    duration: number;
}

// 2. Schema
export const MovieSchema = new mongoose.Schema<IMovieModel>({
    theaterId: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: [true, "Missing name"]
    },
    dateTime: {
        type: String,
        required: [true, "Missing date and time"]
    },
    duration: {
        type: Number,
        required: [true, "Missing duration"]
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true},
    id: false
});

MovieSchema.virtual("theater", {
    ref: TheaterModel,
    localField: "theaterId",
    foreignField: "_id",
    justOne: true
});

// 3. Model
export const MovieModel = mongoose.model<IMovieModel>("MovieModel", MovieSchema, "movies");
