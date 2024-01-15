package com.example.atmospeer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer room_id;
    @Getter
    private String masterUser;
    @Getter
    private String url;

    public Integer getRoomId() {
        return room_id;
    }

    public void setRoomId(Integer room_id) {
        this.room_id = room_id;
    }

    public void setMasterUser(String masterUser) {
        this.masterUser = masterUser;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}
