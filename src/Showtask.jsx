// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// export default function ShowTask({inputValue, data, loading}) {
//     // mount
//     // update
//     // unmount

    
//   return (
//     <div>
//         {loading ? 'task is loading...' : ''}
//         {
//             data.map((todo)=>{
//                 return (
//                     <h1 key={todo.id}>{todo.task}</h1>
//                 )
//             })
//         }
//     </div>
//   )
// }


import React from 'react'

export default function ShowTask({data,loading,editTask,deleteTask}) {
  return (
    <div style={{ marginTop: "20px" }}>
      {loading && <h2>Loading...</h2>}

      {data.map((todo) => (
        <div
          key={todo.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "10px auto",
            width: "60%",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
          }}
        >
          <h3>{todo.task}</h3>

          <div>
            <button
              onClick={() => editTask(todo)}
              style={{
                backgroundColor: "orange",
                color: "white",
                border: "none",
                padding: "10px 15px",
                marginRight: "10px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Edit
            </button>

            <button
              onClick={() => deleteTask(todo.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}