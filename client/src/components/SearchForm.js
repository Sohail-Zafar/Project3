import React from "react";
import "./styles/SearchForm.css"
import axios from "axios";



// Cloudinary api url for Sohail's acoount.
const url = "https://api.cloudinary.com/v1_1/dycolznuv/image/upload";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchForm(props) {
  return (
    <form className="search">
      <div className="form-group">
        <label htmlFor="artwork">upload:</label>
        {/* This input allows user to select and upload the artwork (file) to clouldinary. */}
        <input
          type="file"
          className="form-control"
          id="artwork"
          accept="image/png, image/jpeg"
         

          // {/* This on change event sends image selected in the input to Cloudinary */}
        onChange={e => {
          delete axios.defaults.headers.common["x-auth-token"];

          const formData = new FormData();
          formData.append("file", e.target.files[0]);
          formData.append("upload_preset", "hv5mciev");

        // This axios.post sends image directly to Cloudinary with upload presets
        // Clouldinary returns an URL of image stored on the Cloudinary.
          return axios.post(url, formData, {
            headers: {
              'Content-Type':null,
            }
          }).then(r => {
            
            // This axios.post send the returned image URL to the server.js to be stored in database.
            axios.post("/", {url:r.data.url}).then( res => 
              {console.log(res)});
            console.log(r.data.url);
            localStorage.setItem('image', r.data.url);
          });
        
        }}
        />
        <button type="submit" onClick={props.handleFormSubmit} className="btn btn-dark">
          Submit
        </button>
        console.log('submitted')
      </div>
    </form>
  );
}

export default SearchForm;