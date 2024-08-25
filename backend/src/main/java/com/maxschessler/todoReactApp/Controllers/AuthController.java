package com.maxschessler.todoReactApp.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @GetMapping("/basicauth")
    public ResponseEntity<Void> basicAuth() {
        return ResponseEntity.ok().build();
    }
}
