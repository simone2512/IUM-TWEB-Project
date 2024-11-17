package com.example.postgressqlserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan(basePackages = "com.example.postgressqlserver")
public class PostgresSqlServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PostgresSqlServerApplication.class, args);
	}

}
