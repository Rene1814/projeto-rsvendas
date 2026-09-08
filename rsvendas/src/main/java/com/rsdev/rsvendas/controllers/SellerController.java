package com.rsdev.rsvendas.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rsdev.rsvendas.dto.SellerDTO;
import com.rsdev.rsvendas.services.SellerService;

@RestController
@RequestMapping(value="/sellers")
public class SellerController {

	private final SellerService service;

	SellerController(SellerService service) {
		this.service = service;
	}
	
	@GetMapping
	public ResponseEntity<List<SellerDTO>> findAll(){
		List<SellerDTO> list = service.findAll();
		return ResponseEntity.ok(list);
	}
}
