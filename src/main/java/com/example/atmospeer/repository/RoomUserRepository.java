package com.example.atmospeer.repository;

import com.example.atmospeer.model.RoomUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomUserRepository extends JpaRepository<RoomUser, Long> {
}
