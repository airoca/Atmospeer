package com.example.atmospeer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;

@Entity
@IdClass(RoomUserId.class) //RoomUserId를 복합 키로 사용
public class RoomUser {
    @Id
    private Integer roomId;
    @Id
    private String userId;

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getRoomId() {
        return roomId;
    }

    public String getUserId() {
        return userId;
    }

}

