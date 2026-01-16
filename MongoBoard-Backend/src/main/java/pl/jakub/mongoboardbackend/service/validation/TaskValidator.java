package pl.jakub.mongoboardbackend.service.validation;

import org.apache.tomcat.util.buf.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import lombok.Data;

import pl.jakub.mongoboardbackend.dto.TaskDto;

@Data
public abstract class TaskValidator {

    private TaskValidator next;

    public abstract boolean validate(final TaskDto taskDto, final ActionType actionType);

    public boolean checkNext(final TaskDto taskDto, final ActionType actionType) {
        if(next != null) {
            return next.validate(taskDto, actionType);
        }

        if(CollectionUtils.isEmpty(taskDto.getErrors())) {
            return true;
        }
        else {
            throw new IllegalArgumentException(StringUtils.join(taskDto.getErrors(), ';'));
        }
    }
}
