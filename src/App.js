import React from 'react'
import { Route, Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  shelfs = [
    {
      name: 'Currently Reading',
      value: 'currentlyReading'
    },
    {
      name: 'Want To Read',
      value: 'wantToRead'
    },
    {
      name: 'Read',
      value: 'read'
    },
  ]

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books
      })
    })
  }

  moveTo = (shelf, book) => {
    this.setState(state => {
      let found = state.books.find(b => b.id === book.id);
      found.shelf = shelf;
      return {
        books: state.books
      }
    })

    BooksAPI.update(book, shelf);
  }

  render() {
    //let shelfs = this.state.books.

    return (
      <div className="app">
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {this.shelfs.map((shelf) => (
                    <BookShelf books={this.state.books.filter(b => b.shelf === shelf.value)}
                               key={shelf.value} title={shelf.name}
                               moveTo={this.moveTo}/>
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )}/>

        <Route exact path='/search' render={() => (
          <Search moveTo={this.moveTo} books={this.state.books}/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
