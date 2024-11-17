package com.example.postgressqlserver;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Sports Management API")
                        .version("v1.0")
                        .description("API for managing clubs, competitions, and players")
                        .summary("This API provides endpoints for managing clubs, competitions, and players")
                        .license(new License().name("Apache 2.0").url("http://www.apache.org/licenses/LICENSE-2.0")));
    }

    // Define separate groups to categorize controllers in the Swagger UI
    @Bean
    public GroupedOpenApi clubApi() {
        return GroupedOpenApi.builder()
                .group("Club")
                .displayName("Club")
                .packagesToScan("com.example.postgressqlserver.club")
                .build();
    }

    @Bean
    public GroupedOpenApi competitionApi() {
        return GroupedOpenApi.builder()
                .group("Competition")
                .displayName("Competition")
                .packagesToScan("com.example.postgressqlserver.competition")
                .build();
    }

    @Bean
    public GroupedOpenApi playerApi() {
        return GroupedOpenApi.builder()
                .group("Player")
                .displayName("Player")
                .packagesToScan("com.example.postgressqlserver.player")
                .build();
    }
}