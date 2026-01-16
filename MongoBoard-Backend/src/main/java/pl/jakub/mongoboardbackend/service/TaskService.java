package pl.jakub.mongoboardbackend.service;

import java.util.List;

import pl.jakub.mongoboardbackend.dto.TaskDto;
import pl.jakub.mongoboardbackend.dto.TaskFilterDto;
import pl.jakub.mongoboardbackend.dto.TaskStatisticsDto;

public interface TaskService {

    List<TaskDto> getAllTasks();

    List<TaskDto> filterTasks(TaskFilterDto filter);

    TaskStatisticsDto getStatistics();

    TaskDto addTask(TaskDto taskDto);

    TaskDto updateTask(TaskDto taskDto);

    void deleteTask(String id);
}
