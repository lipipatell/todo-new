import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ShowTask from './ShowTask'
import Toast from './Toast';

export default function Inputbox({ inputValue, setInputValue }) {

    const [data, setData] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [IsSubmit, setIsSubmit] = useState(true);
    const [editId, setEditId] = useState(null);
    const [toast, setToast] = useState(null);

    async function insertTodo(todo) {
        console.log('insert todo running...')
        if (IsSubmit) {
            const data = await axios.post('https://6a2278075c6103532869db36.mockapi.io/todo', {
                task: inputValue
            }
            );
            setToast("Task Created Successfully!");

        }
        else {
            await axios.put(`https://6a2278075c6103532869db36.mockapi.io/todo/${editId}`, {
                task: inputValue
            });
            setToast("Task Updated Successfully!");

            setTimeout(() => {
                setToast(null);
            }, 3000);
        }
        setInputValue("");
        setIsSubmit(true);
        getData(); // refresh
    }
    async function getData() { // bring the data
        setIsLoading(true);
        const data = await axios.get('https://6a2278075c6103532869db36.mockapi.io/todo');
        setData(data.data);
        setIsLoading(false);
    }

    useEffect(() => {
        getData();
    }, [])

    async function editTask(todo) {

        setInputValue(todo.task);
        setEditId(todo.id);
        setIsSubmit(false);


        getData();
    }

    async function deleteTask(id) {
        await axios.delete(`https://6a2278075c6103532869db36.mockapi.io/todo/${id}`);

        setToast("Task Deleted!");

        setTimeout(() => {
            setToast(null);
        }, 3000);

        getData();
    }


    const style = {
        width: '50vw',
        height: '40px',
        padding: '20px',
        margin: '20px',
        fontSize: '25px'
    }

    const buttonStyle = {
        padding: '20px 40px'
    }

    return (
        <>

            <Toast message={toast} />

            <input
                placeholder='Enter Task'
                style={style}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        insertTodo();
                    }
                }}
            />

            <button
                style={buttonStyle}
                onClick={insertTodo}
            >{IsSubmit ? 'Submit' : 'Edit'}</button>
            <ShowTask inputValue={inputValue} data={data} loading={loading} editTask={editTask} deleteTask={deleteTask} />
        </>

    )
}