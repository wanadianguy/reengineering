package com.server.projet.resources.feedback;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.server.projet.resources.song.Song;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Feedback implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private int mark;
  @Column(name = "COMMENT" , length = 2000000000)
  private String comment;
  @ManyToOne(fetch = FetchType.LAZY)
  @JsonBackReference(value = "song-feedback")
  private Song song;

  public Feedback(){
    super();
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public int getMark() {
    return mark;
  }

  public void setMark(int mark) {
    this.mark = mark;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public Song getSong() {
    return song;
  }

  public void setSong(Song song) {
    this.song = song;
  }
}
