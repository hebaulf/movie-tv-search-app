import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
// Styles
import { Wrapper, Content } from './SearchBar.styles';
// Images
import SearchIcon from '../../images/search-icon.svg';

const SearchBar = ({ setSearchTerm }) => {
    const [state, setState] = useState('');
    const initial = useRef(true);

    useEffect(() => {
        if(initial.current) {
            initial.current = false;
            return;
        }
        // Set 500ms timeout of loading movies when searching
        const timer = setTimeout(() => {
            setSearchTerm(state);
        }, 500);

        return () => clearTimeout(timer);
    }, [setSearchTerm, state])

    return (
        <Wrapper>
            <Content>
                <img 
                    src={SearchIcon} 
                    alt="search-icon" 
                />
                <input 
                    type="text" 
                    placeholder="Search Movie" 
                    onChange={event => setState(event.currentTarget.value)} 
                    value={state}
                />
            </Content>
        </Wrapper>
    )
};

SearchBar.propTypes = {
    setSearchTerm: PropTypes.func
}

export default SearchBar;