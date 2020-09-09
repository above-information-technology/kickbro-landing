import React, { Component } from "react";
import classes from "./App.css";

import instagram from "./assets/instagram.svg";
import discord from "./assets/discord.svg";
// import TypeIt from 'typeit-react';
import TypeIt from "typeit";

const axios = require("axios");

class App extends Component {
  state = {
    email: "",
    isJoined: false,
    isInvalid: false,
    isAlreadyJoined: false
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
      .then( () => {
        this.setState({
          isJoined: true,
          isInvalid: false,
          isAlreadyJoined: false
        });
      })
      .catch( (e) => {
          if (e.message.includes('status code 400')) {
            this.setState({
              isJoined: false,
              isInvalid: true,
              isAlreadyJoined: false
            });
          }
          if (e.message.includes('status code 404')) {
            this.setState({
              isJoined: false,
              isInvalid: false,
              isAlreadyJoined: true
            });
          }

      });
  };

  componentDidMount () {
    new TypeIt(this.el, {
      speed: 150,
      loop: true,
    })
    .type("Nike's")
    .pause(1500)
    .delete()
    .pause(500)
    .type("Adidas")
    .pause(1500)
    .delete()
    .pause(500)
    .type("New Balance")
    .pause(1500)
    .delete()
    .pause(500)
    .type("Air Jordan")
    .pause(1500)
    .delete()
    .pause(500)
    .type("Puma")
    .pause(1500)
    .delete()
    .go();
  }

  render() {
    let  successMessage = (<div className={classes.notification}>You successfully signed up. Stay tuned, there are news to come.</div>);
    let errorMessage = (<div className={classes.error}>Wrong email address</div>);
    let alreadyJoinedMessage = (<div className={classes.notification}>You've already joined our beta. Stay tuned, there are news to come.</div>);

    return (
      <div className={classes.content}>
        <div className={classes.Landing}/>

        <div className={classes.instagram}>
          <a href="http://instagram.com/kickbro_workdwide">@kickbro <img src={instagram} alt="instagram"/></a>
        </div>
        <div className={classes.font}>
            {`If you asked yourself:\n“How many steps I made \nwith these `}
            <span className={classes.nike} ref={(el) => { this.el = el; }}></span>
            

            {`?”\nThen this app is for you. \nJoin our beta.`}
        </div>

        {!this.state.isJoined ?
          this.state.isAlreadyJoined ? 
            alreadyJoinedMessage
            :
            (
              <div className={classes.inputGroup}>
                  <input
                    className={classes.input}
                    type="text"
                    placeholder="enter your email here"
                    value={this.state.email}
                    onChange={this.changeEmail}
                    isinvalid={this.state.isInvalid ? "true" : "false"}
                  />
                  {this.state.isInvalid ? errorMessage : null}
                  <button className={classes.button} onClick={this.onJoin}>
                    Join beta
                  </button>
              </div>
            ) : successMessage }
        <div className={classes.bottom}>
          <div className={classes.discord}>
            <img src={discord} alt="discord"/><a href="https://discord.gg/PfPgUwg"> Join our discord community</a>
          </div>

          <div className={classes.imageGroup}>
            <div className={classes.phoneCase}/>
            <div className={classes.phoneScreen}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
