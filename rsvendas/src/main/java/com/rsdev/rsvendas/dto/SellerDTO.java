package com.rsdev.rsvendas.dto;

import java.io.Serializable;

import com.rsdev.rsvendas.entities.Seller;
import com.rsdev.rsvendas.entities.SellerLevel;

public class SellerDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private String email;
	private SellerLevel sellerLevel;
	
	public SellerDTO() {}

	public SellerDTO(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public SellerDTO(Long id, String name, String email, SellerLevel sellerLevel) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.sellerLevel = sellerLevel;
	}
	
	public SellerDTO(Seller entity) {
		id = entity.getId();
		name = entity.getName();
		email = entity.getEmail();
		sellerLevel = entity.getSellerLevel();
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

	public SellerLevel getSellerLevel() {
		return sellerLevel;
	}

	public void setSellerLevel(SellerLevel sellerLevel) {
		this.sellerLevel = sellerLevel;
	}

}
