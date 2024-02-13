import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
const root1 = document.getElementById("root1");

//
function TodoForm(add) {
    const container = document.createElement("form");

    container.innerHTML = `
        <input type="text" />
        <button>Add</button>
    `;

    container.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = container.querySelector("input").value;
        add(value);
    });

    return container;
}

function ListItem(todo, onChange) {
    const container = document.createElement("div");
    
    container.innerHTML = `
        <label>
            <input type="checkbox" ${todo.completed ? "checked" : ""}/>
            ${todo.label}
        </label>
    `;

    const input = container.querySelector("input");
    input.addEventListener("change", (e) => {
        onChange(e.target.checked);
    })
    return container;
}

function List(todos, onChange) {
    const container = document.createElement("div");

    todos.map(todo => {
        return ListItem(todo, (change) => {
            todo.completed = change;
            onChange();
        });
    }).forEach(el => {
        container.appendChild(el);
    });

    return container;
}

function TodoFooter(todos, onChange) {
    const container = document.createElement("div");
    
    const completed = todos.filter(todo => todo.completed === true).length;
    container.innerHTML = `
        <span>${completed} / ${todos.length} Completed</span>
        <button>Clear Completed</button>
    `;

    const btn = container.querySelector("button");
    btn.addEventListener("click", () => {
        onChange(todos.filter((todo) => todo.completed === false));
    });

    return container;
}

function TodApp() {

    let todos = [
        {label: "Learn JS", completed: false},
        {label: "Learn Node", completed: false},
        {label: "Learn CSS", completed: false}
    ];

    const container = document.createElement("div");

    function render() {
        container.innerHTML = "";

        container.appendChild(TodoForm(function(newText) {
            todos.push({
                label: newText,
                completed: false
            });
            render();
        }));
        container.appendChild(List(todos, () => {
            render();
        }));
        container.appendChild(TodoFooter(todos, (newTodos) => {
            todos = newTodos;
            render();
        }));
    }
    render();

    return container;
}
//соединение двух элементов
root1.appendChild(TodApp());
