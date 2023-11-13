package com.example.amCrudH2.repo;

import com.example.amCrudH2.model.Zipcode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ZipcodeRepo extends JpaRepository<Zipcode, Long> {

}
