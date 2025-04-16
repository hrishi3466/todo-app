package com.example.todo.service;

import com.example.todo.dto.TodoDto;
import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    @Autowired
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public List<Todo> getActiveTodos() {
        return todoRepository.findByCompletedFalse();
    }

    public List<Todo> getCompletedTodos() {
        return todoRepository.findByCompletedTrue();
    }

    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    public Todo createTodo(TodoDto todoDto) {
        Todo todo = new Todo();
        todo.setTitle(todoDto.getTitle());
        todo.setCompleted(false);
        todo.setCreatedAt(LocalDateTime.now());
        todo.setUpdatedAt(LocalDateTime.now());
        return todoRepository.save(todo);
    }

    public Optional<Todo> updateTodo(Long id, TodoDto todoDto) {
        return todoRepository.findById(id)
                .map(existingTodo -> {
                    existingTodo.setTitle(todoDto.getTitle());
                    existingTodo.setCompleted(todoDto.isCompleted());
                    existingTodo.setUpdatedAt(LocalDateTime.now());
                    return todoRepository.save(existingTodo);
                });
    }

    public Optional<Todo> toggleTodoCompletion(Long id) {
        return todoRepository.findById(id)
                .map(existingTodo -> {
                    existingTodo.setCompleted(!existingTodo.isCompleted());
                    existingTodo.setUpdatedAt(LocalDateTime.now());
                    return todoRepository.save(existingTodo);
                });
    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}