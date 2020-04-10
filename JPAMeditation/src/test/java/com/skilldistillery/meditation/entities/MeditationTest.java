package com.skilldistillery.meditation.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MeditationTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Meditation meditation;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("MeditationPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		meditation = em.find(Meditation.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		meditation = null;
	}

	@Test
	void test() {
		assertNotNull(meditation);
		assertEquals("YEAH", meditation.getName());
	}

}
