package pl.jakub.mongoboardbackend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import pl.jakub.mongoboardbackend.dto.TaskDto;
import pl.jakub.mongoboardbackend.dto.TaskFilterDto;
import pl.jakub.mongoboardbackend.dto.TaskStatisticsDto;
import pl.jakub.mongoboardbackend.dto.TaskType;
import pl.jakub.mongoboardbackend.service.TaskService;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping("/all")
    public List<TaskDto> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/filter")
    public List<TaskDto> filterTasks(
            @RequestParam(required = false) final TaskType taskType,
            @RequestParam(required = false) final String status,
            @RequestParam(required = false) final String priority,
            @RequestParam(required = false) final String assignee,
            @RequestParam(required = false) final String search,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) final LocalDate dateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) final LocalDate dateTo) {

        TaskFilterDto filter = TaskFilterDto.builder()
            .taskType(taskType)
            .status(status)
            .priority(priority)
            .assignee(assignee)
            .search(search)
            .dateFrom(dateFrom)
            .dateTo(dateTo)
            .build();

        return taskService.filterTasks(filter);
    }

    @GetMapping("/stats")
    public TaskStatisticsDto getStatistics() {
        return taskService.getStatistics();
    }

    @PostMapping("/add")
    public TaskDto addTask(@RequestBody final TaskDto taskDto) {
        return taskService.addTask(taskDto);
    }

    @PutMapping("/update")
    public TaskDto updateTask(@RequestBody final TaskDto taskDto) {
        return taskService.updateTask(taskDto);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTask(@PathVariable final String id) {
        taskService.deleteTask(id);
    }

}
