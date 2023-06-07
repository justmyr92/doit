import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useTodoListContext } from '../hooks/useTodoListContext'
import { useAuthContext } from '../hooks/useAuthContext'


const TodoItems = ({ task, setEditTask }) => {


    const { dispatch } = useTodoListContext()

    const { user } = useAuthContext()

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleDeleteTask = async () => {

        if (!user) {
            return
        }

        const response = await fetch(`http://localhost:7601/api/todolist/${task._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }

        })
        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'DELETE_TASK', payload: json })
        } else {
            console.log(json.error);
        }
    }


    const handleEditTask = async () => {
        const updatedTask = {
            ...task,
            status: !task.status // Toggle the status immediately
        };

        dispatch({ type: 'EDIT_TASK', payload: updatedTask }); // Update the task status in the state immediately

        const response = await fetch(`http://localhost:7601/api/todolist/${task._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(updatedTask)
        });

        const json = await response.json();
        if (!response.ok) {
            console.log(json.error);
        }
    };

    const handleEditTaskButton = () => {
        setEditTask("Edit function is not implemented yet")
    }

    return (
        <div className="todo__item flex justify-between items-center py-1.5 px-3.5 bg-slate-100 hover:bg-slate-200" key={task._id}>
            <div className="todo__item-content flex justify-between items-center">
                <input type="checkbox" className="todo__checkbox mr-2 h-5 w-5" checked={task.status} onChange={handleEditTask} />
                <div className="todo__item-text-group flex flex-col justify-center items-start">
                    <span className={`todo__item-text ${task.status ? 'line-through' : ''}`}>
                        {task.title}
                    </span>
                    <span className="todo__item-date text-xs text-gray-500">{formatDate(task.date)}</span>
                </div>
            </div>
            <div className="todo__item-control flex justify-center items-center">
                <button className="todo__delete bg-red-500 hover:bg-red-600 duration-300 text-white py-1 px-2 mr-1" onClick={handleDeleteTask}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="todo__edit bg-green-600 hover:bg-green-700 duration-300 text-white py-1 px-2" onClick={handleEditTaskButton}>
                    <FontAwesomeIcon icon={faPen} />
                </button>
            </div>
        </div>
    )
}

export default TodoItems