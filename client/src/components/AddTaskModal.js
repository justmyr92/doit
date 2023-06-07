import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useTodoListContext } from '../hooks/useTodoListContext'
import { useAuthContext } from '../hooks/useAuthContext'


const AddTaskModal = ({ handleShowModal }) => {

    const { dispatch } = useTodoListContext()

    const [title, setTitle] = useState('')
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [status, setStatus] = useState(false)

    const { user } = useAuthContext()

    const handleAddTask = async (e) => {
        e.preventDefault()

        if (!user) {
            return
        }

        const task = { title, date, status }
        const response = await fetch('http://localhost:7601/api/todolist', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            console.log(json.error);
        } else {
            setTitle('')
            setDate(new Date().toISOString().slice(0, 10))
            dispatch({ type: 'ADD_TASK', payload: json })
            handleShowModal()
        }
    }

    return (
        <div className="todo__add__modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="todo__add__modal__content bg-white py-6 px-5">
                <div className="todo__add__modal__header flex justify-between items-center">
                    <h1 className="todo__add__modal__title text-2xl font-bold uppercase text-violet-500 my-1">Add task</h1>
                    <button className="todo__add__modal__close text-xl hover:text-violet-600 text-gray-500 hover:text-violet-600 duration-300 py-1.5 px-3.5 flex justify-center items-center" onClick={handleShowModal}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <hr className="todo__add__modal__hr border border-violet-500 my-2" />
                <div className="todo__add__modal__body">
                    <form action="" className="todo__add__modal__form">
                        <div className="todo__add__modal__form__group mb-2 flex flex-col justify-center items-start gap-1">
                            <label htmlFor="title" className="todo__add__modal__form__label text-lg">Title</label>
                            <input type="text" className="todo__add__modal__form__input border border-violet-500 py-1.5 px-3.5 focus:outline-none w-full" placeholder="Title" autoComplete='off' onChange={(e) => setTitle(e.target.value)} value={title} />
                        </div>
                        <div className="todo__add__modal__form__group">
                        </div>
                        <div className="todo__add__modal__form__group mb-2 flex flex-col justify-center items-start gap-1">
                            <label htmlFor="date" className="todo__add__modal__form__label text-lg">Date</label>
                            <input type="date" className="todo__add__modal__form__input border border-violet-500 py-1.5 px-3.5 focus:outline-none w-full" placeholder="Date" autoComplete='off' onChange={(e) => setDate(e.target.value)} value={date} />
                        </div>
                    </form>
                </div>
                <div className="todo__add__modal__footer flex justify-end items-center">
                    <button className="todo__add__modal__add bg-violet-500 hover:bg-violet-600 duration-300 text-white py-1.5 px-3.5" onClick={handleAddTask}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AddTaskModal