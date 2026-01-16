package pl.jakub.mongoboardbackend.entity;

import java.time.LocalDate;

import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;

import pl.jakub.mongoboardbackend.dto.BugTaskDto;
import pl.jakub.mongoboardbackend.dto.TaskType;

@Getter
@Document(collection = "tasks")
@TypeAlias("BUG")
public class BugTaskEntity extends TaskEntity {

    @PersistenceCreator
    public BugTaskEntity(final String id, final String title, final String description, final String status, final String assignee, final String priority, final LocalDate createdAt, final LocalDate updatedAt, final TaskType taskType, final boolean blocker) {
        super(id, title, description, status, assignee, priority, createdAt, updatedAt, taskType);
        this.blocker = blocker;
    }

    public static BugTaskEntity map(final BugTaskDto taskDto) {
        return new BugTaskEntity(
                taskDto.getId(),
                taskDto.getTitle(),
                taskDto.getDescription(),
                taskDto.getStatus(),
                taskDto.getAssignee(),
                taskDto.getPriority(),
                taskDto.getCreatedAt(),
                taskDto.getUpdatedAt(),
                taskDto.getTaskType(),
                taskDto.isBlocker()
        );
    }

    @Field("blocker")
    private final boolean blocker;

}
