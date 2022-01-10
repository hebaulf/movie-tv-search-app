import { useState, useEffect } from "react";
import { isPersistedState } from "../helpers";
// API
import API from '../API';

// All hooks and accompanying JS for the movie.js page
export const useMovieFetch = movieId => {
    // All useState hooks
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Function for fetching a movie
        const fetchMovie = async () => {
            try {
                setLoading(true); // Start loading info
                setError(false); // No errors to begin with

                // Create variable for fetchMovie API (See API.js file)
                const movie = await API.fetchMovie(movieId); 
                // Create variable for fetchCredits API (See API.js file)
                const credits = await API.fetchCredits(movieId);
                
                // Create variable for getting directors only
                // Here is an example of functional programming .filter()
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                );

                setState({
                    ...movie,
                    actors: credits.cast,
                    directors
                });

                setLoading(false);
            } catch (error) {
                setError(true);
            }
        };

        const sessionState = isPersistedState(movieId);
        // Check if we have a session state
        if(sessionState) {
            setState(sessionState);
            setLoading(false);
            return;
        }
        // Else load from API
        fetchMovie();
    }, [movieId]);

    // Write to sessionStorage
    useEffect(() => {
        // Set visited items to sessionStorage for faster rendering of visited items
        sessionStorage.setItem(movieId, JSON.stringify(state));
    }, [movieId, state]);

    return { state, loading, error }
};