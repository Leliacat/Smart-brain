import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';


const app = new Clarifai.App({
  apiKey: 'e20a047f23b64a2ba7a82198560ddf5f'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      }
    },
    color: {
      value:  '#FFFFFF'
    },
    size: {
        value: 1.6
    },
    line_linked: {
      color: '#a020f0',
      opacity: .35
    },
    move: {
      enable: true,
      speed: 8
    }
  }
};

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: 'false',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(console.log)
  // }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    } })
  }

  calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onImageSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input
    )
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) =>{
    if (route === 'signin' || route === 'register'){
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn: 'true'})
    }
    this.setState({route: route});
  }

  render() {
    const { imageUrl, route, box } = this.state;
    return (
      <div className="App">

        <Particles className= 'particles'
              params={particlesOptions}
        />
        <Logo />

        {route === 'home' 
        ? <div>
              <Navigation
                onRouteChange={this.onRouteChange}
              />
              <Rank
                name={this.state.user.name} 
                entries={this.state.user.entries}
              />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onImageSubmit={this.onImageSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
           </div>
         : (
          route === 'signin'
            ? <SignIn 
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
              />
            : <Register 
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          )
        }

      </div>
    );
  }
}

export default App;


 
