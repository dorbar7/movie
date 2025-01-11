import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import { IMovieModel, MovieModel } from "../4-models/movie-model";
import { ITheaterModel, TheaterModel } from "../4-models/theater-model";

// Get all theaters: 
function getAllTheaters(): Promise<ITheaterModel[]> {
    return TheaterModel.find().exec();
}

// Get movies by theater: 
function getMoviesByTheater(theaterId: string): Promise<IMovieModel[]> {
    return MovieModel.find({ theaterId }).populate("theater").exec();
}

// Add movie: 
function addMovie(movie: IMovieModel): Promise<IMovieModel> {
    const errors = movie.validateSync();
    if(errors) throw new ValidationErrorModel(errors.message);
    return movie.save();
}

// Delete movie: 
async function deleteMovie(_id: string): Promise<void> {
    const deletedMovie = await MovieModel.findByIdAndDelete(_id);
    if(!deletedMovie) throw new ResourceNotFoundErrorModel(_id);
}

export default {
    getAllTheaters,
    getMoviesByTheater,
    addMovie,
    deleteMovie
};