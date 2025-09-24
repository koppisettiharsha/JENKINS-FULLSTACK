package com.springcrud.crud.services;

import java.util.List;

import com.springcrud.crud.model.Task;

public interface TaskService {

	List<Task> getTasks();

	Task getTask(long taskId);

	Task addTask(Task task);

	Task updateTask(Task task);

	Task deleteTask(long taskId);
}



