package com.ted.milanopizza.repo;

import com.ted.milanopizza.model.Zipcode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ZipcodeRepo extends JpaRepository<Zipcode, Long> {

}
