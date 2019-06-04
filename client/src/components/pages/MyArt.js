import React, { Component } from "react";
// import API from "../utils/API";
import Container from "../Container";
import SearchForm from "../SearchForm";
import Alert from "../Alert";
import "../styles/MyArt.css"
// import SearchResults from "../components/SearchResults";

class Search extends Component {
  state = {
    Uploads: "",

  };

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <Container style={{ minHeight: "80%" }}>
          <h1 className="text-center">My Artwork</h1>
          <Alert
            type="danger"
            style={{ opacity: this.state.error ? 1 : 0, marginBottom: 10 }}
          >
            {this.state.error}
          </Alert>
          <SearchForm
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
          />
        </Container>
      </div>
    );
  }
}

export default Search;
