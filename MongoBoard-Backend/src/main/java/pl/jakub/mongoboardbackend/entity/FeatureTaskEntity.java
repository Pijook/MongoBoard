package pl.jakub.mongoboardbackend.entity;

import java.time.LocalDate;

import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;

import pl.jakub.mongoboardbackend.dto.FeatureTaskDto;
import pl.jakub.mongoboardbackend.dto.TaskType;

@Getter
@Document(collection = "tasks")
@TypeAlias("FEATURE")
public class FeatureTaskEntity extends TaskEntity {

    @Field("target_version")
    private final String targetVersion;

    @Field("effort_estimate")
    private final String effortEstimate;

    @PersistenceCreator
    public FeatureTaskEntity(
            final String id,
            final String title,
            final String description,
            final String status,
            final String assignee,
            final String priority,
            final LocalDate createdAt,
            final LocalDate updatedAt,
            final TaskType taskType,
            final String targetVersion,
            final String effortEstimate) {
        super(id, title, description, status, assignee, priority, createdAt, updatedAt, taskType);
        this.targetVersion = targetVersion;
        this.effortEstimate = effortEstimate;
    }

    public static FeatureTaskEntity map(final FeatureTaskDto taskDto) {
        return new FeatureTaskEntity(
                taskDto.getId(),
                taskDto.getTitle(),
                taskDto.getDescription(),
                taskDto.getStatus(),
                taskDto.getAssignee(),
                taskDto.getPriority(),
                taskDto.getCreatedAt(),
                taskDto.getUpdatedAt(),
                taskDto.getTaskType(),
                taskDto.getTargetVersion(),
                taskDto.getEffortEstimate()
        );
    }

}
