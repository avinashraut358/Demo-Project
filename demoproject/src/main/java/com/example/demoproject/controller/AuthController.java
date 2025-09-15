package com.example.demoproject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demoproject.dto.LoginDTO;

@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;

    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("api/login")
    public ResponseEntity<Void> login(@RequestBody LoginDTO loginDto){
        Authentication authenticationRequest =
            UsernamePasswordAuthenticationToken.unauthenticated(loginDto.getUsername(), loginDto.getPassword());
        Authentication authenticationResponse =
            this.authenticationManager.authenticate(authenticationRequest);

        SecurityContextHolder.getContext().setAuthentication(authenticationResponse);
        return ResponseEntity.ok().build();

    }
}
