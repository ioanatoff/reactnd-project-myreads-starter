import React, { Component } from 'react';

class Book extends Component {

  render() {

    const { book, moveTo } = this.props;
    const options = [
      {
        value: 'currentlyReading',
        label: 'Currently Reading'
      },
      {
        value: 'wantToRead',
        label: 'Want to Read'
      },
      {
        value: 'read',
        label: 'Read'
      },
      {
        value: 'none',
        label: 'None'
      }
    ]

    return (
      <div className="book">
        <div className="book-top">
          {book.imageLinks && book.imageLinks.smallThumbnail && (
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
          )}
          <div className="book-shelf-changer">
              <select value={book.shelf || 'none'} onChange={(event) => moveTo(event.target.value, book)}>
                <option disabled>Move to...</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && (
          <div className="book-authors">
            {book.authors.map((author, index) => (
              <span key={index}>
                {index > 0?', ':''}{author}
              </span>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default Book
