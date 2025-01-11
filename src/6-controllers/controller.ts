import express, { Request, Response, NextFunction } from "express";
import { MovieModel } from "../4-models/movie-model";
import logic from "../5-logic/logic";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/theaters
router.get("/theaters", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const theaters = await logic.getAllTheaters();
        response.json(theaters);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/movies-by-theater/:theaterId
router.get("/movies-by-theater/:theaterId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const theaterId = request.params.theaterId;
        const movies = await logic.getMoviesByTheater(theaterId);
        response.json(movies);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/movies
router.post("/movies", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const movie = new MovieModel(request.body);
        const addedMovie = await logic.addMovie(movie);
        response.status(201).json(addedMovie);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/movies/:_id
router.delete("/movies/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await logic.deleteMovie(_id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;

