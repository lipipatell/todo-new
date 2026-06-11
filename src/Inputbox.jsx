import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ShowTask from './ShowTask'
import Toast from './Toast';
import { Oval } from 'react-loader-spinner';
import './Inputbox.css';

export default function Inputbox({ inputValue, setInputValue }) {

    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [IsSubmit, setIsSubmit] = useState(true);
    const [editId, setEditId] = useState(null);
    const [toast, setToast] = useState(null);

    async function insertTodo() {
        setLoader(true);
        try {
            if (IsSubmit) {
                await axios.post('https://6a2278075c6103532869db36.mockapi.io/todo', {
                    task: inputValue
                });
                setToast("Task Created Successfully!");
            } else {
                await axios.put(`https://6a2278075c6103532869db36.mockapi.io/todo/${editId}`, {
                    task: inputValue
                });
                setToast("Task Updated Successfully!");
            }

            setInputValue("");
            setIsSubmit(true);
            await getData();
        } finally {
            setLoader(false);
        }
    }

    async function getData() {
        setLoader(true);
        try {
            const response = await axios.get('https://6a2278075c6103532869db36.mockapi.io/todo');
            setData(response.data);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    async function editTask(todo) {
        setLoader(true);
        try {
            setInputValue(todo.task);
            setEditId(todo.id);
            setIsSubmit(false);
            await getData();
        } finally {
            setLoader(false);
        }
    }

    async function deleteTask(id) {
        setLoader(true);
        try {
            await axios.delete(`https://6a2278075c6103532869db36.mockapi.io/todo/${id}`);
            setToast("Task Deleted!");
            setTimeout(() => {
                setToast(null);
            }, 3000);
            await getData();
        } finally {
            setLoader(false);
        }
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
            {loader ? (
                <div className="loader-overlay">
                    <Oval
                        className="oval-spinner"
                        height={80}
                        width={80}
                        color="#4CAF50"
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="white"
                        strokeWidth={3}
                        strokeWidthSecondary={3}
                    />
                </div>
            ) : ("" )}

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
                className={loader ? 'button-disabled' : ''}
                onClick={insertTodo}
                disabled={loader}
            >
                {IsSubmit ? 'Submit' : 'Edit'}
            </button>
            <ShowTask inputValue={inputValue} data={data} loading={loader} editTask={editTask} deleteTask={deleteTask} />
        </>

    )
}