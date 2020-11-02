package prodmaster.challenge.stockAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prodmaster.challenge.stockAPI.models.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
