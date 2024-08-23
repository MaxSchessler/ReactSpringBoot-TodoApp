package com.maxschessler.todoReactApp;


import com.maxschessler.todoReactApp.Models.Todo;
import com.maxschessler.todoReactApp.Repositories.TodoRepository;
import jakarta.annotation.Nullable;
import org.apache.coyote.Response;
import org.springframework.data.jpa.repository.JpaContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoController {

    final private TodoRepository todoRepository;
    private final JpaContext jpaContext;

    public TodoController(TodoRepository todoRepository, JpaContext jpaContext) {
        this.todoRepository = todoRepository;
        this.jpaContext = jpaContext;
    }

    // get all todos
    @GetMapping("/users/{username}/todos")
    public ResponseEntity<List<Todo>> getAllTodos(@PathVariable String username, @RequestParam(defaultValue = "ALL") String todoStatus) {
        // We need to determine what the input was for request param
        List<Todo> todos = switch (todoStatus) {
            case "COMPLETED" -> todoRepository.findByUsername(username).stream()
                    .filter(todo -> todo.isCompleted())
                    .toList();
            case "INCOMPLETE", "NOT COMPLETE" -> todoRepository.findByUsername(username).stream()
                    .filter(todo -> !todo.isCompleted())
                    .toList();

            case "ALL" -> todoRepository.findByUsername(username);

            default -> null;
        };

        if (todos == null) { // if request param todoStatus value is not valid
            return ResponseEntity.badRequest().build();
        } else { // if valid: return todos as 200
            return ResponseEntity.ok(todos);
        }
    }

    // get todos by username and id
    @GetMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Todo> getTodoById(
            @PathVariable String username,
            @PathVariable Long id
    ) {
        Todo todo = todoRepository.findById(id).orElse(null);
        if (todo == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(todo);
        }
    }

    @PostMapping("/users/{username}/todos")
    public ResponseEntity<Todo> createTodo(
            @PathVariable String username,
            @RequestBody Todo todo
    ) {
        todo.setUsername(username);
        Todo createdTodo = todoRepository.save(todo);
        return ResponseEntity.ok(createdTodo);
    }

    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<List<Todo>> deleteTodo(
            @PathVariable String username,
            @PathVariable Long id,
            @RequestParam(required = false) boolean returnListOfExisting
    ) {
        Todo existing = todoRepository.findById(id).orElse(null);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        } else if (existing.getUsername().equalsIgnoreCase(username)) {
            return ResponseEntity.badRequest().build();
        } else {
            // delete the record
            todoRepository.deleteById(id);

            // if request param returnListOfExisting - for react state
            // return list of remaining todos for this user
            if (returnListOfExisting) {
                return ResponseEntity.ok(todoRepository.findByUsername(username));
            }

            // return empty 200 response
            return ResponseEntity.ok().build();
        }
    }

    @PatchMapping("/users/{username}/todos{id}")
    public ResponseEntity<Todo> toggleComplete(
            @PathVariable String username,
            @PathVariable long id
    ) {
        Todo todo = todoRepository.findById(id).orElse(null);
        if (todo == null) {
            return ResponseEntity.notFound().build();
        }
        // toggle record
        todo.setCompleted(!todo.isCompleted());
        return ResponseEntity.ok(todo);
    }

}
