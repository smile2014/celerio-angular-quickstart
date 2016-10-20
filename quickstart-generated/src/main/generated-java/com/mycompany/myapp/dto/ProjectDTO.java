/*
 * Source code generated by Celerio, a Jaxio product.
 * Documentation: http://www.jaxio.com/documentation/celerio/
 * Follow us on twitter: @jaxiosoft
 * Need commercial support ? Contact us: info@jaxio.com
 * Template pack-angular:src/main/java/dto/EntityDTO.java.e.vm
 */
package com.mycompany.myapp.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Simple DTO for Project.
 */
public class ProjectDTO {
    public Integer id;
    public String name;
    public String url;
    public Boolean openSource;
    public AuthorDTO author;

    @JsonIgnore
    public boolean isIdSet() {
        return id != null;
    }
}