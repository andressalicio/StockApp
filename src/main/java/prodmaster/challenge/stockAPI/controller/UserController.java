package prodmaster.challenge.stockAPI.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import prodmaster.challenge.stockAPI.exception.UserNotFoundException;

import prodmaster.challenge.stockAPI.models.User;

import prodmaster.challenge.stockAPI.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/stock/user")
@CrossOrigin
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping
    public User createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @GetMapping
    public List<User> listAllUser(){
        return userService.listAllUser();
    }

    @GetMapping("/{id}")
    public Optional<User> findByIdUser(@PathVariable Long id) throws UserNotFoundException {
        return userService.findByIdUser(id);
    }
    @PutMapping("/{id}")
    public Long updateByIdUser(@PathVariable Long id, @RequestBody  User user) throws UserNotFoundException{
        return userService.updateByIdUser(id, user);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) throws UserNotFoundException{
        userService.deleteUser(id);
    }
}
