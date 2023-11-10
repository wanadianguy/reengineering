package com.server.projet.resources.feedback;

import com.server.projet.resources.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/comments")
public class FeedbackController {
  @Autowired
  private FeedbackService feedbackService;

  @GET
  @Path("/{songId}")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getFeedbackOfSong(@PathParam("songId") long songId) {
    List<Feedback> feedback = feedbackService.getAllFeedbackBySong(songId);
    return !feedback.isEmpty() ? Response.status(Response.Status.OK).entity(feedback).build() : Response.status(Response.Status.NOT_FOUND).build();
  }

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
