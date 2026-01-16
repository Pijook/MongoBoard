package pl.jakub.mongoboardbackend.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.EqualsAndHashCode;

import pl.jakub.mongoboardbackend.entity.BugTaskEntity;

@Data
@EqualsAndHashCode(callSuper = true)
public class BugTaskDto extends TaskDto {

    private final boolean blocker;

    @JsonCreator
    public BugTaskDto(
            @JsonProperty("id") final String id,
            @JsonProperty("title") final String title,
            @JsonProperty("description") final String description,
            @JsonProperty("status") final String status,
            @JsonProperty("assignee") final String assignee,
            @JsonProperty("priority") final String priority,
            @JsonProperty("createdAt") final LocalDate createdAt,
            @JsonProperty("updatedAt") final LocalDate updatedAt,
            @JsonProperty("errors") final List<String> errors,
            @JsonProperty("blocker") final boolean blocker) {
        super(TaskType.BUG, id, title, description, status, assignee, priority, createdAt, updatedAt, errors);
        this.blocker = blocker;
    }

    public static BugTaskDto map(final BugTaskEntity taskEntity) {
        return new BugTaskDto(
                taskEntity.getId(),
                taskEntity.getTitle(),
                taskEntity.getDescription(),
                taskEntity.getStatus(),
                taskEntity.getAssignee(),
                taskEntity.getPriority(),
                taskEntity.getCreatedAt(),
                taskEntity.getUpdatedAt(),
                new ArrayList<>(),
                taskEntity.isBlocker()
        );
    }

}
