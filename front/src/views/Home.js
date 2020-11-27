import React, { Component } from "react";
import { Grid, Image } from 'semantic-ui-react'
import Particles from 'react-particles-js';
import logo from '../assets/logo.png'

class Home extends Component {

    state = {
        particles:
        {
            "particles": {
                "number": {
                    "value": 100
                },
                "size": {
                    "value": 2
                }
            },
            "interactivity": {
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "attract"
                    }
                }
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Particles style={{
                    background: '#111117',
                    position: 'absolute'
                }}
                    params={this.state.particles} />
                <Image style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)',
                }} src={logo} size='large' />
            </React.Fragment>
        )
    }
}
// background: #111117;
//   height: 100vh;
//   width: 100%;
//   position: absolute;
export default Home;
