package com.server.projet.resources.feedback;

import com.server.projet.resources.exception.BadRequestException;
import com.server.projet.resources.song.Song;
import com.server.projet.resources.song.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service pour les commentaires.
 */
@Service
public class FeedbackService {
  private FeedbackRepository feedbackRepository;
  private SongRepository songRepository;

  private static final int MIN_MARK = 0;
  private static final int MAX_MARK = 5;

  @Autowired
  public FeedbackService(FeedbackRepository feedbackRepository, SongRepository songRepository) {
    this.feedbackRepository = feedbackRepository;
    this.songRepository = songRepository;
  }

  /**
   * Crée un nouveau commentaire pour une chanson.
   * @param feedback Le commentaire à ajouter.
   * @param songId L'identifiant de la chanson.
   * @return Le commentaire créé.
   * @throws BadRequestException si la chanson n'existe pas ou si la note n'est pas entre 0 et 5 inclus.
   */
  public Feedback createFeedbackToSong(Feedback feedback, long songId) throws BadRequestException {
    Song song = songRepository.findById(songId).orElseThrow(() -> new BadRequestException("Song does not exist"));
    if (feedback.getMark() < MIN_MARK || feedback.getMark() > MAX_MARK) {
      throw new BadRequestException("Mark must be between " + MIN_MARK + " and " + MAX_MARK + " included");
    }
    feedback.setSong(song);
    feedbackRepository.save(feedback);
    return feedback;
  }

  /**
   * Récupère tous les commentaires d'une chanson.
   * @param songId L'identifiant de la chanson.
   * @return Une liste contenant tous les commentaires de la chanson.
   * @throws BadRequestException si la chanson n'existe pas.
   */
  public List<Feedback> getAllFeedbackBySong(long songId) throws BadRequestException {
    Song song = songRepository.findById(songId).orElseThrow(() -> new BadRequestException("Song does not exist"));
    return song.getFeedback();
  }
}
