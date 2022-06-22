import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import UserProfile from "./components/UserProfile/UserProfile";
import NumberOfFaces from "./components/NumberOfFaces/NumberOfFacess";

const particlesOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    numberOfFaces: "",
  },
};

class App extends Component {
  constructor() {
    super();

    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    this.setState({ numberOfFaces: data.outputs[0].data.regions.length });
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, ":", height);
    

    let mapface = [];
    const faces = data.outputs[0].data.regions;
    faces.map((face) => {
      const clarifaiFace = face.region_info.bounding_box;
      mapface.push({
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      });
    });
    return mapface;
  };

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://polar-wave-90283.herokuapp.com/imageUrl", {
      method: "post",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://polar-wave-90283.herokuapp.com/image", {
            method: "put",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }

        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <div className="App">
                <Particles className="particles" params={particlesOptions} />
                <Navigation
                  isSignedIn={isSignedIn}
                  onRouteChange={this.onRouteChange}
                  name={this.state.user.name}
                />
                {route === "home" ? (
                  <div>
                    <Logo />
                    <Rank
                      name={this.state.user.name}
                      entries={this.state.user.entries}
                    />
                    <ImageLinkForm
                      onInputChange={this.onInputChange}
                      onButtonSubmit={this.onButtonSubmit}
                    />
                    <FaceRecognition
                      boxes={boxes}
                      imageUrl={imageUrl}
                    />
                    <NumberOfFaces noOfFaces={this.state.numberOfFaces}/>
                  </div>
                ) : route === "signin" ? (
                  <Signin
                    loadUser={this.loadUser}
                    onRouteChange={this.onRouteChange}
                  />
                ) : (
                  <Register
                    loadUser={this.loadUser}
                    onRouteChange={this.onRouteChange}
                  />
                )}
              </div>
            </Route>

            <Route path="/profile">
              <UserProfile
                isSignedIn={this.state.isSignedIn}
                onRouteChange={this.onRouteChange}
                name={this.state.user.name}
                id={this.state.user.id}
                email={this.state.user.email}
                entries={this.state.user.entries}
                joined={this.state.user.joined}
              />
            </Route>
          </Switch>
        </div>
      </Router>
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
