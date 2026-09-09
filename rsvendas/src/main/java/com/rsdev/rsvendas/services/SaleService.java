package com.rsdev.rsvendas.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.rsdev.rsvendas.dto.SaleDTO;
import com.rsdev.rsvendas.dto.SaleSuccessDTO;
import com.rsdev.rsvendas.dto.SaleSumDTO;
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

	@Transactional(readOnly = true)
	public SaleDTO findById(Long id) {
		Sale entity = repository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venda não encontrada"));
		return new SaleDTO(entity);
	}

	@Transactional
	public SaleDTO insert(SaleDTO dto) {
		Sale entity = new Sale();
		entity.setVisited(dto.getVisited());
		entity.setDeals(dto.getDeals());
		entity.setAmount(dto.getAmount());
		entity.setDate(dto.getDate());
		entity.setSeller(sellerRepository.findById(dto.getSeller().getId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado")));
		entity = repository.save(entity);
		return new SaleDTO(entity);
	}

	@Transactional
	public SaleDTO update(Long id, SaleDTO dto) {
		Sale entity = repository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venda não encontrada"));
		entity.setVisited(dto.getVisited());
		entity.setDeals(dto.getDeals());
		entity.setAmount(dto.getAmount());
		entity.setDate(dto.getDate());
		entity.setSeller(sellerRepository.findById(dto.getSeller().getId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vendedor não encontrado")));
		entity = repository.save(entity);
		return new SaleDTO(entity);
	}

	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Venda não encontrada");
		}
		repository.deleteById(id);
	}
	
	@Transactional(readOnly = true)
	public List<SaleSumDTO> amountGroupedBySeller(){
		return repository.amountGroupedBySeller();
	}
	
	@Transactional(readOnly = true)
	public List<SaleSuccessDTO> successGroupedBySeller(){
		return repository.successGroupedBySeller();
	}
	
}
