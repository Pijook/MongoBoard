package pl.jakub.mongoboardbackend.dto;

import java.time.LocalDate;

public record TaskDto(String id, String title, String description, String status, String assignee, String priority,
                      LocalDate createdAt, LocalDate updatedAt) {

    public static TaskDto map(final TaskEntity taskEntity) {
        return new TaskDto(
                taskEntity.getId(),
                taskEntity.getTitle(),
                taskEntity.getDescription(),
                taskEntity.getStatus(),
                taskEntity.getAssignee(),
                taskEntity.getPriority(),
                taskEntity.getCreatedAt(),
                taskEntity.getUpdatedAt()
        );
    }

}
