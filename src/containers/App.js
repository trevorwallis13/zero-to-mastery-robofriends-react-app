import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
// import { robots } from './robots';


class App extends Component {
  constructor() {
    super();

    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value})
  }

  render() {
    const { robots, searchfield } = this.state;
    
    const filteredRobots = robots.filter(robot => {
     
      let nameLowerCase = robot.name.toLowerCase();
      let searchfieldLowerCase = searchfield.toLowerCase();
    
      return nameLowerCase.includes(searchfieldLowerCase);

  })

  if(this.state.robots.length === 0) {
    return (

      <h1>Loading...</h1>
    )
  }
    return (
      <div className='tc'>
        <h1>Robofriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
  
}

export default App;
