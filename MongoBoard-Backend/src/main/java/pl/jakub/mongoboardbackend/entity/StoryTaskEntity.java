package pl.jakub.mongoboardbackend.entity;

import java.time.LocalDate;

import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;

import pl.jakub.mongoboardbackend.dto.StoryTaskDto;
import pl.jakub.mongoboardbackend.dto.TaskType;

@Getter
@Document(collection = "tasks")
@TypeAlias("STORY")
public class StoryTaskEntity extends TaskEntity {

    @Field("story_points")
    private final Integer storyPoints;

    @Field("acceptance_criteria")
    private final String acceptanceCriteria;

    @PersistenceCreator
    public StoryTaskEntity(
            final String id,
            final String title,
            final String description,
            final String status,
            final String assignee,
            final String priority,
            final LocalDate createdAt,
            final LocalDate updatedAt,
            final TaskType taskType,
            final Integer storyPoints,
            final String acceptanceCriteria) {
        super(id, title, description, status, assignee, priority, createdAt, updatedAt, taskType);
        this.storyPoints = storyPoints;
        this.acceptanceCriteria = acceptanceCriteria;
    }

    public static StoryTaskEntity map(final StoryTaskDto taskDto) {
        return new StoryTaskEntity(
                taskDto.getId(),
                taskDto.getTitle(),
                taskDto.getDescription(),
                taskDto.getStatus(),
                taskDto.getAssignee(),
                taskDto.getPriority(),
                taskDto.getCreatedAt(),
                taskDto.getUpdatedAt(),
                taskDto.getTaskType(),
                taskDto.getStoryPoints(),
                taskDto.getAcceptanceCriteria()
        );
    }

}
