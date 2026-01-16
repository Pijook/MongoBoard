package pl.jakub.mongoboardbackend.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import lombok.Getter;

import pl.jakub.mongoboardbackend.entity.TaskEntity;

@Getter
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.EXISTING_PROPERTY,
    property = "taskType",
    visible = true
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = TaskDto.class, name = "NORMAL"),
    @JsonSubTypes.Type(value = BugTaskDto.class, name = "BUG"),
    @JsonSubTypes.Type(value = FeatureTaskDto.class, name = "FEATURE"),
    @JsonSubTypes.Type(value = StoryTaskDto.class, name = "STORY"),
    @JsonSubTypes.Type(value = EpicTaskDto.class, name = "EPIC"),
    @JsonSubTypes.Type(value = ImprovementTaskDto.class, name = "IMPROVEMENT")
})
public class TaskDto {

    private final TaskType taskType;
    private final String id;
    private final String title;
    private final String description;
    private final String status;
    private final String assignee;
    private final String priority;
    private final LocalDate createdAt;
    private final LocalDate updatedAt;
    private final List<String> errors;

    @JsonCreator
    public TaskDto(
            @JsonProperty("taskType") final TaskType taskType,
            @JsonProperty("id") final String id,
            @JsonProperty("title") final String title,
            @JsonProperty("description") final String description,
            @JsonProperty("status") final String status,
            @JsonProperty("assignee") final String assignee,
            @JsonProperty("priority") final String priority,
            @JsonProperty("createdAt") final LocalDate createdAt,
            @JsonProperty("updatedAt") final LocalDate updatedAt,
            @JsonProperty("errors") final List<String> errors) {
        this.taskType = taskType;
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.assignee = assignee;
        this.priority = priority;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.errors = errors;
    }

    public static TaskDto map(final TaskEntity taskEntity) {
        return new TaskDto(
                TaskType.NORMAL,
                taskEntity.getId(),
                taskEntity.getTitle(),
                taskEntity.getDescription(),
                taskEntity.getStatus(),
                taskEntity.getAssignee(),
                taskEntity.getPriority(),
                taskEntity.getCreatedAt(),
                taskEntity.getUpdatedAt(),
                new ArrayList<>()
        );
    }

}
