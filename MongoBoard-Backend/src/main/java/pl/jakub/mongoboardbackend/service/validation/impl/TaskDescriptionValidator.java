package pl.jakub.mongoboardbackend.service.validation.impl;

import org.springframework.stereotype.Component;

import io.micrometer.common.util.StringUtils;
import pl.jakub.mongoboardbackend.dto.TaskDto;
import pl.jakub.mongoboardbackend.service.validation.ActionType;
import pl.jakub.mongoboardbackend.service.validation.TaskValidator;

@Component
public class TaskDescriptionValidator extends TaskValidator {

    @Override
    public boolean validate(final TaskDto taskDto, final ActionType actionType) {
        if(StringUtils.isEmpty(taskDto.description())) {
            taskDto.errors().add("Description is required");
        }

        return checkNext(taskDto, actionType);
    }
}
