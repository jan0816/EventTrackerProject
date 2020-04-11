package com.skilldistillery.gratitude.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDate;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class GratitudeTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Gratitude gratitude;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("GratitudePU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		gratitude = em.find(Gratitude.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		gratitude = null;
	}

	@Test
	void testGratitudeEntity() {
		assertNotNull(gratitude);
		assertEquals("Meditation teachers", gratitude.getFirstGrat());
		assertEquals("My meditation practice", gratitude.getSecondGrat());
		assertEquals("Chakras", gratitude.getThirdGrat());
		assertEquals(LocalDate.now(), gratitude.getEntryDate());

	}

}
