package com.rsdev.rsvendas.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rsdev.rsvendas.dto.SellerDTO;
import com.rsdev.rsvendas.services.SellerService;

@CrossOrigin("*")
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

	@GetMapping(value = "/{id}")
	public ResponseEntity<SellerDTO> findById(@PathVariable Long id) {
		SellerDTO result = service.findById(id);
		return ResponseEntity.ok(result);
	}

	@PostMapping
	public ResponseEntity<SellerDTO> insert(@RequestBody SellerDTO dto) {
		SellerDTO result = service.insert(dto);
		return ResponseEntity.ok(result);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<SellerDTO> update(@PathVariable Long id, @RequestBody SellerDTO dto) {
		SellerDTO result = service.update(id, dto);
		return ResponseEntity.ok(result);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
