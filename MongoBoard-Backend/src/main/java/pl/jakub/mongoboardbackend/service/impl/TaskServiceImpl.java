package pl.jakub.mongoboardbackend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import pl.jakub.mongoboardbackend.dto.TaskDto;
import pl.jakub.mongoboardbackend.dto.TaskEntity;
import pl.jakub.mongoboardbackend.repository.TaskRepository;
import pl.jakub.mongoboardbackend.service.TaskService;

@Service
@RequiredArgsConstructor
class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    public List<TaskDto> getAllTasks() {
        return taskRepository.findAll().stream().map(TaskDto::map).toList();
    }

    @Override
    public TaskDto addTask(TaskDto taskDto) {
        return TaskDto.map(taskRepository.save(TaskEntity.map(taskDto)));
    }

    @Override
    public TaskDto updateTask(TaskDto taskDto) {
        return TaskDto.map(taskRepository.save(TaskEntity.map(taskDto)));
    }

    @Override
    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }
}
