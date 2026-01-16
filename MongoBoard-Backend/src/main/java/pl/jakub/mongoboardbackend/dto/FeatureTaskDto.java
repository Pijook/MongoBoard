package pl.jakub.mongoboardbackend.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import pl.jakub.mongoboardbackend.entity.FeatureTaskEntity;

@Getter
@EqualsAndHashCode(callSuper = true)
public class FeatureTaskDto extends TaskDto {

    private final String targetVersion;
    private final String effortEstimate;

    @JsonCreator
    public FeatureTaskDto(
            @JsonProperty("id") final String id,
            @JsonProperty("title") final String title,
            @JsonProperty("description") final String description,
            @JsonProperty("status") final String status,
            @JsonProperty("assignee") final String assignee,
            @JsonProperty("priority") final String priority,
            @JsonProperty("createdAt") final LocalDate createdAt,
            @JsonProperty("updatedAt") final LocalDate updatedAt,
            @JsonProperty("errors") final List<String> errors,
            @JsonProperty("targetVersion") final String targetVersion,
            @JsonProperty("effortEstimate") final String effortEstimate) {
        super(TaskType.FEATURE, id, title, description, status, assignee, priority, createdAt, updatedAt, errors);
        this.targetVersion = targetVersion;
        this.effortEstimate = effortEstimate;
    }

    public static FeatureTaskDto map(final FeatureTaskEntity taskEntity) {
        return new FeatureTaskDto(
                taskEntity.getId(),
                taskEntity.getTitle(),
                taskEntity.getDescription(),
                taskEntity.getStatus(),
                taskEntity.getAssignee(),
                taskEntity.getPriority(),
                taskEntity.getCreatedAt(),
                taskEntity.getUpdatedAt(),
                new ArrayList<>(),
                taskEntity.getTargetVersion(),
                taskEntity.getEffortEstimate()
        );
    }

}
