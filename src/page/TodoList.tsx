import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { ITodoItem } from "../InterfacesModals.js";
import { Input } from "@mui/material";
import { styles } from "../styleMUI";
import { observer } from "mobx-react-lite";
import todo from "../store/Store";

export const TodoList = observer(() => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      width="auto">
      <Grid item xs={6}>
        {todo.searchList.length > 0
          ? todo.searchList
              .filter((item: ITodoItem) => {
                if (todo.doneList) {
                  return item.completed === true;
                } else {
                  return item;
                }
              })
              .map((item: ITodoItem) => (
                <Box
                  key={item.id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  style={styles.BoxWidth}>
                  <Input
                    style={
                      item.completed
                        ? styles.InputCompleted
                        : styles.InputUnCompleted
                    }
                    defaultValue={item.todo}
                  />

                  <Button
                    style={styles.Button}
                    variant="outlined"
                    onClick={() => todo.setDoneSearchTodo(item.id)}>
                    {item.completed ? "UnDone" : "Done"}
                  </Button>
                  <Button
                    style={styles.Button}
                    variant="outlined"
                    onClick={(e) => todo.deleteSearchTodo(item.id)}>
                    Delete
                  </Button>
                </Box>
              ))
          : todo.todoList
              .filter((item: ITodoItem) => {
                if (todo.doneList) {
                  return item.completed === true;
                } else {
                  return item;
                }
              })
              .map((item: ITodoItem) => (
                <Box
                  key={item.id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  style={styles.BoxWidth}>
                  <Checkbox
                    checked={item.selected ? true : false}
                    onClick={() => todo.setSelectedTodo(item.id)}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                  <Input
                    style={
                      item.completed
                        ? styles.InputCompleted
                        : styles.InputUnCompleted
                    }
                    defaultValue={item.todo}
                  />

                  <Button
                    style={styles.Button}
                    variant="outlined"
                    onClick={() => todo.setDoneTodo(item.id)}>
                    {item.completed ? "UnDone" : "Done"}
                  </Button>
                  <Button
                    style={styles.Button}
                    variant="outlined"
                    onClick={(e) => todo.deleteTodo(item.id)}>
                    Delete
                  </Button>
                </Box>
              ))}
      </Grid>
    </Grid>
  );
});
