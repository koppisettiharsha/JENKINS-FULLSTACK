import { useState, useEffect } from "react";

import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getTasks, editTask } from "../Service/config";

const initialValue = {
  title: "",
  description: "",
  priority: "",
  status: "",
};

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% 0 0 25%;
  & > div {
    margin-top: 20px;
  }
`;

const EditTask = () => {
  const [task, setTask] = useState(initialValue);
  const { title, description, priority, status } = task;
  const { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    loadTaskDetails();
  }, []);

  const loadTaskDetails = async () => {
    const response = await getTasks(id);
    setTask(response.data);
  };

  const editTaskDetails = async () => {
    await editTask(id, { ...task });
    navigate("/all");
  };

  const onValueChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Typography variant="h4">Edit Task</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Title</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="title"
          value={title}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Description</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="description"
          value={description}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel>Priority</InputLabel>
        <Select
          value={priority}
          label="Priority"
          name="priority"
          onChange={(e) => onValueChange(e)}
        >
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          label="Status"
          name="status"
          onChange={(e) => onValueChange(e)}
        >
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => editTaskDetails()}
        >
          Edit Task
        </Button>
      </FormControl>
    </Container>
  );
};

export default EditTask;
