import React, { useState, useEffect } from 'react';
import booksData from '../../../json/booksData.json';

const MainSection = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [books, setBooks] = useState([])

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('books') || '[]')
        const allBooks = [...booksData.books, ...storedBooks]
        setBooks(allBooks)
    }, [])

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="main-container py-16 px-6">
                <div className="main-title max-w-[85rem] mx-auto">
                    <h1 className="block font-bold text-gray-800 text-4xl md:text-2xl lg:text-5xl pb-2">Browse Books</h1>
                    <p className="text-lg text-gray-600">Discover a wide range of books—from timeless classics to the latest releases. Whether you're into fiction, self-help, history, or science, there's something for every reader.</p>
                </div>

                <div className="max-w-[85rem] mx-auto mt-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by title, author, or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4F46E5] focus:ring-[#4F46E5] focus:ring-1 outline-none transition-all duration-200"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="main-cards max-w-[85rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="book-card bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group">
                            <div className="aspect-[2/3] relative overflow-hidden rounded-t-xl">
                                <img
                                    src={book.cover}
                                    alt={book.title}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <p className="absolute bottom-4 left-4 right-4 text-white text-sm line-clamp-3">{book.description}</p>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{book.title}</h3>
                                        <p className="text-sm text-gray-600">{book.author}</p>
                                    </div>
                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        {book.category}
                                    </span>
                                </div>
                                <div className="mt-4 flex items-center">
                                    {[...Array(5)].map((_, index) => (
                                        <svg
                                            key={index}
                                            className={`h-4 w-4 ${index < Math.floor(book.rating)
                                                ? 'text-yellow-400'
                                                : 'text-gray-200'
                                                }`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ))}
                                    <span className="ml-1 text-sm text-gray-500">{book.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MainSection;