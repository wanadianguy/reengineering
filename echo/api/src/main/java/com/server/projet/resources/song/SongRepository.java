package com.server.projet.resources.song;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository pour les chansons.
 */
@Repository
public interface SongRepository extends CrudRepository<Song, Long> {

  /**
   * Trouve une chanson par son identifiant.
   * @param id L'identifiant de la chanson.
   * @return Un Optional contenant la chanson si trouvée.
   */
  Optional<Song> findById(long id);

  /**
   * Trouve une chanson par son titre.
   * @param title Le titre de la chanson.
   * @return Un Optional contenant la chanson si trouvée.
   */
  Optional<Song> findByTitle(String title);

  /**
   * Trouve toutes les chansons d'un artiste.
   * @param id L'identifiant de l'artiste.
   * @return Une liste contenant toutes les chansons de l'artiste.
   */
  List<Song> findAllByArtistId(long id);

  /**
   * Supprime une chanson par son identifiant.
   * @param id L'identifiant de la chanson.
   */
  void deleteById(long id);
}
