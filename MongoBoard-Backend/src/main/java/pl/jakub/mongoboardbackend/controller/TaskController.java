package pl.jakub.mongoboardbackend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import pl.jakub.mongoboardbackend.dto.TaskDto;
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
