package com.server.projet.resources.artist;

import com.server.projet.resources.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * Service pour les artistes.
 */
@Service
public class ArtistService {
  private ArtistRepository artistRepository;

  @Autowired
  public ArtistService(ArtistRepository artistRepository) {
    this.artistRepository = artistRepository;
  }

  /**
   * Récupère tous les artistes.
   * @return Une liste contenant tous les artistes.
   */
  public List<Artist> getAllArtists() {
    List<Artist> artists = new ArrayList<>();
    artistRepository.findAll().forEach(artists::add);
    return artists;
  }

  /**
   * Récupère un artiste par son identifiant.
   * @param artistId L'identifiant de l'artiste.
   * @return L'artiste.
   * @throws BadRequestException si l'artiste n'existe pas.
   */
  public Artist getArtistById(long artistId) throws BadRequestException {
    return artistRepository.findById(artistId).orElseThrow(() -> new BadRequestException("Artist does not exist"));
  }

  /**
   * Crée un nouvel artiste.
   * @param artist L'artiste à créer.
   * @return L'artiste créé.
   * @throws BadRequestException si l'artiste existe déjà.
   */
  public Artist createArtist(Artist artist) throws BadRequestException {
    if (artistRepository.findByName(artist.getName()).isPresent()) {
      throw new BadRequestException("Artist already exists");
    }
    artistRepository.save(artist);
    return artist;
  }

  /**
   * Supprime un artiste par son identifiant.
   * @param artistId L'identifiant de l'artiste à supprimer.
   * @throws BadRequestException si l'artiste n'existe pas.
   */
  @Transactional
  public void deleteArtistById(long artistId) throws BadRequestException {
    Artist artist = artistRepository.findById(artistId).orElseThrow(() -> new BadRequestException("Artist does not exist"));
    artistRepository.delete(artist);
  }
}