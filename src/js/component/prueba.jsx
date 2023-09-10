import React, { useEffect, useState } from "react";


const Prueba = () => {
    const [inputValue, setInputValue] = useState('');
    const [listTodos, setListTodos] = useState ([]);

  
  const agregarTarea = (newTodo) => {
    setListTodos([...listTodos, newTodo]);
    setInputValue("");
    console.log ("listTodos:", listTodos)
    console.log ("newTodo",newTodo)
  };
    
let requestOptions = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  
 const mostrarTareas = () => {fetch("https://playground.4geeks.com/apis/fake/todos/user/nelys", requestOptions)
    .then((response) => response.json())
    .then((result) => {
        console.log(result)
        const tareasFiltradas = result.filter((tarea) => tarea.label.trim() !== "");
        setListTodos(tareasFiltradas); // Actualizar el estado con las tareas
      })
    .catch(error => console.log('error', error));}

    useEffect (() => {mostrarTareas()}, [])
 
const onChangeFunction = (e) => {
 setInputValue(e.target.value)
}
const eliminar = (index) => {
  let listaActualizada = listTodos.filter ((t,i)=> i !== index)
  setListTodos(listaActualizada)
  actualizarTareas(listaActualizada); //aqui estoy llamando a la funcion actualizar tarea?
    
}

// metodo Put
const actualizarTareas = () => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(listTodos), // Enviar la lista completa de tareas
  };

  fetch("https://playground.4geeks.com/apis/fake/todos/user/nelys", requestOptions)
    .then((response) => response.json())
    .then(result => {
      console.log("result del put",result)
      console.log("listTodos", listTodos)})
    .catch(error => console.log('error', error));
};
   useEffect (() => {actualizarTareas()}, [])

   

    return (
       <div className="fondo container">
           <h1>Tareas que hacer:</h1>
           <ul className="list-group">
               <li className="list-group-item"><input type="text" onChange={onChangeFunction} placeholder="Escribir las tareas a realizar" value={inputValue} onKeyDown={(e)=>{
                 if(e.key === "Enter" && inputValue.trim() !==""){
                  agregarTarea({ label: inputValue, done: false });
                  }
                  
                   
               }}/></li>
               {listTodos.map((items,index) =>              
               <li className="list-group-item" key={index}>{items.label} <i class="fa-solid fa-trash" onClick={() => eliminar(index)}></i></li>)} 
           </ul>
           <div className="items">{listTodos.length} items</div>
           <div className="row">
            <button className="btn btn-secondary mt-3" onClick={actualizarTareas}>
          Actualizar Tareas
        </button>
      </div>  
                      
       </div>
   );
};

export default Prueba;

