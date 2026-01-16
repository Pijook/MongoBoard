package pl.jakub.mongoboardbackend.service.validation.impl;

import org.springframework.stereotype.Component;

import io.micrometer.common.util.StringUtils;
import pl.jakub.mongoboardbackend.dto.FeatureTaskDto;
import pl.jakub.mongoboardbackend.dto.TaskDto;
import pl.jakub.mongoboardbackend.service.validation.ActionType;
import pl.jakub.mongoboardbackend.service.validation.TaskValidator;

@Component
public class FeatureTaskValidator extends TaskValidator {

    @Override
    public boolean validate(final TaskDto taskDto, final ActionType actionType) {
        if (taskDto instanceof FeatureTaskDto featureTask) {
            if (StringUtils.isEmpty(featureTask.getTargetVersion())) {
                taskDto.getErrors().add("Target version is required for feature tasks");
            }
        }

        return checkNext(taskDto, actionType);
    }
}
