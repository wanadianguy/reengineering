package com.server.projet.resources.feedback;

import com.server.projet.resources.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * Contrôleur pour les commentaires.
 */
@Path("/comments")
public class FeedbackController {
  @Autowired
  private FeedbackService feedbackService;

  /**
   * Récupère tous les commentaires d'une chanson.
   * 
   * @param songId L'identifiant de la chanson.
   * @return Une réponse contenant tous les commentaires de la chanson.
   * @throws BadRequestException
   */
  @GET
  @Path("/{songId}")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getFeedbackOfSong(@PathParam("songId") long songId) throws BadRequestException {
    List<Feedback> feedback = feedbackService.getAllFeedbackBySong(songId);
    return Response.status(Response.Status.OK).entity(feedback).build();
  }

  /**
   * Commente une chanson.
   * 
   * @param feedback Le commentaire à ajouter.
   * @param songId   L'identifiant de la chanson.
   * @return Une réponse contenant le commentaire créé.
   */
  @POST
  @Path("/{songId}")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Response commentSong(Feedback feedback, @PathParam("songId") long songId) {
    try {
      Feedback createdFeedback = feedbackService.createFeedbackToSong(feedback, songId);
      return Response.status(Response.Status.CREATED).entity(createdFeedback).build();
    } catch (BadRequestException badRequestException) {
      return Response.status(Response.Status.BAD_REQUEST).entity(badRequestException.getMessage()).build();
    }
  }
}
