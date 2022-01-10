import { useState, useEffect } from "react";
// API
import API from '../API';
// Helpers
import { isPersistedState } from "../helpers";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

// All hooks and accompanying JS for the home.js page
export const useHomeFetch = () => {
    // All useState hooks
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Function for fetching movies 
    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false); // No errors to begin with
            setLoading(true); // Load movies
 
            // Create variable for fetchMovies API (See API.js file)
            const movies = await API.fetchMovies(searchTerm, page);

            setState(prev => ({ // 
                ...movies, 
                results:
                    // If we have a page of results then we add results to previous results, otherwise we just display first results. 
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }));
        } catch (error) {
            setError(true);
        }

        setLoading(false);
    };

    // Search and initial
    useEffect(() => {
        // Check if we have a session state
        if(!searchTerm) {
            const sessionState = isPersistedState('homeState');

            if(sessionState) {
                // console.log("Grabbing from sessionStorage");
                setState(sessionState);
                return;
            }
        }
        // console.log("Grabbing from API");
        setState(initialState);
        fetchMovies(1, searchTerm);
    }, [searchTerm]);

    // Load More
    useEffect(() => {
        // If there is nothing more to load on the page, then return 
        if(!isLoadingMore) return;

        // Else fetch next page of movies
        fetchMovies(state.page +1, searchTerm);
        setIsLoadingMore(false);
    }, [isLoadingMore, searchTerm, state.page]);

    // Write to sessionStorage
    useEffect(() => {
        // If we are not searching then set visited items to sessionStorage for faster rendering of visited items
        if(!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state))
    }, [searchTerm, state]);

    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};