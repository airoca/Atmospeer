package com.example.atmospeer.repository;

import com.example.atmospeer.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByMasterUser(String masterUserId);

    @Query("SELECT r FROM Room r JOIN RoomUser ru ON r.room_id = ru.room_id WHERE ru.user_id = :userId")
    List<Room> findRoomsByUserId(@Param("userId") String userId);



}
