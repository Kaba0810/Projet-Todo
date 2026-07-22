package com.benga.todolist_api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.benga.todolist_api.model.Todo;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import com.benga.todolist_api.repository.TodoRepository;

@RestController
public class TodoController {
    private final TodoRepository todoRepository;
    private final List<Todo> todos = new ArrayList<>();

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;

        todos.add(new Todo(1L, "Apprendre spring boot", "urgente"));
        todos.add(new Todo(2L, "Connecter React au Back", "moyenne"));
        todos.add(new Todo(3L, "Travailler son alternance", "basse"));

    }

    @GetMapping("/api/todos")
    public List<Todo> getTodos() {

        return todoRepository.findAll();
    }

    @PostMapping("/api/todos")
    public Todo addTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    @DeleteMapping("/api/todos/{id}")
    public boolean deleteTodo(@PathVariable Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return true;

        }
        return false;
    }

    @PutMapping("/api/todos/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo updatedTodo) {

        Todo existingTodo = todoRepository.findById(id).orElse(null);

        if (existingTodo == null) {
            return null;
        }

        existingTodo.setText(updatedTodo.getText());
        existingTodo.setPriority(updatedTodo.getPriority());

        return todoRepository.save(existingTodo);
    }

}
