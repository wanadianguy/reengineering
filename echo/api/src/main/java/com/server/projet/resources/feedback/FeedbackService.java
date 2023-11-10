package com.server.projet.resources.feedback;

import com.server.projet.resources.exception.BadRequestException;
import com.server.projet.resources.song.Song;
import com.server.projet.resources.song.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {
  private FeedbackRepository feedbackRepository;
  private SongRepository songRepository;

  @Autowired
  public FeedbackService(FeedbackRepository feedbackRepository, SongRepository songRepository) {
    this.feedbackRepository = feedbackRepository;
    this.songRepository = songRepository;
  }

  public Feedback createFeedbackToSong(Feedback feedback, long songId) throws BadRequestException {
    Optional<Song> song = songRepository.findById(songId);
    if (song.isPresent()) {
      if (feedback.getMark() <= 5 && feedback.getMark() >= 0) {
        feedback.setSong(song.get());
        feedbackRepository.save(feedback);
        return feedback;
      } else {
        throw new BadRequestException("Mark must be between 0 and 5 included");
      }
    } else {
      throw new BadRequestException("Song does not exist");
    }
  }

  public List<Feedback> getAllFeedbackBySong(long songId) {
    Optional<Song> song = songRepository.findById(songId);
    return song.isPresent() ? song.get().getFeedback() : null;
  }
}
