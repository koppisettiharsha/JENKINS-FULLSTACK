package com.springcrud.crud.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springcrud.crud.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}



