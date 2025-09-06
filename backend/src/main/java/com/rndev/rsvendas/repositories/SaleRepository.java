package com.rndev.rsvendas.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rndev.rsvendas.dto.SaleSuccessDTO;
import com.rndev.rsvendas.dto.SaleSumDTO;
import com.rndev.rsvendas.entities.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long>{
	
	//Busca as vendas somadas por vendedor
	@Query("SELECT new com.rndev.rsvendas.dto.SaleSumDTO(obj.seller, SUM(obj.amount)) "
			+ " FROM Sale AS obj GROUP BY obj.seller")
	List<SaleSumDTO> amountGroupedBySeller();
	
	@Query("SELECT new com.rndev.rsvendas.dto.SaleSuccessDTO(obj.seller, SUM(obj.visited), SUM(obj.deals)) "
			+ " FROM Sale AS obj GROUP BY obj.seller")
	List<SaleSuccessDTO> successGroupedBySeller();

}
