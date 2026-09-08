package com.rsdev.rsvendas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rsdev.rsvendas.entities.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long>{

}
