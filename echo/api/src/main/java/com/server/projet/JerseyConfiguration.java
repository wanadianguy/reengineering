package com.server.projet;

import com.server.projet.resources.artist.ArtistController;
import com.server.projet.resources.feedback.FeedbackController;
import com.server.projet.resources.song.SongController;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import javax.ws.rs.ApplicationPath;

@Component
@ApplicationPath("")
@Configuration
public class JerseyConfiguration extends ResourceConfig {
  public JerseyConfiguration() {
    property(ServletProperties.FILTER_FORWARD_ON_404, true);
    register(CORSResponseFilter.class);
    register(ArtistController.class);
    register(SongController.class);
    register(FeedbackController.class);
  }
}