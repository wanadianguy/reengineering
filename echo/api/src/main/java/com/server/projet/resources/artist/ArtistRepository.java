package com.server.projet.resources.artist;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArtistRepository extends CrudRepository<Artist, Long> {
  Optional<Artist> findById(long id);

  Optional<Artist> findByName(String name);

  void deleteById(long id);
}
