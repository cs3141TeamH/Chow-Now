import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

 class App extends Component {

  constructor(props) {
    super(props);
    this.state={username: null};
  }

  componentDidMount() {
    fetch('/api/query')
      .then(res => res.json())
      .then((user) => {
        console.log(user);
        this.setState({ username: user.username });
      });
  }

  render() {
    const username = this.state.username;
    return (
      /*
      <div class="container">
        {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        <img src={ReactImage} alt="react" />
      </div> 
      */
      <div>
        <Landing/>
      </div>
    );
  }
}

class Landing extends Component {
  render() {
    return(
      <div>
        <Header/>
        <Navigation/>
        <Footer/>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div class = "headContainer">
        {/* <img src={ReactImage} alt="headerImage" > </img> */}
        <h1 class="logoText">Chow Now</h1>
      </div>  
    );
  }
}

class Navigation extends Component {
  render () {
    return (
      <div class="navContainer">
        <div class="navHeader">Navigation</div>
        <div class="navButtons">
          <button type="button" class="navButton">Find A Recipe</button>
          <button type="button" class="navButton">Another Button</button>
        </div>
      </div>
    );
  }
}

class Footer extends Component{
  render() {
    return (
      <div class="footer">
        <span class="footerLinks">
          <a href="https://sso.mtu.edu/cas/login?service=https%3A%2F%2Fmtu.instructure.com%2Flogin%2Fcas">
            This goes to canvas login</a>
          <a>This doesn't do anything but I wanted it for spacing</a>
        </span>
      </div>
    );
  }
}

export default App;