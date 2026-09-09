package com.rsdev.rsvendas.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rsdev.rsvendas.dto.SaleDTO;
import com.rsdev.rsvendas.dto.SaleSuccessDTO;
import com.rsdev.rsvendas.dto.SaleSumDTO;
import com.rsdev.rsvendas.services.SaleService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/sales")
public class SaleController {

	private final SaleService service;

	SaleController(SaleService service) {
		this.service = service;
	}
	
	@GetMapping
	public ResponseEntity<Page<SaleDTO>> findAll(Pageable pageable){
		Page<SaleDTO> list = service.findAll(pageable);
		return ResponseEntity.ok(list);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<SaleDTO> findById(@PathVariable Long id) {
		SaleDTO result = service.findById(id);
		return ResponseEntity.ok(result);
	}

	@PostMapping
	public ResponseEntity<SaleDTO> insert(@RequestBody SaleDTO dto) {
		SaleDTO result = service.insert(dto);
		return ResponseEntity.ok(result);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<SaleDTO> update(@PathVariable Long id, @RequestBody SaleDTO dto) {
		SaleDTO result = service.update(id, dto);
		return ResponseEntity.ok(result);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping(value = "/amount-by-seller")
	public ResponseEntity<List<SaleSumDTO>> amountGroupedBySeller(){
		List<SaleSumDTO> list = service.amountGroupedBySeller();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping(value = "/success-by-seller")
	public ResponseEntity<List<SaleSuccessDTO>> successGroupedBySeller(){
		List<SaleSuccessDTO> list = service.successGroupedBySeller();
		return ResponseEntity.ok(list);
	}
}
