package com.springcrud.crud.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springcrud.crud.dao.TaskRepository;
import com.springcrud.crud.model.Task;

@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	private TaskRepository taskRepository;

	@Override
	public List<Task> getTasks() {
		return taskRepository.findAll();
	}

	@Override
	public Task getTask(long taskId) {
		return taskRepository.findById(taskId).orElse(null);
	}

	@Override
	public Task addTask(Task task) {
		return taskRepository.save(task);
	}

	@Override
	public Task updateTask(Task task) {
		return taskRepository.save(task);
	}

	@Override
	public Task deleteTask(long taskId) {
		Task task = taskRepository.findById(taskId).orElse(null);
		if (task != null) {
			taskRepository.delete(task);
		}
		return task;
	}
}



