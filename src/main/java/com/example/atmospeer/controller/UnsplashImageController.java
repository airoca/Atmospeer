package com.example.atmospeer.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Collections;

@Controller
public class UnsplashImageController {

    @Value("${unsplash.accessKey}")
    private String unsplashAccessKey;

    @GetMapping("/image")
    public ResponseEntity<String> getImageUrl(@RequestParam String keyword) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();

        URI uri = UriComponentsBuilder
                .fromUriString("https://api.unsplash.com/photos/random")
                .queryParam("query", keyword)
                .build()
                .toUri();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        httpHeaders.add("Authorization", "Client-ID " + unsplashAccessKey);

        HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);

        ResponseEntity<String> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            String responseBody = responseEntity.getBody();

            // Parse the JSON response
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);

            // Get the 'urls' object
            JsonNode urlsNode = jsonNode.get("urls");

            if (urlsNode != null) {
                // Get the 'raw' field from the 'urls' object
                JsonNode rawNode = urlsNode.get("raw");

                if (rawNode != null) {
                    String rawUrl = rawNode.asText();
                    return ResponseEntity.ok(rawUrl);
                }
            }
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch image from Unsplash API");
    }

}
