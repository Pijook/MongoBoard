package pl.jakub.mongoboardbackend.service.validation.impl;

import org.springframework.stereotype.Component;

import io.micrometer.common.util.StringUtils;
import pl.jakub.mongoboardbackend.dto.TaskDto;
import pl.jakub.mongoboardbackend.service.validation.ActionType;
import pl.jakub.mongoboardbackend.service.validation.TaskValidator;

@Component
public class TaskTitleValidator extends TaskValidator {

    @Override
    public boolean validate(final TaskDto taskDto, final ActionType actionType) {
        if(StringUtils.isEmpty(taskDto.getTitle())) {
            taskDto.getErrors().add("Title is required");
        }

        return checkNext(taskDto, actionType);
    }
}
