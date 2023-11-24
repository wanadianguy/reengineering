package com.server.projet.resources.artist;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository pour les artistes.
 */
@Repository
public interface ArtistRepository extends CrudRepository<Artist, Long> {

  /**
   * Trouve un artiste par son identifiant.
   * @param id L'identifiant de l'artiste.
   * @return Un Optional contenant l'artiste si trouvé.
   */
  Optional<Artist> findById(long id);

  /**
   * Trouve un artiste par son nom.
   * @param name Le nom de l'artiste.
   * @return Un Optional contenant l'artiste si trouvé.
   */
  Optional<Artist> findByName(String name);

  /**
   * Supprime un artiste par son identifiant.
   * @param id L'identifiant de l'artiste.
   */
  void deleteById(long id);
}
