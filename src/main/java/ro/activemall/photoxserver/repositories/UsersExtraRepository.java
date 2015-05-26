package ro.activemall.photoxserver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ro.activemall.photoxserver.entities.UserExtra;

public interface UsersExtraRepository extends JpaRepository<UserExtra, Long> {
	@Query("SELECT e FROM extra e WHERE e.owner.id = :userId")
	UserExtra getExtraDataByOwnerId(@Param("userId") Long userId);
}
