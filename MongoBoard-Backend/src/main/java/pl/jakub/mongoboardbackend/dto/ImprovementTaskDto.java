package pl.jakub.mongoboardbackend.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.EqualsAndHashCode;
import lombok.Getter;

import pl.jakub.mongoboardbackend.entity.ImprovementTaskEntity;

@Getter
@EqualsAndHashCode(callSuper = true)
public class ImprovementTaskDto extends TaskDto {

    private final String affectedArea;

    @JsonCreator
    public ImprovementTaskDto(
            @JsonProperty("id") final String id,
            @JsonProperty("title") final String title,
            @JsonProperty("description") final String description,
            @JsonProperty("status") final String status,
            @JsonProperty("assignee") final String assignee,
            @JsonProperty("priority") final String priority,
            @JsonProperty("createdAt") final LocalDate createdAt,
            @JsonProperty("updatedAt") final LocalDate updatedAt,
            @JsonProperty("errors") final List<String> errors,
            @JsonProperty("affectedArea") final String affectedArea) {
        super(TaskType.IMPROVEMENT, id, title, description, status, assignee, priority, createdAt, updatedAt, errors);
        this.affectedArea = affectedArea;
    }

    public static ImprovementTaskDto map(final ImprovementTaskEntity taskEntity) {
        return new ImprovementTaskDto(
                taskEntity.getId(),
                taskEntity.getTitle(),
                taskEntity.getDescription(),
                taskEntity.getStatus(),
                taskEntity.getAssignee(),
                taskEntity.getPriority(),
                taskEntity.getCreatedAt(),
                taskEntity.getUpdatedAt(),
                new ArrayList<>(),
                taskEntity.getAffectedArea()
        );
    }

}
