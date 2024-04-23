import logo from './logo.svg';
import './App.css';
import Part from "./components/Particles/Part"
import 'tachyons';
import {Component} from 'react';
import SignIn from './components/Login/SignIn';
import Register from './components/Register/Register';
import Browser from './components/Browser/Browser';
import Navigation from './components/Navigation/Navigation';
import AddingAdd from './components/AddingAdd/AddingAdd';
import UserAdds from './components/UsersAdds/UsersAdds';
class App extends Component{
  constructor() {
    super();
    this.state={
      route: "browser",
      singedIn: false,
      car: {},
      det: false,
      filenames: ["image-1702376985195.png", "image-1702377640733.png"],
      user: {
        id: 0,
        name:"",
        surname:"",
        email:"",
        phone_number: 0,
        miasto:""
      }
    }
  }

  setUser = (newUser) => {
    this.setState({user: newUser});
  }

  changeRoute = (newRoute) => {
    this.setState({ route: newRoute });
  }

  setOneCar = (newCar) =>{
    this.setState({car: newCar});
  }
 
  changeSignedIn = (bool) => {
   this.setState({singedIn: bool});
  }

  changeDet = () => {
    this.setState({det: !this.state.det});
  }

  
  render() {
    return (
      <div className="App">
        <Part />
        {this.state.route === "signin" ? (
          <SignIn changeRoute={this.changeRoute} changeSignedIn={this.changeSignedIn} changeUserData={this.setUser} />
        ) : this.state.route === "register" ? (
          <Register changeRoute={this.changeRoute} changeSignedIn={this.changeSignedIn} />
        ) : this.state.route === "browser" ?
        (
          <div>
            {<Navigation changeRoute={this.changeRoute} route={this.state.route} changeSignedIn={this.changeSignedIn} isSignedIn={this.state.singedIn} det={this.state.det}/> }
            <Browser user={this.state.user} setOneCar={this.setOneCar} changeRoute={this.changeRoute} changeDet={this.changeDet} isSignedIn={this.state.singedIn}/>
            
          </div>
        ) : this.state.route === "addingAdd" ?
        (
          <div>
            {<Navigation changeRoute={this.changeRoute} route={this.state.route} changeSignedIn={this.changeSignedIn} isSignedIn={this.state.singedIn} det={this.state.det}/> }
            <AddingAdd id={this.state.user.id} changeRoute={this.changeRoute}/>
          </div>
        ) : this.state.route === "yourAdds" ?
        (
          <div>
            {<Navigation changeRoute={this.changeRoute} route={this.state.route} changeSignedIn={this.changeSignedIn} isSignedIn={this.state.singedIn} det={this.state.det}/> }
            <UserAdds id={this.state.user.id}/>
          </div>
        ) :
        (
          <div>
            {<Navigation changeRoute={this.changeRoute} route={this.state.route} isSignedIn={this.state.singedIn} det={this.state.det}/> }
            <h1>404</h1>
          </div>
        )}
      </div>
    );
  }
}

export default App;
