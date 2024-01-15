package com.example.atmospeer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;

@Entity
@IdClass(RoomUserId.class) //RoomUserId를 복합 키로 사용
public class RoomUser {
    @Id
    private Integer room_id;
    @Id
    private String user_id;

    public void setRoomId(Integer room_id) {
        this.room_id = room_id;
    }

    public void setUserId(String user_id) {
        this.user_id = user_id;
    }

    public Integer getRoomId() {
        return room_id;
    }

    public String getUserId() {
        return user_id;
    }

}

