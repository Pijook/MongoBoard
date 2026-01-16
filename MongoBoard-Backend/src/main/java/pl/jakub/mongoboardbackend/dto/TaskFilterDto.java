package pl.jakub.mongoboardbackend.dto;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TaskFilterDto {

    private final TaskType taskType;
    private final String status;
    private final String priority;
    private final String assignee;
    private final String search;
    private final LocalDate dateFrom;
    private final LocalDate dateTo;

}
