package pl.jakub.mongoboardbackend.dto;

import java.util.Map;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TaskStatisticsDto {

    private final long totalTasks;
    private final Map<String, Long> byStatus;
    private final Map<String, Long> byPriority;
    private final Map<String, Long> byTaskType;
    private final Map<String, Long> byAssignee;

}
