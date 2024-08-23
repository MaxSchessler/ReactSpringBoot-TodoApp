package com.maxschessler.todoReactApp.Repositories;

import com.maxschessler.todoReactApp.Models.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    public List<Todo> findByUsername(String username);
    public List<Todo> findAllByCompleted(boolean completed);
}
