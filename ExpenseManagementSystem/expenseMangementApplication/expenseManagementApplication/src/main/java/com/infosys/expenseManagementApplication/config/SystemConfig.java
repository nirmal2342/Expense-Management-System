package com.infosys.expenseManagementApplication.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import com.infosys.expenseManagementApplication.service.ExpenseUserService;

@Configuration
@EnableMethodSecurity
public class SystemConfig {

	@Autowired
	private EncoderConfig encoderConfig;
	
	@Autowired
	private ExpenseUserService service;
	
	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
	  return configuration.getAuthenticationManager();
    }
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()).authorizeHttpRequests((authorize) ->
                authorize.requestMatchers(HttpMethod.GET, "/exp-mng/**").permitAll()
                        .requestMatchers("/exp-mng/**").permitAll()
                        .anyRequest().authenticated()
        );
	      return http.build();
	}
}
