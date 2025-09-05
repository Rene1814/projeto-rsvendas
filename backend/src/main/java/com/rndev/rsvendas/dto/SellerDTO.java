package com.rndev.rsvendas.dto;

import java.io.Serializable;

import com.rndev.rsvendas.entities.Seller;

public class SellerDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	private String email;
	private String level;
	
	public SellerDTO() {
		
	}

	public SellerDTO(Long id, String name, String email, String level) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.level = level;
	}
	
	public SellerDTO(Seller entity) {
		id = entity.getId();
		name = entity.getName();
		email = entity.getEmail();
		level = entity.getLevel();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}
}
