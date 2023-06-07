import React, { useEffect, useState } from 'react'
import Todolist from '../components/Todolist'
import { useTodoListContext } from '../hooks/useTodoListContext'
import { useAuthContext } from '../hooks/useAuthContext'

const TodoPage = () => {
    const { tasks, dispatch } = useTodoListContext()

    const [searchText, setSearchText] = useState('');

    const { user } = useAuthContext();


    useEffect(() => {
        const fetchAllTasks = async () => {
            let url = 'http://localhost:7601/api/todolist';
            // if searchText is not empty, update the URL to use the search route
            if (searchText !== '') {
                url = `http://localhost:7601/api/todolist/search/${searchText}`;
            }
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'SET_TASKS', payload: json });
            } else {
                console.log('Error fetching tasks');
            }

        };

        if (user) {
            fetchAllTasks();
        }

    }, [dispatch, searchText, user])

    return (
        <Todolist tasks={tasks} searchText={searchText} setSearchText={setSearchText} />
    )
}

export default TodoPage