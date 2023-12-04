package com.server.projet;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import com.server.projet.resources.artist.ArtistController;
import com.server.projet.resources.feedback.FeedbackController;
import com.server.projet.resources.song.SongController;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.ext.Provider;
import java.util.Arrays;
import java.util.List;

@Component
@ApplicationPath("")
@Configuration
public class JerseyConfiguration extends ResourceConfig {

  private static final String FILTER_FORWARD_ON_404 = "FILTER_FORWARD_ON_404";
  private static final boolean FILTER_FORWARD_ON_404_VALUE = true;

  // En utilisant un registre dynamique pour les contrôleurs, nous facilitons l’ajout de nouveaux contrôleurs à l’avenir. 
  // Cela peut aider à prévenir les erreurs et à rendre l'application plus robuste.
  private static final List<Class<?>> CONTROLLERS = Arrays.asList(
    CORSResponseFilter.class,
    ArtistController.class,
    SongController.class,
    FeedbackController.class
  );

  public JerseyConfiguration() {
    property(FILTER_FORWARD_ON_404, FILTER_FORWARD_ON_404_VALUE);
    CONTROLLERS.forEach(this::register);
  }
}