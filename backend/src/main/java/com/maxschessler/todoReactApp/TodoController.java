package com.maxschessler.todoReactApp;


import com.maxschessler.todoReactApp.Models.Todo;
import com.maxschessler.todoReactApp.Repositories.TodoRepository;
import jakarta.annotation.Nullable;
import org.apache.coyote.Response;
import org.springframework.data.jpa.repository.JpaContext;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

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
    public ResponseEntity<Object> createTodo(
            @PathVariable String username,
            @Validated @RequestBody Todo todo
    ) {
        todo.setUsername(username);
        todoRepository.save(todo);
        System.out.println(todo);
        return ResponseEntity.ok(todo);
    }

    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<List<Todo>> deleteTodo(
            @PathVariable String username,
            @PathVariable Long id,
            @RequestParam(required = false) boolean returnListOfExisting
    ) {
        // get existing record
        Todo todo = todoRepository.findById(id).orElse(null);
        if (todo == null) return ResponseEntity.notFound().build();
        if (!todo.getUsername().equalsIgnoreCase(username)) return ResponseEntity.badRequest().build();
        todoRepository.deleteById(id);

        if (returnListOfExisting) return ResponseEntity.ok(todoRepository.findByUsername(username));
        else return ResponseEntity.ok().build();
    }

    @PatchMapping("users/{username}/todos/{id}/toggle")
    public ResponseEntity<Todo> toggleCompletion(
            @PathVariable String username,
            @PathVariable long id
    ) {
        Todo todo = todoRepository.findById(id).orElse(null);
        if (todo == null) return ResponseEntity.notFound().build();

        todo.setCompleted(!todo.isCompleted());
        todoRepository.save(todo);

        return ResponseEntity.ok(todo);
    }

    @PutMapping("users/{username}/todos/{id}")
    public ResponseEntity<Todo> updateTodo(
            @PathVariable String username,
            @PathVariable long id,
            @RequestBody Todo todo
    ) {
        // update todo
        Todo existingTodo = todoRepository.findById(id).orElse(null);
        if (existingTodo == null) return ResponseEntity.notFound().build();
        if (!existingTodo.getUsername().equalsIgnoreCase(username)) return ResponseEntity.badRequest().build();
        todoRepository.save(todo);
        return ResponseEntity.ok(todo);
    }
}
