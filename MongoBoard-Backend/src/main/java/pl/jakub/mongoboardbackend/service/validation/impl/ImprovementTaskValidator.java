package pl.jakub.mongoboardbackend.service.validation.impl;

import org.springframework.stereotype.Component;

import io.micrometer.common.util.StringUtils;
import pl.jakub.mongoboardbackend.dto.ImprovementTaskDto;
import pl.jakub.mongoboardbackend.dto.TaskDto;
import pl.jakub.mongoboardbackend.service.validation.ActionType;
import pl.jakub.mongoboardbackend.service.validation.TaskValidator;

@Component
public class ImprovementTaskValidator extends TaskValidator {

    @Override
    public boolean validate(final TaskDto taskDto, final ActionType actionType) {
        if (taskDto instanceof ImprovementTaskDto improvementTask) {
            if (StringUtils.isEmpty(improvementTask.getAffectedArea())) {
                taskDto.getErrors().add("Affected area is required for improvement tasks");
            }
        }

        return checkNext(taskDto, actionType);
    }
}
