import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book';
import * as BooksAPI from './BooksAPI'

class Search extends Component {

  state = {
    results: []
  }

  updateQuery = (query) => {
    BooksAPI.search(query.trim()).then((results) => {
      if(query) {
        this.setState({ results: results.error? [] : results})
      } else {
        this.setState({ results: [] })
      }
    })
  }

  render() {

    console.log(this.props.books);
    console.log()
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input value={this.state.query} type="text" placeholder="Search by title or author"
                   onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map((result) => {
              const book = this.props.books.find(b => b.id === result.id);
              return (
                <li key={result.id}>
                  <Book book={{...result, shelf: book? book.shelf: 'none'}} moveTo={this.props.moveTo}/>
                </li>
              )}
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
