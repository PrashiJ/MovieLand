import {useState, useEffect} from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";


const API_URL = 'http://www.omdbapi.com?apikey=c0ff196f';

const movie1 =
    {
        "Title": "LA LA Land",
        "Year": "2008",
        "imdbID": "tt1179042",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNzY3Zjg3NjItYjY2Ni00MTZlLTlmNGEtYTYyNmMxZDU1MmUyXkEyXkFqcGdeQXVyNTI4ODAwNzQ@._V1_SX300.jpg"
    }

const App = () => {

    const[movies, setMovies] = useState([]);
    const[searchTerm, setSearchTerm] = useState(''); 

    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('La La Land');
    },[]);

    return(
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                 placeholder="Search for movies"
                 value={searchTerm}
                 onChange={(e)  => {setSearchTerm(e.target.value)}}
                />
                <img
                 src={SearchIcon}
                 alt="Search"
                 onClick={() =>searchMovies(searchTerm)}
                />
            </div>
            
            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
        </div>
    );
}

export default App;