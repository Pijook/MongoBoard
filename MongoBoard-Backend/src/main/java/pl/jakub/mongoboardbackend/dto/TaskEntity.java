package pl.jakub.mongoboardbackend.dto;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Document(collection = "tasks")
public class TaskEntity {

    public static TaskEntity map(final TaskDto taskDto) {
        return TaskEntity.builder()
                .id(taskDto.id())
                .title(taskDto.title())
                .description(taskDto.description())
                .status(taskDto.status())
                .assignee(taskDto.assignee())
                .priority(taskDto.priority())
                .createdAt(taskDto.createdAt())
                .updatedAt(taskDto.updatedAt())
                .build();
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

}
