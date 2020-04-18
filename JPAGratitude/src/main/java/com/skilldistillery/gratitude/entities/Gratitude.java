package com.skilldistillery.gratitude.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Gratitude {
	
	//FIELDS

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "first_gratitude")
	private String firstGrat;
	@Column(name = "second_gratitude")
	private String secondGrat;
	@Column(name = "third_gratitude")
	private String thirdGrat;
	@Column(name = "entry_date")
	@CreationTimestamp
	private LocalDate entryDate;

	// METHODS BEGIN:
	public Gratitude() {

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstGrat() {
		return firstGrat;
	}

	public void setFirstGrat(String firstGrat) {
		this.firstGrat = firstGrat;
	}

	public String getSecondGrat() {
		return secondGrat;
	}

	public void setSecondGrat(String secondGrat) {
		this.secondGrat = secondGrat;
	}

	public String getThirdGrat() {
		return thirdGrat;
	}

	public void setThirdGrat(String thirdGrat) {
		this.thirdGrat = thirdGrat;
	}

	public LocalDate getEntryDate() {
		return entryDate;
	}

	public void setEntryDate(LocalDate entryDate) {
		this.entryDate = entryDate;
	}
	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Gratitude other = (Gratitude) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Gratitude [id=");
		builder.append(id);
		builder.append(", firstGrat=");
		builder.append(firstGrat);
		builder.append(", secondGrat=");
		builder.append(secondGrat);
		builder.append(", thirdGrat=");
		builder.append(thirdGrat);
		builder.append(", entryDate=");
		builder.append(entryDate);
		builder.append("]");
		return builder.toString();
	}


	public Gratitude(int id, String firstGrat, String secondGrat, String thirdGrat, LocalDate entryDate) {
		super();
		this.id = id;
		this.firstGrat = firstGrat;
		this.secondGrat = secondGrat;
		this.thirdGrat = thirdGrat;
		this.entryDate = entryDate;
	}

	

}
