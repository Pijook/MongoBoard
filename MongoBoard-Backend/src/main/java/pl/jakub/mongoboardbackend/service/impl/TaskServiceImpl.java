package pl.jakub.mongoboardbackend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import pl.jakub.mongoboardbackend.dto.TaskDto;
import pl.jakub.mongoboardbackend.dto.TaskEntity;
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
        return taskRepository.findAll().stream().map(TaskDto::map).toList();
    }

    @Override
    public TaskDto addTask(final TaskDto taskDto) {
        validator.validate(taskDto, ActionType.CREATE);
        return TaskDto.map(taskRepository.save(TaskEntity.map(taskDto)));
    }

    @Override
    public TaskDto updateTask(final TaskDto taskDto) {
        validator.validate(taskDto, ActionType.UPDATE);
        return TaskDto.map(taskRepository.save(TaskEntity.map(taskDto)));
    }

    @Override
    public void deleteTask(final String id) {
        taskRepository.deleteById(id);
    }
}
