package com.example.atmospeer.service;

import com.example.atmospeer.model.Room;
import com.example.atmospeer.model.RoomUser;
import com.example.atmospeer.repository.RoomRepository;
import com.example.atmospeer.repository.RoomUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private RoomUserRepository roomUserRepository;

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public List<Room> getRoomsByMaster(String masterUserId) {
        return roomRepository.findByMasterUser(masterUserId);
    }

    public List<Room> getRoomsByUserId(String userId) {
        return roomRepository.findRoomsByUserId(userId);
    }

    public RoomUser joinRoom(RoomUser newRoomUser) {
        return roomUserRepository.save(newRoomUser);
    }

    @Transactional
    public void eraseRoom(Integer roomId) {
        roomUserRepository.deleteByRoomId(roomId);
        roomRepository.deleteById(Long.valueOf(roomId));
    }

}
