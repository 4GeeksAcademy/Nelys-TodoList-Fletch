import React, { useEffect, useState } from "react";

const Prueba1 = () => {
  const [inputValue, setInputValue] = useState("");
  const [listTodos, setListTodos] = useState([]);

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
  
  const añadirTareaEnter = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setListTodos([...listTodos, { label: inputValue, done: false }]);
      setInputValue("");
    }
  };

  const actualizarDatosPut = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/nelys", {
      method: "PUT",
      body: JSON.stringify(listTodos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no se pudo completar.");
        }
        return response.json();
      })
      .then((result) => {
        console.log("result del put", result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    actualizarDatosPut(); // Llamar a la función dentro de useEffect
  }, [listTodos]);

  const onChangeFunction = (e) => {
    setInputValue(e.target.value);
  };

  const eliminarTareas = (index) => {
    let eliminar = listTodos.filter((t, i) => i !== index);
    setListTodos(eliminar);
  };

  const cambiarCheckbox = (index) => {
    const newList = [...listTodos];
    newList[index].done = !newList[index].done;
    setListTodos(newList);
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
            onKeyDown={añadirTareaEnter}
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
            <i
              class="fa-solid fa-trash"
              onClick={() => eliminarTareas(index)}
            ></i>
          </li>
        ))}
      </ul>
      <div className="items">{listTodos.length} items</div>
    </div>
  );
};

export default Prueba1;
