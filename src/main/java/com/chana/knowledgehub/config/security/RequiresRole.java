package com.chana.knowledgehub.config.security;

import com.chana.knowledgehub.common.Role;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation to declare required roles for a controller method.
 * Used by RoleInterceptor to enforce role-based access control.
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequiresRole {
    Role[] value();
}
