package com.server.projet.resources.exception;

public class BadRequestException extends Exception {
  public BadRequestException(String message) {
    super(message);
  }
}
