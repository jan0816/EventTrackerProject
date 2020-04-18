package com.skilldistillery.gratitude;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class GratitudeTrackerApplication extends SpringBootServletInitializer {
	  @Override
	  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	    return application.sources(GratitudeTrackerApplication.class);
	  }

	public static void main(String[] args) {
		SpringApplication.run(GratitudeTrackerApplication.class, args);
	}

}
