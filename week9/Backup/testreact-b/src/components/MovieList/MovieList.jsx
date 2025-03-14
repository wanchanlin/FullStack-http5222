import { useState } from "react";
import Movie from "../Movie/Movie";

const movieArray = [
    { title: "The King's Man", year: "2021" },
    { title: "The Dark Knight", year: "2008" }
];

export default function MovieList() {
    // Create state variable and set movie array 
    const [movieList, setMovieList] = useState(movieArray);

    function formHandler(e) {
        e.preventDefault();
        const newMovie = {
            title: e.target.elements.title.value,
            year: e.target.elements.year.value
        };
        setMovieList([
            ...movieList,
            newMovie
        ]);
     
    }

    return (
        <section>
            <h2>My Movies</h2>
            <form onSubmit={formHandler}> 
                <label htmlFor="title">Movie title:</label>
                <input type="text" id="title" name="title" /> 
                
                <label htmlFor="year">Year:</label> 
                <input type="text" id="year" name="year" /> 
                
                <button type="submit">Add</button> 
            </form>

            {movieList.map((m) => (
                <Movie
                    title={m.title}
                    year={m.year}
                    key={m.title + m.year} // unique key for each movie component
                />
            ))}
        </section>
    );
}
