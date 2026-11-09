package com.chana.knowledgehub.config.security;

import com.chana.knowledgehub.common.ApiError;
import com.chana.knowledgehub.common.Role;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.HttpMethod;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Arrays;

/**
 * Interceptor for role-based access control.
 * Reads role from query parameter and validates against @RequiresRole annotation.
 */
public class RoleInterceptor implements HandlerInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(RoleInterceptor.class);
    private static final String ROLE_PARAM = "role";
    private final ObjectMapper objectMapper;

    public RoleInterceptor(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // CORS preflight requests must pass without RBAC checks.
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            return true;
        }

        if (!(handler instanceof HandlerMethod handlerMethod)) {
            return true;
        }

        RequiresRole annotation = handlerMethod.getMethodAnnotation(RequiresRole.class);
        if (annotation == null) {
            return true;
        }

        String roleParam = request.getParameter(ROLE_PARAM);

        // Missing role
        if (roleParam == null || roleParam.isBlank()) {
            writeError(response, request, HttpServletResponse.SC_BAD_REQUEST,
                    "Missing required query parameter: role");
            return false;
        }

        // Invalid role value
        Role userRole;
        try {
            userRole = Role.valueOf(roleParam.toUpperCase());
        } catch (IllegalArgumentException e) {
            writeError(response, request, HttpServletResponse.SC_BAD_REQUEST,
                    "Invalid role: " + roleParam);
            return false;
        }

        // Check RBAC permissions
        if (!Arrays.asList(annotation.value()).contains(userRole)) {
            writeError(response, request, HttpServletResponse.SC_FORBIDDEN,
                    "Role " + userRole + " is not permitted for this endpoint");
            return false;
        }

        return true;
    }

    private void writeError(HttpServletResponse response,
                            HttpServletRequest request,
                            int status,
                            String message) {

        response.setStatus(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");

        if (response.isCommitted()) {
            logger.warn("Response already committed for request: {}", request.getRequestURI());
            return;
        }

        ApiError error = new ApiError(
                Instant.now(),
                status,
                status == HttpServletResponse.SC_FORBIDDEN ? "Forbidden" : "Bad Request",
                message,
                request.getRequestURI()
        );

        String json;
        try {
            json = objectMapper.writeValueAsString(error);
            logger.debug("Serialized ApiError JSON: {}", json);
        } catch (Exception e) {
            logger.warn("Failed to serialize ApiError", e);
            json = "{\"error\":\"Internal error\"}";
        }

        response.setContentLength(json.getBytes(StandardCharsets.UTF_8).length);

        try {
            response.getWriter().write(json);
            response.getWriter().flush();
            response.flushBuffer();
            logger.debug("Successfully wrote error response for: {}", request.getRequestURI());
        } catch (IOException e) {
            logger.warn("Failed to write RBAC error response: {}", e.getMessage());
        }
    }
}