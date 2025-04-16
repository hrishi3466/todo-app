package com.example.todo.config;

import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    private final TodoRepository todoRepository;

    @Autowired
    public DataInitializer(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public void run(String... args) {
        // Initialize with some sample data
        if (todoRepository.count() == 0) {
            LocalDateTime now = LocalDateTime.now();

            Todo todo1 = new Todo(null, "Complete project proposal", false, now, now);
            Todo todo2 = new Todo(null, "Buy groceries", true, now, now);
            Todo todo3 = new Todo(null, "Schedule team meeting", false, now, now);
            Todo todo4 = new Todo(null, "Prepare presentation", false, now, now);
            Todo todo5 = new Todo(null, "Send weekly report", true, now, now);
            Todo todo6 = new Todo(null, "Review code changes", false, now, now);
            Todo todo7 = new Todo(null, "Update documentation", true, now, now);
            Todo todo8 = new Todo(null, "Fix critical bug in production", false, now, now);

            todoRepository.saveAll(Arrays.asList(todo1, todo2, todo3, todo4, todo5, todo6, todo7, todo8));
        }
    }
}