package pl.jakub.mongoboardbackend.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;

import pl.jakub.mongoboardbackend.dto.EpicTaskDto;
import pl.jakub.mongoboardbackend.dto.TaskType;

@Getter
@Document(collection = "tasks")
@TypeAlias("EPIC")
public class EpicTaskEntity extends TaskEntity {

    @Field("child_task_ids")
    private final List<String> childTaskIds;

    @PersistenceCreator
    public EpicTaskEntity(
            final String id,
            final String title,
            final String description,
            final String status,
            final String assignee,
            final String priority,
            final LocalDate createdAt,
            final LocalDate updatedAt,
            final TaskType taskType,
            final List<String> childTaskIds) {
        super(id, title, description, status, assignee, priority, createdAt, updatedAt, taskType);
        this.childTaskIds = childTaskIds != null ? childTaskIds : new ArrayList<>();
    }

    public static EpicTaskEntity map(final EpicTaskDto taskDto) {
        return new EpicTaskEntity(
                taskDto.getId(),
                taskDto.getTitle(),
                taskDto.getDescription(),
                taskDto.getStatus(),
                taskDto.getAssignee(),
                taskDto.getPriority(),
                taskDto.getCreatedAt(),
                taskDto.getUpdatedAt(),
                taskDto.getTaskType(),
                taskDto.getChildTaskIds()
        );
    }

}
