package pl.jakub.mongoboardbackend.entity;

import java.time.LocalDate;

import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;

import pl.jakub.mongoboardbackend.dto.ImprovementTaskDto;
import pl.jakub.mongoboardbackend.dto.TaskType;

@Getter
@Document(collection = "tasks")
@TypeAlias("IMPROVEMENT")
public class ImprovementTaskEntity extends TaskEntity {

    @Field("affected_area")
    private final String affectedArea;

    @PersistenceCreator
    public ImprovementTaskEntity(
            final String id,
            final String title,
            final String description,
            final String status,
            final String assignee,
            final String priority,
            final LocalDate createdAt,
            final LocalDate updatedAt,
            final TaskType taskType,
            final String affectedArea) {
        super(id, title, description, status, assignee, priority, createdAt, updatedAt, taskType);
        this.affectedArea = affectedArea;
    }

    public static ImprovementTaskEntity map(final ImprovementTaskDto taskDto) {
        return new ImprovementTaskEntity(
                taskDto.getId(),
                taskDto.getTitle(),
                taskDto.getDescription(),
                taskDto.getStatus(),
                taskDto.getAssignee(),
                taskDto.getPriority(),
                taskDto.getCreatedAt(),
                taskDto.getUpdatedAt(),
                taskDto.getTaskType(),
                taskDto.getAffectedArea()
        );
    }

}
