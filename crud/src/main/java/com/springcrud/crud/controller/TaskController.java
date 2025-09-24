package com.springcrud.crud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springcrud.crud.model.Task;
import com.springcrud.crud.services.TaskService;

@RestController
@CrossOrigin
public class TaskController {

	@Autowired
	private TaskService taskService;

	@PostMapping("/task")
	public Task addTask(@RequestBody Task task) {
		return this.taskService.addTask(task);
	}

	@GetMapping("/tasks")
	public List<Task> getTasks() {
		return this.taskService.getTasks();
	}

	@GetMapping("/tasks/{taskId}")
	public Task getTask(@PathVariable String taskId) {
		return this.taskService.getTask(Long.parseLong(taskId));
	}

	@PutMapping("/task")
	public Task updateTask(@RequestBody Task task) {
		return this.taskService.updateTask(task);
	}

	@DeleteMapping("/task/{taskId}")
	public Task deleteTask(@PathVariable String taskId) {
		return this.taskService.deleteTask(Long.parseLong(taskId));
	}
}




