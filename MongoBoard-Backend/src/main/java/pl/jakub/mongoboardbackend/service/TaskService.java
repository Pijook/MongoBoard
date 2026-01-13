package pl.jakub.mongoboardbackend.service;

import java.util.List;

import pl.jakub.mongoboardbackend.dto.TaskDto;

public interface TaskService {

    List<TaskDto> getAllTasks();

    TaskDto addTask(TaskDto taskDto);

    TaskDto updateTask(TaskDto taskDto);

    void deleteTask(String id);
}
