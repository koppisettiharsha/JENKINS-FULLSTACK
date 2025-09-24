import { useState, useEffect } from "react";

import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  styled,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import { getTasks, deleteTask } from "../Service/config";
import { Link } from "react-router-dom";

const StyledTable = styled(Table)`
  width: 90%;
  margin: 20px 0 0 50px;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #000000;
    color: #ffffff;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;

const FiltersBar = styled(Box)`
  display: flex;
  gap: 16px;
  align-items: center;
  margin: 30px 0 0 50px;
`;

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    let response = await getTasks();
    setTasks(response?.data || []);
  };

  const deleteTaskData = async (id) => {
    await deleteTask(id);
    getAllTasks();
  };

  const deleteCompleted = async () => {
    const completed = tasks.filter(
      (t) => (t.status || "").toString().trim().toLowerCase() === "completed"
    );
    if (!completed.length) return;
    await Promise.allSettled(completed.map((t) => deleteTask(t.id)));
    getAllTasks();
  };

  const filtered = tasks.filter((t) => {
    const statusOk = statusFilter ? t.status === statusFilter : true;
    const priorityOk = priorityFilter ? t.priority === priorityFilter : true;
    return statusOk && priorityOk;
  });

  return (
    <>
      <FiltersBar>
        <Typography variant="h6">Tasks</Typography>
        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priorityFilter}
            label="Priority"
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="secondary" onClick={deleteCompleted}>
          Delete Completed
        </Button>
        <Button component={Link} to="/add" variant="contained" color="primary">
          Add Task
        </Button>
      </FiltersBar>
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>

            <TableCell></TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {filtered.map((task) => (
            <TRow key={task.id}>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.status}</TableCell>

              <TableCell>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginRight: 10 }}
                  component={Link}
                  to={`/edit/${task.id}`}
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => deleteTaskData(task.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default AllTasks;
