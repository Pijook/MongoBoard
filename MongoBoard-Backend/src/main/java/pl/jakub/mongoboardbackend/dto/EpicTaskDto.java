package pl.jakub.mongoboardbackend.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.EqualsAndHashCode;
import lombok.Getter;

import pl.jakub.mongoboardbackend.entity.EpicTaskEntity;

@Getter
@EqualsAndHashCode(callSuper = true)
public class EpicTaskDto extends TaskDto {

    private final List<String> childTaskIds;

    @JsonCreator
    public EpicTaskDto(
            @JsonProperty("id") final String id,
            @JsonProperty("title") final String title,
            @JsonProperty("description") final String description,
            @JsonProperty("status") final String status,
            @JsonProperty("assignee") final String assignee,
            @JsonProperty("priority") final String priority,
            @JsonProperty("createdAt") final LocalDate createdAt,
            @JsonProperty("updatedAt") final LocalDate updatedAt,
            @JsonProperty("errors") final List<String> errors,
            @JsonProperty("childTaskIds") final List<String> childTaskIds) {
        super(TaskType.EPIC, id, title, description, status, assignee, priority, createdAt, updatedAt, errors);
        this.childTaskIds = childTaskIds != null ? childTaskIds : new ArrayList<>();
    }

    public static EpicTaskDto map(final EpicTaskEntity taskEntity) {
        return new EpicTaskDto(
                taskEntity.getId(),
                taskEntity.getTitle(),
                taskEntity.getDescription(),
                taskEntity.getStatus(),
                taskEntity.getAssignee(),
                taskEntity.getPriority(),
                taskEntity.getCreatedAt(),
                taskEntity.getUpdatedAt(),
                new ArrayList<>(),
                taskEntity.getChildTaskIds()
        );
    }

}
