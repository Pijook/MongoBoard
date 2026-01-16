package pl.jakub.mongoboardbackend.service.validation.impl;

import org.springframework.stereotype.Component;

import pl.jakub.mongoboardbackend.dto.StoryTaskDto;
import pl.jakub.mongoboardbackend.dto.TaskDto;
import pl.jakub.mongoboardbackend.service.validation.ActionType;
import pl.jakub.mongoboardbackend.service.validation.TaskValidator;

@Component
public class StoryTaskValidator extends TaskValidator {

    @Override
    public boolean validate(final TaskDto taskDto, final ActionType actionType) {
        if (taskDto instanceof StoryTaskDto storyTask) {
            if (storyTask.getStoryPoints() != null && storyTask.getStoryPoints() <= 0) {
                taskDto.getErrors().add("Story points must be positive");
            }
        }

        return checkNext(taskDto, actionType);
    }
}
