package pl.jakub.mongoboardbackend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import pl.jakub.mongoboardbackend.dto.TaskDto;
import pl.jakub.mongoboardbackend.dto.TaskMapper;
import pl.jakub.mongoboardbackend.entity.TaskEntity;
import pl.jakub.mongoboardbackend.repository.TaskRepository;
import pl.jakub.mongoboardbackend.service.TaskService;
import pl.jakub.mongoboardbackend.service.validation.ActionType;
import pl.jakub.mongoboardbackend.service.validation.TaskValidator;
import pl.jakub.mongoboardbackend.service.validation.impl.TaskValidatorBuilder;

@Service
class TaskServiceImpl implements TaskService {

    public TaskServiceImpl(final TaskValidatorBuilder validatorBuilder, final TaskRepository taskRepository) {
        this.validator = validatorBuilder.linkValidators();
        this.taskRepository = taskRepository;
    }

    private final TaskValidator validator;
    private final TaskRepository taskRepository;

    @Override
    public List<TaskDto> getAllTasks() {
        return taskRepository.findAll().stream().map(TaskMapper::mapToTask).toList();
    }

    @Override
    public TaskDto addTask(final TaskDto taskDto) {
        validator.validate(taskDto, ActionType.CREATE);
        return TaskMapper.mapToTask(taskRepository.save(TaskMapper.mapToEntity(taskDto)));
    }

    @Override
    public TaskDto updateTask(final TaskDto taskDto) {
        validator.validate(taskDto, ActionType.UPDATE);
        return TaskMapper.mapToTask(taskRepository.save(TaskMapper.mapToEntity(taskDto)));
    }

    @Override
    public void deleteTask(final String id) {
        taskRepository.deleteById(id);
    }
}
