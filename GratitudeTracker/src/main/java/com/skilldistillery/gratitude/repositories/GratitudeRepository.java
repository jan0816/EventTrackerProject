package com.skilldistillery.gratitude.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.gratitude.entities.Gratitude;

public interface GratitudeRepository extends JpaRepository<Gratitude, Integer> {
	
	

}
