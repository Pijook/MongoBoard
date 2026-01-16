package pl.jakub.mongoboardbackend.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.EqualsAndHashCode;
import lombok.Getter;

import pl.jakub.mongoboardbackend.entity.StoryTaskEntity;

@Getter
@EqualsAndHashCode(callSuper = true)
public class StoryTaskDto extends TaskDto {

    private final Integer storyPoints;
    private final String acceptanceCriteria;

    @JsonCreator
    public StoryTaskDto(
            @JsonProperty("id") final String id,
            @JsonProperty("title") final String title,
            @JsonProperty("description") final String description,
            @JsonProperty("status") final String status,
            @JsonProperty("assignee") final String assignee,
            @JsonProperty("priority") final String priority,
            @JsonProperty("createdAt") final LocalDate createdAt,
            @JsonProperty("updatedAt") final LocalDate updatedAt,
            @JsonProperty("errors") final List<String> errors,
            @JsonProperty("storyPoints") final Integer storyPoints,
            @JsonProperty("acceptanceCriteria") final String acceptanceCriteria) {
        super(TaskType.STORY, id, title, description, status, assignee, priority, createdAt, updatedAt, errors);
        this.storyPoints = storyPoints;
        this.acceptanceCriteria = acceptanceCriteria;
    }

    public static StoryTaskDto map(final StoryTaskEntity taskEntity) {
        return new StoryTaskDto(
                taskEntity.getId(),
                taskEntity.getTitle(),
                taskEntity.getDescription(),
                taskEntity.getStatus(),
                taskEntity.getAssignee(),
                taskEntity.getPriority(),
                taskEntity.getCreatedAt(),
                taskEntity.getUpdatedAt(),
                new ArrayList<>(),
                taskEntity.getStoryPoints(),
                taskEntity.getAcceptanceCriteria()
        );
    }

}
