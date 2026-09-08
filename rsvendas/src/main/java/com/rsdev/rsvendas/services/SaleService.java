package com.rsdev.rsvendas.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rsdev.rsvendas.dto.SaleDTO;
import com.rsdev.rsvendas.entities.Sale;
import com.rsdev.rsvendas.repositories.SaleRepository;
import com.rsdev.rsvendas.repositories.SellerRepository;

@Service
public class SaleService {
	 
	private final SaleRepository repository;
	private final SellerRepository sellerRepository;

	SaleService(SaleRepository repository, SellerRepository sellerRepository){
		this.repository = repository;
		this.sellerRepository = sellerRepository;
	}
	
	@Transactional(readOnly = true)
	public Page<SaleDTO> findAll(Pageable pageable){
		sellerRepository.findAll();
		Page<Sale> result = repository.findAll(pageable);
		return result.map(x -> new SaleDTO(x));
	}
	
}
