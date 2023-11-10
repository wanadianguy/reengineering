package com.server.projet.resources.song;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.server.projet.resources.artist.Artist;
import com.server.projet.resources.feedback.Feedback;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
public class Song implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private String url;
  private String title;
  private Date date;
  private String type;
  @ManyToOne(fetch = FetchType.EAGER)
  @JsonBackReference(value = "artist-song")
  private Artist artist;
  @OneToMany(mappedBy = "song", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
  @JsonManagedReference(value = "song-feedback")
  private List<Feedback> feedback;

  public Song() {
    super();
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Artist getArtist() {
    return artist;
  }

  public void setArtist(Artist artist) {
    this.artist = artist;
  }

  public List<Feedback> getFeedback() {
    return feedback;
  }

  public void setFeedback(List<Feedback> feedback) {
    this.feedback = feedback;
  }
}
