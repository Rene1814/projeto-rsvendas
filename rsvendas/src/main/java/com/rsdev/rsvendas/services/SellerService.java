package com.rsdev.rsvendas.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.rsdev.rsvendas.dto.SellerDTO;
import com.rsdev.rsvendas.entities.Seller;
import com.rsdev.rsvendas.repositories.SellerRepository;

@Service
public class SellerService {
	 
	private final SellerRepository repository;

	SellerService(SellerRepository repository) {
		this.repository = repository;
	}
	
	public List<SellerDTO> findAll(){
		List<Seller> result = repository.findAll();
		return result.stream().map(x -> new SellerDTO(x)).collect(Collectors.toList());
	}
	
}
