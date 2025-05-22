import React, { useEffect, useState } from 'react';

const BookCards = () => {
    const [books, setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getBooks = async () => {
            try {
                let query
                if (searchTerm.trim()) {
                    query = searchTerm.trim()
                } else {
                    query = 'programming'
                }
                
                const response = await fetch('https://openlibrary.org/search.json?q=programming&limit=100')
                const data = await response.json()
                
                if (data.docs) {
                    const formattedBooks = data.docs.map(book => {
                        let coverUrl
                        if (book.cover_i) {
                            coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                        } else {
                            coverUrl = '/placeholder-book.png'
                        }

                        let authors
                        if (book.author_name) {
                            authors = book.author_name
                        } else {
                            authors = ['Unknown Author']
                        }

                        let editionCount
                        if (book.edition_count) {
                            editionCount = book.edition_count
                        } else {
                            editionCount = 0
                        }

                        return {
                            id: book.key,
                            title: book.title,
                            authors: authors,
                            publishYear: book.first_publish_year,
                            coverUrl: coverUrl,
                            editionCount: editionCount
                        }
                    })
                    setBooks(formattedBooks)
                }
            } catch (error) {
                console.error('Error fetching books:', error)
            }
        }

        getBooks()
    }, [searchTerm])

    const renderContent = () => {
        return books.map(book => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                        e.target.onerror = null
                        e.target.src = '/placeholder-book.png'
                    }}
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{book.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                        By {book.authors.join(', ')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {book.publishYear && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                Published {book.publishYear}
                            </span>
                        )}
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            {book.editionCount} {getEditionText(book.editionCount)}
                        </span>
                    </div>
                </div>
            </div>
        ))
    }

    const getEditionText = (count) => {
        if (count === 1) {
            return 'edition'
        } else {
            return 'editions'
        }
    }

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Browse Books</h2>
                </div>
                
                <div className="mb-8">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search by title, author, or category..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4F46E5] focus:ring-[#4F46E5] focus:ring-1 outline-none transition-all duration-200"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {renderContent()}
                </div>
            </div>
        </section>
    )
}

export default BookCards