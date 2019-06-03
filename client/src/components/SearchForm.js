import React from "react";
import "./styles/SearchForm.css"

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchForm(props) {
  return (
    <form className="search">
      <div className="form-group">
        <label htmlFor="artwork">Upload:</label>
        <input
          onChange={props.handleInputChange}
          type="text"
          className="form-control"
          id="artwork"
        />
        <button type="submit" onClick={props.handleFormSubmit} className="btn btn-dark">
          Submit
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
