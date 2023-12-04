package com.server.projet;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import java.io.IOException;

public class CORSResponseFilter implements ContainerResponseFilter {

  private static final String ALLOW_ORIGIN = "Access-Control-Allow-Origin";
  private static final String ALLOW_HEADERS = "Access-Control-Allow-Headers";
  private static final String ALLOW_CREDENTIALS = "Access-Control-Allow-Credentials";
  private static final String ALLOW_METHODS = "Access-Control-Allow-Methods";

  private static final String ALLOW_ORIGIN_VALUE = "*";
  private static final String ALLOW_HEADERS_VALUE = "origin, content-type, accept, authorization";
  private static final String ALLOW_CREDENTIALS_VALUE = "true";
  private static final String ALLOW_METHODS_VALUE = "GET, POST, PUT, DELETE, OPTIONS, HEAD";

  @Override
  public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) {
    responseContext.getHeaders().add(ALLOW_ORIGIN, ALLOW_ORIGIN_VALUE);
    responseContext.getHeaders().add(ALLOW_HEADERS, ALLOW_HEADERS_VALUE);
    responseContext.getHeaders().add(ALLOW_CREDENTIALS, ALLOW_CREDENTIALS_VALUE);
    responseContext.getHeaders().add(ALLOW_METHODS, ALLOW_METHODS_VALUE);
  }
}