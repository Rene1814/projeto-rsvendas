package com.rsdev.rsvendas.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

	public SellerDTO findById(Long id) {
		Seller entity = repository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado"));
		return new SellerDTO(entity);
	}

	public SellerDTO insert(SellerDTO dto) {
		Seller entity = new Seller();
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new SellerDTO(entity);
	}
	
}
