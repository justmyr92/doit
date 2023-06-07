import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons';
import AddTaskModal from './AddTaskModal';
import TodoItems from './TodoItems';
import { useLogout } from '../hooks/useLogout';


const Todolist = ({ tasks, searchText, setSearchText }) => {

    const { logout } = useLogout()

    const handleLogout = () => {
        logout()
    }

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        if (showModal) {
            setShowModal(false);
        } else {
            setShowModal(true);
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
    }

    const [editTask, setEditTask] = useState("");



    return (
        <>
            <section className="todo__section h-screen bg-slate-200">
                <div className="todo__container container mx-auto h-full flex justify-center items-center">
                    <div className="todo__content border border-violet-500 bg-white py-6 px-5">
                        <div className="todo__header flex justify-between items-center">
                            <h1 className="todo__title text-4xl font-bold uppercase text-violet-500 my-1">todolist</h1>
                            <button className="todo__logout bg-violet-500 hover:bg-violet-600 duration-300 text-white py-1.5 px-3.5" onClick={handleLogout}>Logout</button>
                        </div>
                        <hr className="todo__hr border border-violet-500 my-2" />
                        <div className="todo__body">
                            <div className="todo__control flex justify-between items-center">
                                <button className="todo__add bg-violet-500 hover:bg-violet-600 duration-300 text-white py-1.5 px-3.5 flex justify-center items-center" onClick={handleShowModal}>
                                    <FontAwesomeIcon icon={faPlusSquare} />
                                    <span className="ml-2">Add task</span>
                                </button>
                                <div className="todo__search flex">
                                    <input type="text" className="todo__input border border-violet-500 py-1.5 px-3.5 focus:outline-none" placeholder="Search" onChange={handleSearch} id="searchInput" value={searchText} />
                                    <span className="todo__icon bg-violet-500 flex justify-center items-center text-white py-1.5 px-3.5">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </span>
                                </div>
                            </div>
                            <div className="todo__list mt-4 border-b border-violet-500">

                                {tasks && tasks.map((task) => (
                                    <TodoItems task={task} setEditTask={setEditTask} key={task._id} />
                                ))}
                            </div>

                            {editTask && <div className="todo__edit bg-red-50 border-red-500 text-red-500 py-3 text-center">{editTask}</div>}

                        </div>
                    </div>
                </div>
            </section >
            {showModal && <AddTaskModal handleShowModal={handleShowModal} />}
        </>
    )
}

export default Todolist