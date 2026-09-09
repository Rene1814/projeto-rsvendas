package com.rsdev.rsvendas.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_sellers")
public class Seller {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String email;

	@Enumerated(EnumType.STRING)
	private SellerLevel sellerLevel;
	
	@OneToMany(mappedBy = "seller")
	private List<Sale> sales = new ArrayList<>();
	
	public Seller() {}

	public Seller(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public Seller(Long id, String name, String email, SellerLevel sellerLevel) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.sellerLevel = sellerLevel;
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

	public List<Sale> getSales() {
		return sales;
	}

}
