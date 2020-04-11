package com.skilldistillery.gratitude.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.gratitude.entities.Gratitude;
import com.skilldistillery.gratitude.services.GratitudeService;

@RestController
@RequestMapping("api")
public class GratitudeController {

	@Autowired
	private GratitudeService gratSvc;

	@GetMapping("ping")
	public String ping() {
		return "pong";
	}

	@GetMapping("gratitudes")
	public List<Gratitude> index() {
		return gratSvc.findAll();
	}

	@GetMapping("gratitudes/{gratId}")
	public Gratitude showById(@PathVariable("gratId") int id, HttpServletResponse response) {
		Gratitude gratitude = gratSvc.findById(id);
		if (gratitude == null) {
			response.setStatus(404);
		}
		return gratitude;
	}

	@PostMapping("gratitudes")
	@ResponseBody
	public Gratitude addGratitudeEntry(@RequestBody Gratitude gratitude, HttpServletRequest request,
			HttpServletResponse resp) {
		try {
			Gratitude addGratitudeEntry = gratSvc.createGratitudeEntry(gratitude);
			resp.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(gratitude.getId());
			String location = url.toString();
			resp.addHeader("Location", location);
			return addGratitudeEntry;
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			return null;
		}
	}

	@PutMapping("gratitudes/{gratId}")
	public Gratitude updateGratitudeEntry(@PathVariable("gratId") int id, @RequestBody Gratitude gratitude,
			HttpServletResponse resp) {
		try {
			gratitude = gratSvc.updateGratitude(id, gratitude);
			if (gratitude == null) {
				resp.setStatus(400);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			gratitude = null;
		}
		return gratitude;
	}

	@DeleteMapping("gratitudes/{gratId}")
	public void deleteGratitudeEntry(@PathVariable("gratId") int id, HttpServletResponse response) {
		try {
			if (gratSvc.deleteById(id)) {
				response.setStatus(204);

			} else {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(409);
		}
	}
}
