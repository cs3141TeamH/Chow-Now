import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

 class App extends Component {
  constructor(props) {
    super(props);
    this.state={ username:null,
      isLandingPage:true,
      isLookupPage:false,
      isAboutPage:false,};
    this.handleLandingClick = this.handleLandingClick.bind(this);
    this.handleLookupClick = this.handleLookupClick.bind(this);  
    this.handleAboutClick = this.handleAboutClick.bind(this); 
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
    this.setState({ isLandingPage: true, isLookupPage: false, isAboutPage:false});
  }
  handleLookupClick() {
    this.setState({isLandingPage: false, isLookupPage: true, isAboutPage:false});
  }
  handleAboutClick() {
    this.setState({isLandingPage: false, isLookupPage: false, isAboutPage:true});
  }
  render() {
    const username = this.state.username;
    const isLandingPage = this.state.isLandingPage;
    const isLookupPage = this.state.isLookupPage;
    const isAboutPage = this.state.isAboutPage;
    let form;
    if (isLandingPage) {
      form = <LandingPage onLandClick={this.handleLandingClick} onLookClick={this.handleLookupClick} onAboutClick={this.handleAboutClick}/>;
    } else if (isLookupPage) {
      form = <LookupPage  onLandClick={this.handleLandingClick} onLookClick={this.handleLookupClick} onAboutClick={this.handleAboutClick}/>;
    } else if (isAboutPage) {
      form = <AboutPage   onLandClick={this.handleLandingClick} onLookClick={this.handleLookupClick} onAboutClick={this.handleAboutClick}/>;
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
        <Navigation onLandClick={this.props.onLandClick} onLookClick={this.props.onLookClick} onAboutClick={this.props.onAboutClick}/>
        <Footer/>
      </div>
    );
  }
}
class AboutPage extends Component {
  render() {
    return(
      <div class="aboutText"> some text
        <Navigation onLandClick={this.props.onLandClick} onLookClick={this.props.onLookClick} onAboutClick={this.props.onAboutClick}/> 
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
          <button class="navButton" onClick={this.props.onAboutClick}>About</button>
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
        <Header/>
        <Navigation onLandClick={this.props.onLandClick} onLookClick={this.props.onLookClick} onAboutClick={this.props.onAboutClick}/>
        <Footer/>
        <div class="lookupBody">
          <div class="checkboxesRow">
            <h2 class="navHeader">Include ingredients:</h2>
              <span class="checkboxes">
                <Checkboxes title="things1"/>
                <Checkboxes title="things2"/>
              </span>
          </div>
          <div class="checkboxesRow">
            <h2 class="navHeader">Exclude ingredients:</h2>
              <span class="checkboxes">
                <Checkboxes title="things1"/>
                <Checkboxes title="things2"/>
              </span>
          </div>
        </div>
      </div>
    );
  }
}
class Checkboxes extends Component {
  render() {
    return(
    <div>  {this.props.title}
      <form>
        <input type="checkbox" id="thing1" name="thing1" value="food1"/>
        <label for="thing1">Thing1</label> <br/>
        <input type="checkbox" id="thing2" name="thing2" value="food2"/>
        <label for="thing2">Thing2</label>
      </form>
    </div>
    );
  }
}
export default App;