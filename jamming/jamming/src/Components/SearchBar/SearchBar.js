import React from 'react';
import './SearchBar.css'

class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.state = {value: ''}
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    render(){ 
        return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
            <button className="SearchButton" onClick={this.search}>SEARCH</button>
        </div>
        );
    }

    search(){
        this.props.onSearch(this.state.value);
    }

    handleTermChange(event){
        this.setState({ value: event.target.value});
    }
}

export default SearchBar;