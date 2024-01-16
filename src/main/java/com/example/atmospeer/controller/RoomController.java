package com.example.atmospeer.controller;

import com.example.atmospeer.model.Room;
import com.example.atmospeer.model.RoomUser;
import com.example.atmospeer.model.RoomUserId;
import com.example.atmospeer.model.User;
import com.example.atmospeer.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.atmospeer.repository.RoomUserRepository;
import com.example.atmospeer.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
public class RoomController {

    @Autowired
    private RoomService roomService;

    // 새로운 방 생성
    @PostMapping("/newroom")
    public Room createRoom(@RequestBody Room room) {
        return roomService.createRoom(room);
    }

    // 방장이 소유한 방들 조회
    @GetMapping("/myroom")
    public List<Room> getMyRooms(@RequestParam String masterUserId) {
        return roomService.getRoomsByMaster(masterUserId);
    }

    // 참여 중인 방 정보 조회
    @GetMapping("/joiningroom")
    public List<Room> getJoiningRooms(@RequestParam String userId) {
        return roomService.getRoomsByUserId(userId);
    }

    // 방에 참여하기
    @PostMapping("/joinroom")
    public RoomUser joinRoom(@RequestBody RoomUser newRoomUser) {
        return roomService.joinRoom(newRoomUser);
    }

    //방 삭제하기
    @DeleteMapping("/eraseroom/{roomId}")
    public void eraseRoom(@PathVariable Integer roomId) {
        roomService.eraseRoom(roomId);
    }

    @GetMapping("/members")
    public List<User> getRoomMembers(@RequestParam Integer roomId) {
        return roomService.getUsersInRoom(roomId);
    }

}
