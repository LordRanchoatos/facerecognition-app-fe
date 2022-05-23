import React, { Component } from "react";
import "./App.css";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const particlesOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initialState = {
  input: '',
  imageUrl: '',
  box: {}, 
  route: "",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    numberOfFaces: ""
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = initialState;
  }


  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    this.setState({numberOfFaces: data.outputs[0].data.regions.length})
    // console.log("datatolog: ", data.outputs[0].data.regions.length)
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log("image", width + ":" + height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),             
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box})
  }

  onInputChange = event => {
    this.setState({input: event.target.value});
  }

  onRouteChange = (route) => {
    if (route === "signout"){
      this.setState(initialState)
    } else if (route === "home"){
      this.setState({isSignedIn: true})
    }
    this.setState ({route: route});
  }
  

  onButtonSubmit = () => {
    console.log(this.state.user)
    this.setState({imageUrl: this.state.input});  
    fetch("https://polar-wave-90283.herokuapp.com/imageUrl", {
      method: "post",
      headers: {"content-Type": "application/json"},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://polar-wave-90283.herokuapp.com/image", {
            method: "put",
            headers: {"content-Type": "application/json"},
            body: JSON.stringify({
              id: this.state.user.id,
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
        }
      
      this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  };



  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === "home"? 
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
                <FaceRecognition box={box} imageUrl={imageUrl} noOfFaces={this.state.numberOfFaces}/>
          </div>:
            (route === "signin"?
              <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
          
        }
      </div>
    );
  }
}
export default App;





// app.models
//       .predict(
//         {
//           id: "d02b4508df58432fbb84e800597b8959",
//           version: "34ce21a40cc24b6b96ffee54aabff139",
//         },
//         //Clarifai.FACE_DETECT_MODEL,

//         // URL
//         this.state.input
//       )
//       .then(
//         function(response) {
//           // do something with response
//           console.log(response);
//         },
//         function(err) {
//           // there was an error 
//         }
//       );


// topRow: (clarifaiFace.top_row * height),
//       leftCol: (clarifaiFace.left_col * width),
//       rightCol: (width - clarifaiFace.right_col * width),
//       bottomRow: (height - height * clarifaiFace.bottom_row)     
