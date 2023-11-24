package com.server.projet.resources.song;

import com.server.projet.resources.artist.Artist;
import com.server.projet.resources.artist.ArtistRepository;
import com.server.projet.resources.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * Service pour les chansons.
 */
@Service
public class SongService {
  private SongRepository songRepository;
  private ArtistRepository artistRepository;

  @Autowired
  public SongService(SongRepository songRepository, ArtistRepository artistRepository) {
    this.songRepository = songRepository;
    this.artistRepository = artistRepository;
  }

  /**
   * Récupère toutes les chansons.
   * @return Une liste contenant toutes les chansons.
   */
  public List<Song> getAllSongs() {
    List<Song> songs = new ArrayList<>();
    songRepository.findAll().forEach(songs::add);
    return songs;
  }

  /**
   * Récupère une chanson par son identifiant.
   * @param songId L'identifiant de la chanson.
   * @return La chanson.
   * @throws BadRequestException si la chanson n'existe pas.
   */
  public Song getSongById(long songId) throws BadRequestException {
    return songRepository.findById(songId).orElseThrow(() -> new BadRequestException("Song does not exist"));
  }

  /**
   * Récupère une chanson par son titre.
   * @param title Le titre de la chanson.
   * @return La chanson.
   * @throws BadRequestException si la chanson n'existe pas.
   */
  public Song getSongByTitle(String title) throws BadRequestException {
    return songRepository.findByTitle(title).orElseThrow(() -> new BadRequestException("Song does not exist"));
  }

  /**
   * Récupère toutes les chansons d'un artiste.
   * @param artistId L'identifiant de l'artiste.
   * @return Une liste contenant toutes les chansons de l'artiste.
   */
  public List<Song> getAllSongsByArtistId(long artistId) {
    return songRepository.findAllByArtistId(artistId);
  }

  /**
   * Crée une nouvelle chanson.
   * @param song La chanson à créer.
   * @param artistId L'identifiant de l'artiste de la chanson.
   * @return La chanson créée.
   * @throws BadRequestException si la chanson existe déjà ou si l'artiste n'existe pas.
   */
  public Song createSong(Song song, long artistId) throws BadRequestException {
    if (songRepository.findByTitle(song.getTitle()).isPresent()) {
      throw new BadRequestException("Song already exists");
    }
    Artist artist = artistRepository.findById(artistId).orElseThrow(() -> new BadRequestException("Artist does not exist"));
    song.setArtist(artist);
    songRepository.save(song);
    return song;
  }

  /**
   * Supprime une chanson par son identifiant.
   * @param songId L'identifiant de la chanson à supprimer.
   * @throws BadRequestException si la chanson n'existe pas.
   */
  @Transactional
  public void deleteSongById(long songId) throws BadRequestException {
    Song song = songRepository.findById(songId).orElseThrow(() -> new BadRequestException("Song does not exist"));
    songRepository.delete(song);
  }
}
