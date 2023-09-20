import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    query: '',
  };

  handleOnSubmit = (e) => { 
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({query: ''});
  }

  handleOnChange = (e) => { 
    this.setState({query: e.target.value.toLowerCase().trim()});
  }

    render() {
    
    return (
     <SearchFormStyled onSubmit={this.handleOnSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          onChange={this.handleOnChange}
          value={this.state.query}
          required
          autoFocus
        />
    </SearchFormStyled>
    );
  }
}