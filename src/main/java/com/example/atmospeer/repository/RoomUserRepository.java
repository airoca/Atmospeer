package com.example.atmospeer.repository;

import com.example.atmospeer.model.RoomUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomUserRepository extends JpaRepository<RoomUser, Long> {
    void deleteByRoomId(Integer roomId);

    List<RoomUser> findByRoomId(Integer roomId);

}
