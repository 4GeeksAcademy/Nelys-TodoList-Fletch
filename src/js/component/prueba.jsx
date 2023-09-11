import React, { useCallback, useEffect, useState } from "react";

const Prueba = () => {
  const [inputValue, setInputValue] = useState("");
  const [listTodos, setListTodos] = useState([]);

  const agregarTarea = (newTodo) => {
    setListTodos([...listTodos, newTodo]);
    setInputValue("");
    console.log("listTodos:", listTodos);
    console.log("newTodo", newTodo);
  };

  let requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const mostrarTareas = () => {
    fetch(
      "https://playground.4geeks.com/apis/fake/todos/user/nelys",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const tareasFiltradas = result.filter(
          (tarea) => tarea.label.trim() !== ""
        );
        setListTodos(tareasFiltradas); // Actualizar el estado con las tareas
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    mostrarTareas();
  }, []);

  const onChangeFunction = (e) => {
    setInputValue(e.target.value);
  };
  const eliminar = (index) => {
    let listaActualizada = listTodos.filter((t, i) => i !== index);
    setListTodos(listaActualizada);
    actualizarTareas(listaActualizada); //aqui estoy llamando a la funcion actualizar tarea?
  };

  // metodo Put
  const actualizarTareas = useCallback(() => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(listTodos), // Enviar la lista completa de tareas
    };

    fetch(
      "https://playground.4geeks.com/apis/fake/todos/user/nelys",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("result del put", result);
        console.log("listTodos", listTodos);
      })
      .catch((error) => console.log("error", error));
  }, [listTodos]);

  // Función para cambiar el estado "done" de una tarea
  const cambiarCheckbox = (index) => {
    const newList = [...listTodos];
    newList[index].done = !newList[index].done;
    setListTodos(newList);
    actualizarTareas(newList);
  };

  const onKeyDownEvent = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      agregarTarea({ label: inputValue, done: false });
      actualizarTareas();
    }
  };

  return (
    <div className="fondo container">
      <h1>Lista de tareas:</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <input
            className="input1"
            type="text"
            onChange={onChangeFunction}
            onKeyDown={onKeyDownEvent}
            placeholder="Escribir las tareas a realizar"
            value={inputValue}
          />
        </li>
        {listTodos.map((items, index) => (
          <li className="list-group-item" key={index}>
            <input
              className="checkbox"
              type="checkbox"
              checked={items.done}
              onChange={() => cambiarCheckbox(index)}
            />
            {items.label}{" "}
            <i class="fa-solid fa-trash" onClick={() => eliminar(index)}></i>
          </li>
        ))}
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
