import React, { useState } from 'react'
import images from '../../../constant/images'
import booksData from '../../../json/booksData.json'

const AdminDashboard = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        author: "",
        category: "",
        rating: "",
        cover: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    cover: reader.result
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const storedBooks = JSON.parse(localStorage.getItem('books') || '[]')
        const existingBooks = [...booksData.books, ...storedBooks]
        const maxId = Math.max(...existingBooks.map(book => book.id), 0)
        
        const newBook = {
            id: maxId + 1,
            title: formData.title,
            description: formData.description,
            author: formData.author,
            category: formData.category,
            rating: Number(formData.rating),
            cover: formData.cover
        }

        storedBooks.push(newBook)
        localStorage.setItem('books', JSON.stringify(storedBooks))

        setFormData({
            title: "",
            description: "",
            author: "",
            category: "",
            rating: "",
            cover: ""
        })

        alert("Book added successfully!")
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src={images.miniLogo} alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Add new book</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">Book Title</label>
                            <div className="mt-2">
                                <input 
                                    type="text" 
                                    name="title" 
                                    id="title" 
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required 
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">Book Description</label>
                            <div className="mt-2">
                                <textarea 
                                    name="description" 
                                    id="description" 
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required 
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="author" className="block text-sm/6 font-medium text-gray-900">Book Author</label>
                            <div className="mt-2">
                                <input 
                                    type="text" 
                                    name="author" 
                                    id="author" 
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    required 
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">Book Category</label>
                            <div className="mt-2">
                                <input 
                                    type="text" 
                                    name="category" 
                                    id="category" 
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required 
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="rating" className="block text-sm/6 font-medium text-gray-900">Book Rating</label>
                            <div className="mt-2">
                                <input 
                                    type="number" 
                                    name="rating" 
                                    id="rating" 
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={formData.rating}
                                    onChange={handleInputChange}
                                    required 
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="cover" className="block text-sm/6 font-medium text-gray-900">Book Cover Image</label>
                            <div className="mt-2">
                                <input 
                                    type="file" 
                                    name="cover" 
                                    id="cover" 
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required 
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus:outline-indigo-600">Add Book</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard