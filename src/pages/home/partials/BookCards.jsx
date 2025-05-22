import React, { useEffect, useState } from 'react';

const BookCards = () => {
    const [books, setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

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
                            editionCount: editionCount,
                            description: book.description || 'No description available.'
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

    const handleConfirmBorrow = () => {
        setSelectedBook(null)
        setShowSuccessModal(true)
    }

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
                    <div className="flex items-center justify-between">
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
                        <button
                            onClick={() => setSelectedBook(book)}
                            className="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                        >
                            Borrow
                        </button>
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

            {selectedBook && (
                <div
                    className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modalTitle"
                >
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <div className="flex items-start justify-between">
                            <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">
                                Borrow Book
                            </h2>

                            <button
                                type="button"
                                onClick={() => setSelectedBook(null)}
                                className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-semibold text-gray-900">{selectedBook.title}</h3>
                            <p className="mt-2 text-gray-700">
                                By {selectedBook.authors.join(', ')}
                            </p>
                            <p className="mt-4 text-pretty text-gray-700">
                                Would you like to borrow this book? By confirming, you agree to return it within the standard lending period.
                            </p>
                        </div>

                        <footer className="mt-6 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setSelectedBook(null)}
                                className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleConfirmBorrow}
                                className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                            >
                                Confirm Borrow
                            </button>
                        </footer>
                    </div>
                </div>
            )}

            {showSuccessModal && (
                <div
                    className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="relative p-4 w-full max-w-md">
                        <div className="relative p-4 text-center bg-white rounded-lg shadow">
                            <button
                                type="button"
                                onClick={() => setShowSuccessModal(false)}
                                className="absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center text-gray-400"
                                aria-label="Close"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                            <div className="w-12 h-12 rounded-full bg-green-100 p-2 flex items-center justify-center mx-auto mb-3.5">
                                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <p className="mb-4 text-lg font-semibold text-gray-900">Successfully borrowed book!</p>
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                type="button"
                                className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default BookCards