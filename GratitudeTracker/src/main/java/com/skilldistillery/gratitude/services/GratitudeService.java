package com.skilldistillery.gratitude.services;

import java.util.List;

import com.skilldistillery.gratitude.entities.Gratitude;

public interface GratitudeService {
	
	List<Gratitude> findAll();

	Gratitude findById(int gratId);

	Gratitude createGratitudeEntry(Gratitude gratitude);

	Gratitude updateGratitude(int gratId, Gratitude gratitude);

	boolean deleteById(int gratId);
}
