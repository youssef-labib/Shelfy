import React, { useEffect, useState } from 'react';

const BookCards = () => {
    const [books, setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const getBooks = async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BOOKS_API_URL}?q=programming&maxResults=40`)
            let data = await response.json()
            
            if (data.items) {
                const formattedBooks = data.items.map(item => ({
                    id: item.id,
                    title: item.volumeInfo.title,
                    authors: item.volumeInfo.authors || ['Unknown Author'],
                    description: item.volumeInfo.description || 'No description available',
                    categories: item.volumeInfo.categories || ['Uncategorized'],
                    imageUrl: item.volumeInfo.imageLinks?.thumbnail || '/placeholder-book.png'
                }))
                setBooks(formattedBooks)
            }
        }

        getBooks()
    }, [])

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        book.categories.some(category => category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">Browse Books</h2>
                
                <div className="mb-8">
                    <div className="relative">
                        <input type="text" placeholder="Search by title, author, or category..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4F46E5] focus:ring-[#4F46E5] focus:ring-1 outline-none transition-all duration-200"/>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredBooks.map(book => (
                        <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                            <img
                                src={book.imageUrl}
                                alt={book.title}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{book.title}</h3>
                                <p className="text-gray-600 text-sm mb-2">
                                    By {book.authors.join(', ')}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {book.categories.map((category, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BookCards;