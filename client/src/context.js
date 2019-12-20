import React, { createContext, Component } from 'react';

const Context = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_SHOWS':
      return {
        ...state,
        shows: action.payload,
        heading: 'Search Results'
      };
    default:
      return state;
  }
}

export class Provider extends Component {
  state = {
    shows: [],
    heading: 'Shows',
    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount () {
    const fetchShows = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/shows`);
      const shows = await res.json();
    
      this.setState({ shows: shows });
    }

    fetchShows()
  }

  render () {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer