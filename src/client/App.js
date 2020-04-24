import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import logo from'./logo_oval_purple.png';

 class App extends Component {
  constructor(props) {
    super(props);
    this.state={ 
      recipes:[],
      ingredients:[], 
      isLandingPage:true,
      isLookupPage:false,
      isAboutPage:false,
      isRecipePage:false,  };
    this.handleLandingClick = this.handleLandingClick.bind(this);
    this.handleLookupClick = this.handleLookupClick.bind(this);  
    this.handleAboutClick = this.handleAboutClick.bind(this);
    this.handleRecipeClick = this.handleRecipeClick.bind(this);
  }
  componentDidMount() {
    fetch('/api/recipes')
      .then(res => res.json())
      .then((resp) => {
          this.setState({ 
            recipes: Object.keys(resp.result).map(recipe => ({
                name: resp.result[recipe].name,
                directions: resp.result[recipe].directions,
            }))
          });
        console.log('Rresult: ', resp.result[0].name); 
        console.log('RresultAll: ', resp.result);
      });

      fetch('/api/ingredients')
      .then(res => res.json())
      .then((ingr) => {
          this.setState({ 
            ingredients: Object.keys(ingr.result).map(ingredient => ({
                name: ingr.result[ingredient].name,
                type: ingr.result[ingredient].type,
            }))
          });
        console.log('Iresult: ', ingr.result[0].name); 
        console.log('IresultAll: ', ingr.result);
      });

  }


  handleLandingClick() {
    this.setState({ isLandingPage: true, isLookupPage: false, isAboutPage:false, isRecipePage:false});
  }
  handleLookupClick() {
    this.setState({isLandingPage: false, isLookupPage: true, isAboutPage:false, isRecipePage:false});
  }
  handleAboutClick() {
    this.setState({isLandingPage: false, isLookupPage: false, isAboutPage:true, isRecipePage:false});
  }
  handleRecipeClick() {
    this.setState({isLandingPage: false, isLookupPage: false, isAboutPage:false, isRecipePage:true});
  }
  render() {
    const recipes = this.state.recipes;
    const ingredients = this.state.ingredients;

    if (!recipes || !(recipes.length>0)) { //block until recipes exist
      return <div/>
    }
    if (!ingredients || !(ingredients.length>0)) {
      return <div/>
    }

    console.log('sRVal: ', Object.values(recipes));
    console.log('sRAll: ', recipes[0].name); //so this doesn't crash

    console.log('sIVal: ', Object.values(ingredients));
    console.log('sIAll: ', ingredients[0].name);


    const isLandingPage = this.state.isLandingPage;
    const isLookupPage = this.state.isLookupPage;
    const isAboutPage = this.state.isAboutPage;
    const isRecipePage = this.state.isRecipePage;
    let form;
    if (isLandingPage) {
      form = <LandingPage onLandClick={this.handleLandingClick} onLookClick={this.handleLookupClick} onAboutClick={this.handleAboutClick}/>;
    } else if (isLookupPage) {
      form = <LookupPage  onLandClick={this.handleLandingClick} onLookClick={this.handleLookupClick} onAboutClick={this.handleAboutClick} onRecipeClick={this.handleRecipeClick} ingrs={Object.values(ingredients)}/>;
    } else if (isAboutPage) {
      form = <AboutPage   onLandClick={this.handleLandingClick} onLookClick={this.handleLookupClick} onAboutClick={this.handleAboutClick}/>;
    } else if (isRecipePage) {
      form = <RecipePage  onLandClick={this.handleLandingClick} onLookClick={this.handleLookupClick} onAboutClick={this.handleAboutClick} theRecipes={Object.values(recipes)} ingrs={Object.values(ingredients)}/>;
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
        <div className="headerSpacer"/>
        <Navigation onLandClick={this.props.onLandClick} onLookClick={this.props.onLookClick} onAboutClick={this.props.onAboutClick}/>
        <Footer/>
      </div>
    );
  }
}
class AboutPage extends Component {
  render() {
    return(
      <div className="logoImage"><img src={logo} alt="this is logo image" />
        <div className="aboutText">
        This web site was created to make finding a recipe to make quick and easy.  
        <span><br /></span>
        <span><br />Created by Team Chow Now: Samantha Richardson, Jonathan Lehto, Austin Braley, Jesse Fischer, Aaron Kettelhut </span>
        <span><br /></span>
        <span><br /><span>If you would like to support the team, send money to paypal.me/itakesingles</span></span>
        <Navigation onLandClick={this.props.onLandClick} onLookClick={this.props.onLookClick} onAboutClick={this.props.onAboutClick}/> 
        </div>
      </div>
   );
  }
}
class Header extends Component {
  render() {
    return (
      <div className = "headContainer">
        {/* <img src={ReactImage} alt="headerImage" > </img> */}
        <h1 className="logoText">Chow Now</h1>
      </div>  
    );
  }
}
class Navigation extends Component {
  render () {
    return (
      <div className="navContainer">
        <div className="navHeader">Navigation</div>
        <div className="navButtons">
          <button className="navButton" onClick={this.props.onLandClick}>Home</button>
          <button className="navButton" onClick={this.props.onLookClick}>Find A Recipe</button>
          <button className="navButton" onClick={this.props.onAboutClick}>About</button>
        </div>
      </div>
    );
  }
}
class Footer extends Component{
  render() {
    return (
      <div className="footer">
        <span className="footerLinks">
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
    var checkboxColumns = [];
     //populate array of all checkbox column+titles
    checkboxColumns = this.props.ingrs.map(iter => (
      <Checkboxes title={iter.type} key={iter.type} ingrs={this.props.ingrs}/>
    ));
    

    return (
      <div>
        <Header/>
        <Navigation onLandClick={this.props.onLandClick} onLookClick={this.props.onLookClick} onAboutClick={this.props.onAboutClick} onRecipeClick={this.props.onRecipeClick}/>
        <Footer/>
        <div className="lookupBody">
          <div className="checkboxesRow">
            <h2 className="navHeader">Include ingredients:</h2>
              <span className="checkboxes">
                {checkboxColumns}
              </span>
          </div>
          <div className="checkboxesRow">
            <h2 className="navHeader">Exclude ingredients:</h2>
              <span className="checkboxes">
                {checkboxColumns}
              </span>
          </div>
          <button onClick={this.props.onRecipeClick}>Get recipe</button>  {/*~~~~~~~~~~~~~~~~~~~~~~~JON I THINK THIS MIGHT BE FORM SUBMIT BUTTON~~~~~~~~~~~~~~~~~~*/}
        </div>
      </div>
    );
  }
}

class Checkboxes extends Component {
  render() {
    var ingrNames=[];
    for (var i=0; i<this.props.ingrs.length; i++) {
      if (this.props.ingrs[i].type == this.props.title){ //this should probably be done as get_ingredients_from_type
        ingrNames.push(
          <div key={this.props.ingrs[i].name}>
            <input type="checkbox" id={this.props.ingrs[i].name} name={this.props.ingrs[i].name} value={this.props.ingrs[i].name}/>
            <label htmlFor={this.props.ingrs[i].name}>{this.props.ingrs[i].name}</label>
          </div>
        );
      }
    }

    return(
    <div>  {this.props.title}
      <form action = "api/submitRecipe" method = "post">
        {ingrNames}
        <input type="submit" />
      </form>
    </div>
    );
  }
}
class RecipePage extends Component {
  
  componentDidMount() {
    fetch('/api/recipes')
      .then(results => {
        return results.json();
      })
      .then((data) => {
          let theRecipes = data.results.map((recipe) =>{
            return(
              <div key = {recipe.results}>
                <h1 re = {recipe.recipes.name} />
              </div>
            )
          })
          this.setState({theRecipes: theRecipes});
          console.log("state", this.state.theRecipes);
        })

        fetch('/api/ingredients')
      .then(results => {
        return results.json();
      })
      .then((data) => {
          let ingrs = data.results.map((ingredient) =>{
            return(
              <div key = {ingredient.results}>
                <h1 re = {ingredient.ingredients.name} />
              </div>
            )
          })
          this.setState({ingrs: ingrs});
          console.log("state", this.state.ingrs);
        })
    }

  render() {
  
    var recipeName = this.props.theRecipes[0].name;
    /*var recipeIngredients = this.props.theRecipes[0].ingredients;*/
    var recipeDirections = this.props.theRecipes[0].directions;
    var recipeIngredients = this.props.ingrs[0].name;

    return(
      <div className="recipePageHeader">
      <div className="recipePageName">{recipeName}</div>
      <div className="recipeIngredients"><ul>{ recipeIngredients }</ul></div>
      <div className="recipeDirections">Directions</div>
      <div className="recipePageContent">{recipeDirections}</div>
        <Navigation onLandClick={this.props.onLandClick} onLookClick={this.props.onLookClick} onAboutClick={this.props.onAboutClick}/> 
      </div>
      
    );
  }
}
export default App;
