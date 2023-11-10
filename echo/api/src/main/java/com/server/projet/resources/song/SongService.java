package com.server.projet.resources.song;

import com.server.projet.resources.artist.Artist;
import com.server.projet.resources.artist.ArtistRepository;
import com.server.projet.resources.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SongService {
  private SongRepository songRepository;
  private ArtistRepository artistRepository;

  @Autowired
  public SongService(SongRepository songRepository, ArtistRepository artistRepository) {
    this.songRepository = songRepository;
    this.artistRepository = artistRepository;
  }

  public List<Song> getAllSongs() {
    List<Song> songs = new ArrayList<>();
    songRepository.findAll().forEach(songs::add);
    return songs;
  }

  public Song getSongById(long songId) {
    Optional<Song> song = songRepository.findById(songId);
    return song.isPresent() ? song.get() : null;
  }

  public Song getSongByTitle(String title){
    Optional<Song> song = songRepository.findByTitle(title);
    return song.isPresent() ? song.get() : null;
  }

  public List<Song> getAllSongsByArtistId(long artistId) {
    List<Song> songs = new ArrayList<>();
    songs.addAll(songRepository.findAllByArtistId(artistId));
    return songs;
  }

  public Song createSong(Song song, long artistId) throws BadRequestException {
    Optional<Song> fetchedSong = songRepository.findByTitle(song.getTitle());
    if (fetchedSong.isPresent()) {
      throw new BadRequestException("Song already exists");
    }
    Optional<Artist> artist = artistRepository.findById(artistId);
    if (artist.isPresent()) {
      song.setArtist(artist.get());
      songRepository.save(song);
      return song;
    } else {
      throw new BadRequestException("Artist does not exist");
    }
  }

  @Transactional
  public void deleteSongById(long songId) throws BadRequestException {
    Optional<Song> song = songRepository.findById(songId);
    if (song.isPresent()) {
      try {
        song.get().getArtist().getSongs().remove(song.get());
        songRepository.deleteById(songId);
      } catch (Exception exception) {
        throw new BadRequestException("Song could not be deleted");
      }
    } else {
      throw new BadRequestException("Song does not exist");
    }
  }
}
