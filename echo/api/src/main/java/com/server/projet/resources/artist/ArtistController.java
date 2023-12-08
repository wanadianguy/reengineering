package com.server.projet.resources.artist;

import com.server.projet.resources.exception.BadRequestException;
import com.server.projet.resources.song.Song;
import com.server.projet.resources.song.SongService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * Contrôleur pour les artistes.
 */
@Path("/artists")
public class ArtistController {
  @Autowired
  private ArtistService artistService;
  @Autowired
  private SongService songService;

  /**
   * Récupère tous les artistes.
   * 
   * @return Une réponse contenant tous les artistes.
   */
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getAllArtists() {
    List<Artist> artists = artistService.getAllArtists();
    return Response.status(Response.Status.OK).entity(artists).build();
  }

  /**
   * Récupère un artiste par son identifiant.
   * 
   * @param artistId L'identifiant de l'artiste.
   * @return Une réponse contenant l'artiste.
   * @throws BadRequestException
   */
  @GET
  @Path("/{artistId}")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getArtistById(@PathParam("artistId") long artistId) throws BadRequestException {
    Artist artist = artistService.getArtistById(artistId);
    return artist != null ? Response.status(Response.Status.OK).entity(artist).build()
        : Response.status(Response.Status.NOT_FOUND).build();
  }

  /**
   * Récupère toutes les chansons d'un artiste.
   * 
   * @param artistId L'identifiant de l'artiste.
   * @return Une réponse contenant toutes les chansons de l'artiste.
   */
  @GET
  @Path("/{artistId}/songs")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getAllSongsOfArtist(@PathParam("artistId") long artistId) {
    List<Song> songs = songService.getAllSongsByArtistId(artistId);
    return Response.status(Response.Status.OK).entity(songs).build();
  }

  /**
   * Crée un nouvel artiste.
   * 
   * @param artist L'artiste à créer.
   * @return Une réponse contenant l'artiste créé.
   */
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

  /**
   * Supprime un artiste.
   * 
   * @param artistId L'identifiant de l'artiste à supprimer.
   * @return Une réponse indiquant si l'artiste a été supprimé.
   */
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