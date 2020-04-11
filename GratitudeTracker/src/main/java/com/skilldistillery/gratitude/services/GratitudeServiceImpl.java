package com.skilldistillery.gratitude.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.gratitude.entities.Gratitude;
import com.skilldistillery.gratitude.repositories.GratitudeRepository;

@Service
public class GratitudeServiceImpl implements GratitudeService {
	@Autowired
	private GratitudeRepository gratRepo;

	@Override
	public List<Gratitude> findAll() {
		return gratRepo.findAll();
	}

	@Override
	public Gratitude findById(int gratId) {
		Optional<Gratitude> optGratitude = gratRepo.findById(gratId);
		Gratitude gratitude = null;
		if (optGratitude.isPresent()) {
			gratitude = optGratitude.get();
		} else {
			return null;
		}
		return gratitude;
	}

	@Override
	public Gratitude createGratitudeEntry(Gratitude gratitude) {
		try {
			gratitude = gratRepo.saveAndFlush(gratitude);
			return gratitude;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Gratitude updateGratitude(int gratId, Gratitude gratitude) {
		Optional<Gratitude> optGratitude = gratRepo.findById(gratId);
		if (optGratitude.isPresent()) {
			Gratitude managedGrat = optGratitude.get();
			managedGrat.setFirstGrat(gratitude.getFirstGrat());
			managedGrat.setSecondGrat(gratitude.getSecondGrat());
			managedGrat.setThirdGrat(gratitude.getThirdGrat());
			managedGrat.setEntryDate(gratitude.getEntryDate());
			return gratRepo.saveAndFlush(managedGrat);
		}
		return null;
	}

	@Override
	public boolean deleteById(int gratId) {
		Optional<Gratitude> optGratitude = gratRepo.findById(gratId);
		if (optGratitude.isPresent()) {
			gratRepo.deleteById(gratId);
			return true;
		}
		return false;
	}

}
