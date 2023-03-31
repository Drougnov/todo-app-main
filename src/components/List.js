import React, { useState } from "react";
import { useMedia } from "react-use";
import ListItem from "./ListItem";

const List = (props) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData("text/plain", e.target.dataset.index);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const fromIndex = Number(e.dataTransfer.getData("text/plain"));
        const toIndex = Number(e.target.dataset.index);

        const newTodos = [...props.todoList];
        const [removed] = newTodos.splice(fromIndex, 1);
        newTodos.splice(toIndex, 0, removed);

        props.setTodoList(newTodos);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const isLarge = useMedia("(min-width: 650px)");

    const [selectedButton, setSelectedButton] = useState("all");

    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    const updateCompleted = (id, completed) => {
        props.toggleCompleted(id, completed);
    };

    let todoList = props.todoList.map((item, index) => (
        <ListItem
            key={item.id}
            index={index}
            item={item}
            toggleCompleted={updateCompleted}
            deleteTodo={props.deleteTodo}
            completed={item.completed}
            handleDragStart={handleDragStart}
        />
    ));

    let allCounter = 0;
    let activeCounter = 0;
    let completedCounter = 0;

    if (selectedButton === "all") {
        todoList = props.todoList.map((item, index) => (
            <ListItem
                key={item.id}
                index={index}
                item={item}
                toggleCompleted={updateCompleted}
                deleteTodo={props.deleteTodo}
                completed={item.completed}
                handleDragStart={handleDragStart}
            />
        ));
        allCounter = props.todoList.length;
    } else if (selectedButton === "active") {
        todoList = props.todoList
            .filter((item) => !item.completed)
            .map((item, index) => (
                <ListItem
                    key={item.id}
                    index={index}
                    item={item}
                    toggleCompleted={updateCompleted}
                    deleteTodo={props.deleteTodo}
                    completed={item.completed}
                    handleDragStart={handleDragStart}
                />
            ));
        activeCounter = props.todoList.filter((item) => !item.completed).length;
    } else if (selectedButton === "completed") {
        todoList = props.todoList
            .filter((item) => item.completed)
            .map((item, index) => (
                <ListItem
                    key={item.id}
                    index={index}
                    item={item}
                    toggleCompleted={updateCompleted}
                    deleteTodo={props.deleteTodo}
                    completed={item.completed}
                    handleDragStart={handleDragStart}
                />
            ));
        completedCounter = props.todoList.filter(
            (item) => item.completed
        ).length;
    }

    return (
        <div
            className={
                props.darkMode ? "list-container dark" : "list-container"
            }
        >
            <ul onDrop={handleDrop} onDragOver={handleDragOver}>
                {props.todoList.length === 0 && (
                    <li className="no-todo">All caught up!</li>
                )}
                {todoList}
            </ul>
            <div className="status">
                {selectedButton === "all" && (
                    <span>{allCounter} items total</span>
                )}
                {selectedButton === "active" && (
                    <span>{activeCounter} items left</span>
                )}
                {selectedButton === "completed" && (
                    <span>{completedCounter} items completed</span>
                )}
                {isLarge && (
                    <div className="filter-large">
                        <button
                            onClick={() => handleButtonClick("all")}
                            className={
                                selectedButton === "all" ? "active-filter" : ""
                            }
                        >
                            All
                        </button>
                        <button
                            onClick={() => handleButtonClick("active")}
                            className={
                                selectedButton === "active"
                                    ? "active-filter"
                                    : ""
                            }
                        >
                            Active
                        </button>
                        <button
                            onClick={() => handleButtonClick("completed")}
                            className={
                                selectedButton === "completed"
                                    ? "active-filter"
                                    : ""
                            }
                        >
                            Completed
                        </button>
                    </div>
                )}
                <button
                    className="clear-btn"
                    onClick={() => {
                        props.clearCompleted();
                    }}
                >
                    Clear completed
                </button>
            </div>
            {!isLarge && (
                <div className="filter-small">
                    <button
                        onClick={() => handleButtonClick("all")}
                        className={
                            selectedButton === "all" ? "active-filter" : ""
                        }
                    >
                        All
                    </button>
                    <button
                        onClick={() => handleButtonClick("active")}
                        className={
                            selectedButton === "active" ? "active-filter" : ""
                        }
                    >
                        Active
                    </button>
                    <button
                        onClick={() => handleButtonClick("completed")}
                        className={
                            selectedButton === "completed"
                                ? "active-filter"
                                : ""
                        }
                    >
                        Completed
                    </button>
                </div>
            )}
        </div>
    );
};

export default List;
