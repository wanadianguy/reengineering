package com.server.projet.resources.artist;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.server.projet.resources.song.Song;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * Classe représentant un artiste.
 */
@Entity
public class Artist implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String name;
  private String image;
  @OneToMany(mappedBy = "artist", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
  @JsonManagedReference(value = "artist-song")
  private Set<Song> songs;


  public Artist() {
    super();
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Set<Song> getSongs() {
    return songs;
  }

  public void setSongs(Set<Song> songs) {
    this.songs = songs;
  }

  /**
   * Ajoute une chanson à l'ensemble des chansons de l'artiste.
   * @param addedSong La chanson à ajouter.
   */
  public void addSong(Song addedSong) {
    if (!this.songs.contains(addedSong)) {
      this.songs.add(addedSong);
    }
  }
}