import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

 class App extends Component {
  constructor(props) {
    super(props);
    this.state={ username:null, isLandingPage:true, isLookupPage:false };
    this.handleLandingClick = this.handleLandingClick.bind(this);
    this.handleLookupClick = this.handleLookupClick.bind(this);   
  }
  componentDidMount() {
    fetch('/api/query')
      .then(res => res.json())
      .then((user) => {
        console.log(user);
        this.setState({ username: user.username });
      });
  }
  handleLandingClick() {
    this.setState({ isLandingPage: true, isLookupPage: false});
  }
  handleLookupClick() {
    this.setState({isLandingPage: false, isLookupPage: true});
  }
  render() {
    const username = this.state.username;
    const isLandingPage = this.state.isLandingPage;
    const isLookupPage = this.state.isLookupPage;
    let form;
    if (isLandingPage) {
      form = <LandingPage onLandClick={this.handleLandingClick} onLookClick={this.handleLookupClick}/>;
    } else if (isLookupPage) {
      form = <LookupPage  onLandClick={this.handleLandingClick} onLookClick={this.handleLookupClick}/>;
    }
    return (
      <div>
        {form}
      </div>
    );
  }
}
class LandingPage extends Component {
  render() {
    return(
      <div>
        <Header/>
        <Navigation onLandClick={this.props.onLandClick} onLookClick={this.props.onLookClick}/>
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
          <button class="navButton" onClick={this.props.onLandClick}>Home</button>
          <button class="navButton" onClick={this.props.onLookClick}>Find A Recipe</button>
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
class LookupPage extends Component {
  render () {
    return (
      <div>
        <h2>This is the lookup page</h2>
        <Navigation onLandClick={this.props.onLandClick} onLookClick={this.props.onLookClick}/> 
      </div>
    );
  }
}
export default App;