package com.example.demoproject.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.demoproject.entities.AdminUser;
import com.example.demoproject.repository.AdminRepository;

import lombok.Data;

@Data
@Component
public class DataInitializer implements CommandLineRunner {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

     @Override
    public void run(String... args) throws Exception {
        if (adminRepository.findByUsername("admin").isEmpty()) {
            AdminUser admin = new AdminUser();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            adminRepository.save(admin);
            System.out.println(">>> Created default admin user with password 'password'");
        }
    }
}
