package com.rndev.rsvendas.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rndev.rsvendas.dto.SellerDTO;
import com.rndev.rsvendas.entities.Seller;
import com.rndev.rsvendas.repositories.SellerRepository;

@Service
public class SellerService {
	
	@Autowired
	private SellerRepository repository;
	
	public List<SellerDTO> findAll(){
		List<Seller> result = repository.findAll();
		return result.stream().map(x -> new SellerDTO(x)).collect(Collectors.toList());
	}
	
	public SellerDTO findById(Long id) {
		Seller seller = repository.findById(id).orElseThrow();
		SellerDTO sellerDTO = new SellerDTO(seller);
		return sellerDTO;
	}
}
