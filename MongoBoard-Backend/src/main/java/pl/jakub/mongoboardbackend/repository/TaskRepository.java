package pl.jakub.mongoboardbackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import pl.jakub.mongoboardbackend.entity.TaskEntity;

public interface TaskRepository extends MongoRepository<TaskEntity, String> {
}
