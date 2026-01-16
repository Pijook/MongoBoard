package pl.jakub.mongoboardbackend.entity;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;

import pl.jakub.mongoboardbackend.dto.TaskDto;
import pl.jakub.mongoboardbackend.dto.TaskType;

@Getter
@Document(collection = "tasks")
@TypeAlias("NORMAL")
public class TaskEntity {

    @PersistenceCreator
    public TaskEntity(final String id, final String title, final String description, final String status, final String assignee, final String priority, final LocalDate createdAt, final LocalDate updatedAt, final TaskType taskType) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.assignee = assignee;
        this.priority = priority;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.taskType = taskType;
    }

    public static TaskEntity map(final TaskDto taskDto) {
        return new TaskEntity(
                taskDto.getId(),
                taskDto.getTitle(),
                taskDto.getDescription(),
                taskDto.getStatus(),
                taskDto.getAssignee(),
                taskDto.getPriority(),
                taskDto.getCreatedAt(),
                taskDto.getUpdatedAt(),
                taskDto.getTaskType()
        );
    }

    @Id
    private final String id;

    @Field("title")
    private final String title;

    @Field("description")
    private final String description;

    @Field("status")
    private final String status;

    @Field("assignee")
    private final String assignee;

    @Field("priority")
    private final String priority;

    @Field("created_at")
    private final LocalDate createdAt;

    @Field("updated_at")
    private final LocalDate updatedAt;

    @Field("task_type")
    private final TaskType taskType;
}
