import React, { Component } from "react";
// import logo from "../img/aa_logo_blu-02.png"
import "./styles/LogInButtons.css";
import NavBar from "./NavBar";

class LogInButtons extends Component {
  constructor() {
    super();
    this.state = {
      showButtons: true,
      showNavBar: false
    };
  }

  hideButtons() {
    this.setState({
      showButtons: false
    });
  }

  showNavBar() {
    this.setState({
      showNavBar: true
    });
  }

  render() {
    return (
      <div className="container">
        {this.state.showButtons ? this.hideButtons(
          <>
            {/* <div className="Logo">
              <img
                className="logoImg"
                src={logo}
                alt=""
                style={{ height: "50px" }}
              />
              <p className="aa" style={{ height: "40px" }}>{" "}<span>A</span>rtists <span>A</span>ccumulated
              </p>
            </div> */}

            <div>
              <button onClick={() => this.hideButtons() && this.showNavBar()}>
                Log In
              </button>
              <p> | </p>
              <button>Sign up</button>
            </div>
          </>
        ) : null}

        <NavBar showNavBar={this.showNavBar} />
      </div>
    );
  }
}

export default LogInButtons;
