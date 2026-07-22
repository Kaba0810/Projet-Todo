package com.benga.todolist_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.benga.todolist_api.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}