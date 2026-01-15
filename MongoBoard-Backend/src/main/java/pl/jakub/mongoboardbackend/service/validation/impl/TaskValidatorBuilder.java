package pl.jakub.mongoboardbackend.service.validation.impl;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

import pl.jakub.mongoboardbackend.service.validation.TaskValidator;

@Component
@RequiredArgsConstructor
public class TaskValidatorBuilder {

    private final ApplicationContext context;

    public TaskValidator linkValidators() {
        final List<TaskValidator> validators = context.getBeansOfType(TaskValidator.class).values().stream().toList();
        final TaskValidator first = validators.getFirst();
        TaskValidator next = validators.getFirst();
        for(final TaskValidator validator : validators) {
            if (validator == first) {
                continue;
            }
            validator.setNext(next);
            next = validator;
        }
        return first;
    }

}
