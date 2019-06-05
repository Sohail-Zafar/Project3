import React, { Component } from "react";
//import Input from "../Input";
import "../styles/CreateProfile.css";

class SignUpForm extends Component {
  // state = {
  //   input: ""
  // };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  // };

  render() {
    return (
        <div class="card-body">
          <form className="search">
            <h1 className="text-center">Sign-Up</h1>
            <div className="form-group">
              <label htmlFor="artwork">First Name:</label>
              <input style={{ width: "50px" }} />
              <label htmlFor="artwork">Last Name:</label>
              <input />
              <label htmlFor="artwork">Email:</label>
              <input />
              <label htmlFor="artwork">Password:</label>
              <input />
              <label htmlFor="artwork">Favorite Art Mediums:</label>
              <input />
              <label htmlFor="artwork">Bio:</label>
              <input />

              <div class="col-md-12 text-center">
              <button
                type="submit"
                onClick={this.handleFormSubmit}
                className="btn btn-dark"
              >
                Submit
              </button>
              </div>
            </div>
          </form>
        </div>
    );
  }
}

export default SignUpForm ;