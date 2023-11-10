package com.server.projet.resources.artist;

import com.server.projet.resources.exception.BadRequestException;
import com.server.projet.resources.song.Song;
import com.server.projet.resources.song.SongService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/artists")
public class ArtistController {
  @Autowired
  private ArtistService artistService;
  @Autowired
  private SongService songService;

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getAllArtists() {
    List<Artist> artists = artistService.getAllArtists();
    return !artists.isEmpty() ? Response.status(Response.Status.OK).entity(artists).build() : Response.status(Response.Status.NOT_FOUND).build();
  }

  @GET
  @Path("/{artistId}")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getArtistById(@PathParam("artistId") long artistId) {
    Artist artist = artistService.getArtistById(artistId);
    return artist != null ? Response.status(Response.Status.OK).entity(artist).build() : Response.status(Response.Status.NOT_FOUND).build();
  }

  @GET
  @Path("/{artistId}/songs")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getAllSongsOfArtist(@PathParam("artistId") long artistId) {
    List<Song> songs = songService.getAllSongsByArtistId(artistId);
    return !songs.isEmpty() ? Response.status(Response.Status.OK).entity(songs).build() : Response.status(Response.Status.NOT_FOUND).build();
  }

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Response createArtist(Artist artist) {
    try {
      Artist createdArtist = artistService.createArtist(artist);
      return Response.status(Response.Status.OK).entity(createdArtist).build();
    } catch (BadRequestException e) {
      return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
    }
  }

  @DELETE
  @Path("/{artistId}")
  @Produces(MediaType.APPLICATION_JSON)
  public Response deleteArtist(@PathParam("artistId") long artistId) {
    try {
      artistService.deleteArtistById(artistId);
      return Response.status(Response.Status.OK).build();
    } catch (BadRequestException badRequestException) {
      return Response.status(Response.Status.NOT_FOUND).entity(badRequestException.getMessage()).build();
    }
  }
}
