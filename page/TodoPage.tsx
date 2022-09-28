import React, { ChangeEvent, FC, useState } from "react";
import { Box, Button, Input, Typography } from "@mui/material";
import { ITodoItem } from "../InterfacesModals";
import { v4 as uuidv4 } from "uuid";
import { styles } from "../styleMUI";
import { TodoList } from "./TodoList";
import { observer } from "mobx-react-lite";
import todo from "../store/Store";
import { toJS } from "mobx";

export const TodoPage: FC = observer(() => {
  const addTodo = () => {
    if (todo.todo !== "") {
      let newtodo = {
        id: uuidv4(),
        todo: todo.todo,
        selected: false,
        completed: false,
      };

      todo.addTodo(newtodo);
    }
  };

  const handleSearch = (search: string) => {
    let currentTodos = [];
    let newList = [];
    if (search !== "") {
      currentTodos = toJS(todo.todoList);
      newList = currentTodos.filter((item) => {
        const lc = item.todo.toLowerCase();
        const filter = search.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = todo.todoList;
    }
    todo.search(newList);
  };

  return (
    <div className="App">
      <Box display="flex" alignItems="center" justifyContent="center">
        <Input
          style={styles.InputSearch}
          placeholder="Search"
          value={todo.searchTodo}
          onChange={(e) => todo.handleChangeSearch(e.target.value)}
        />
        <Button
          variant="outlined"
          style={styles.Button}
          onClick={() => {
            handleSearch(todo.searchTodo);
          }}>
          Search
        </Button>
        <Button
          variant="outlined"
          style={styles.Button}
          onClick={() => todo.clearSearch()}>
          Clear
        </Button>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center">
        <Input
          name="todo"
          placeholder="Todo"
          inputProps={{
            "aria-label": "Description",
          }}
          value={todo.todo}
          onChange={(e) => todo.handleChangeTodo(e.target.value)}
          style={styles.Input}></Input>
        <Button variant="outlined" style={styles.Button} onClick={addTodo}>
          Add
        </Button>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography>
          Done: {todo.doneTodo} All: {todo.allTodo}
        </Typography>
        <Button
          variant="outlined"
          style={styles.Button}
          onClick={() => todo.showDoneList()}>
          {todo.doneList ? "Show All" : " Show Done"}
        </Button>
        <Button
          variant="outlined"
          style={styles.Button}
          onClick={() => todo.deleteSelected()}>
          Delete Selected
        </Button>
        <Button
          variant="outlined"
          style={styles.Button}
          onClick={() => todo.doSelected()}>
          Done Selected
        </Button>
        <Button
          variant="outlined"
          style={styles.Button}
          onClick={() => todo.undoSelected()}>
          UnDo Selected
        </Button>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <TodoList />
      </Box>
    </div>
  );
});
