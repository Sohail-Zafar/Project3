import React from 'react';

class SearchBar extends React.Component {
  state = { term: ''}

  onInputChange = (event) => {
      this.setState ({ term: event.target.value})
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    //  make sure we do callback 
    this.props.onFormSubmit(this.state.term);
  };

  render () {
    return  (
      <div className='search-bar ui segment'>
        <form onSubmit={this.onFormSubmit} className='ui form'>
          <div className='field'>
            <label>Video Search</label>
            <select className='ui search dropdown' value={this.state.term} onChange={this.onInputChange} >

            <option value=''>Select a medium to learn about</option>
            <option value='tips and tricks painting with water colors'>Water colors</option>
            <option value='tips and tricks painting with oil pastels'>Oil Pastels</option>
            <option value='tips and tricks painting with chalk pastels'>Chalk Pastels</option>
            <option value='tips and tricks painting with acrylic painting'>Acrylic Painting</option>
            <option value='tips and tricks painting with oil pastels'>Oil Pastels</option>
            <option value='tips and tricks painting with Paper Art/ Engineering'>Paper Art/ Engineering</option>
            <option value='tips and tricks painting with Colored Pencil Drawings'>Colored Pencil Drawings</option>
            <option value='tips and tricks painting with Spray Painting'>Spray Painting</option>
            <option value='tips and tricks painting with Oil Painting'>Oil Painting</option>
            </select>

            {/* <input 
            type='text' 
            value={this.state.term}
             
            /> */}
          </div>
        </form>
      </div>
    )
  }
}

export default SearchBar;