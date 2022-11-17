import React, { useEffect, useState } from 'react'
import Collection from './components/Collection'
import './index.scss'

const categories = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [collections, setCollections] = useState()
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    setIsLoading(true)

    const category = selectedCategory ? `category=${selectedCategory}` : ''

    fetch(
      `https://6374c21648dfab73a4e7e504.mockapi.io/photoCollections?page=${page}&limit=3&${category}`
    )
      .then((responce) => responce.json())
      .then((json) => setCollections(json))
      .catch((error) => {
        console.error('Error:', error)
        alert('Произошла ошибка при получении данных')
      })
      .finally(() => setIsLoading(false))
  }, [selectedCategory, page])

  const inputOnChangeHandler = (value) => {
    setSearchValue(value)
  }

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((category, index) => (
            <li
              onClick={() => setSelectedCategory(index)}
              className={selectedCategory === index ? 'active' : ''}
              key={index}
            >
              {category.name}
            </li>
          ))}
        </ul>
        <input
          onChange={(event) => inputOnChangeHandler(event.target.value)}
          value={searchValue}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading
          ? 'Идет загрузка...'
          : collections
              ?.filter((collection) =>
                collection.name
                  .toLowerCase()
                  .includes(searchValue.toLocaleLowerCase())
              )
              .map((collection, index) => (
                <Collection
                  key={index}
                  name={collection.name}
                  images={collection.photos}
                />
              ))}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((object, index) => (
          <li
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
