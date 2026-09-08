package com.rsdev.rsvendas.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rsdev.rsvendas.dto.SaleDTO;
import com.rsdev.rsvendas.services.SaleService;

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
}
