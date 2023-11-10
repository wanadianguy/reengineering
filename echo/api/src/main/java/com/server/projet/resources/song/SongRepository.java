package com.server.projet.resources.song;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SongRepository extends CrudRepository<Song, Long> {
  Optional<Song> findById(long id);

  Optional<Song> findByTitle(String title);

  List<Song> findAllByArtistId(long id);

  void deleteById(long id);
}
