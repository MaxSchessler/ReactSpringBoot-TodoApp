package com.maxschessler.todoReactApp;

import com.maxschessler.todoReactApp.Models.Todo;
import com.maxschessler.todoReactApp.Repositories.TodoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class TodoReactAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoReactAppApplication.class, args);

	}

	@Bean
	public CommandLineRunner loadData(TodoRepository repository) {
		return (args) ->  {
			repository.save(new Todo(null, "maxschessler", false, "maxschessler", LocalDate.now().plusDays(1)));
			repository.save(new Todo(null, "maxschessler", true, "maxschessler", LocalDate.now().plusDays(2)));
			repository.save(new Todo(null, "maxschessler", false, "maxschessler", LocalDate.now().plusDays(3)));
		};
	}

}
