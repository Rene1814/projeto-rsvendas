package com.rndev.rsvendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rndev.rsvendas.entities.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long>{

}
