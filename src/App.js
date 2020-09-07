import React, { Component } from "react";
import classes from "./App.css";

import instagram from "./assets/instagram.png";
import discord from "./assets/discord.png";
import TypeIt from 'typeit-react';

const axios = require("axios");

class App extends Component {
  state = {
    email: "",
    isJoined: false,
    isInvalid: false,
  };

  changeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  onJoin = () => {
    axios
      .post("https://kickbro-landing.herokuapp.com/email", {
        email: this.state.email,
      })
      .then( (response) => {
        this.setState({
          isJoined: true,
          isInvalid: false,
        });
      })
      .catch( (error) => {
          this.setState({
            isJoined: false,
            isInvalid: true
          });
      });
  };

  render() {
    let  successMessage = (<div className={classes.notification}>You successfully signed up. Stay tuned there are news to come.</div>);
    let errorMessage = (<div className={classes.error}>Invalid email address</div>);

    return (
      <div className={classes.content}>
        <div className={classes.Landing}></div>

        <div className={classes.instagram}>
        <a href="http://instagram.com/kickbro_worldwide">@kickbro <img src={instagram} alt="instagram"/></a>
        </div>
        <div className={classes.font}>
          If you asked yourself “How many steps I made  with these <TypeIt className={classes.nike} options={{ loop: true, speed: 200 }}>Nike's</TypeIt>
          ”<br></br> then this app is for you. Join our beta.
        </div>
        {this.state.isInvalid ? 
          errorMessage : null}
        {!this.state.isJoined ?
          <div className={classes.inputGroup}>
            
              <input
                className={classes.input}
                type="text"
                placeholder="enter your email here"
                value={this.state.email}
                onChange={this.changeEmail}
              />
              <button className={classes.button} onClick={this.onJoin}>
                Join beta
              </button>
              
             
          </div> : successMessage}
        <div className={classes.bottom}>
          <div className={classes.discord}>
            <img src={discord} alt="discord"/><a href="https://discord.gg/PfPgUwg"> Join our discord comunity</a>
          </div>
          <div className={classes.imageGroup}>
            <div className={classes.phoneCase}></div>
            <div className={classes.phoneScreen}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
