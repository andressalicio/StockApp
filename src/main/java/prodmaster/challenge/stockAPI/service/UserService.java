package prodmaster.challenge.stockAPI.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import prodmaster.challenge.stockAPI.exception.UserNotFoundException;
import prodmaster.challenge.stockAPI.models.User;
import prodmaster.challenge.stockAPI.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    public User createUser(@RequestBody User user){
        User savedUser = userRepository.save(user);
        return user;
    }

    public List<User> listAllUser() {
        List<User> allUser= userRepository.findAll();
        return allUser;
    }


    public Optional<User> findByIdUser(Long id) throws UserNotFoundException {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()){
            throw new UserNotFoundException(id);
        }
        return optionalUser;
    }

    public Long updateByIdUser(Long id, User user) throws UserNotFoundException{
        verifyExists(id);

        Optional<User> optionalItem = userRepository.findById(id);
        if (optionalItem.isEmpty()){
            throw new UserNotFoundException(id);
        }


        User updatedUser= userRepository.save(user);
        return (updatedUser.getId());

    }
    public void deleteUser(Long id) throws UserNotFoundException{
        verifyExists(id);
        userRepository.deleteById(id);
    }
    private void verifyExists(Long id) throws UserNotFoundException {
        userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }


}
