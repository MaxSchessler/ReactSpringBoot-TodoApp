package com.maxschessler.todoReactApp.Security;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service // annotate this as a spring service class
public class JwtTokenService {

    private final JwtEncoder jwtEncoder; // declare a final JwtEncoder

    public JwtTokenService(JwtEncoder jwtEncoder) { // constructor to inject the JwtEncoder dependency
        this.jwtEncoder = jwtEncoder;
    }

    // Method to generate a jwt token based on the provided authentication object
    public String generateToken(Authentication authentication) {

        // Extract the authorities (roles/permissions) from the Authentication object.
        var scope = authentication
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        // Build the Jwt claims set
        var claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plus(90, ChronoUnit.MINUTES))
                .subject(authentication.getName())
                .claim("scope", scope)
                .build();

        // encode the claims into a jwt token and return the token value
        return this.jwtEncoder
                .encode(JwtEncoderParameters.from(claims))
                .getTokenValue();
    }
}