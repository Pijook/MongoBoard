package pl.jakub.mongoboardbackend.dto;

import pl.jakub.mongoboardbackend.entity.BugTaskEntity;
import pl.jakub.mongoboardbackend.entity.EpicTaskEntity;
import pl.jakub.mongoboardbackend.entity.FeatureTaskEntity;
import pl.jakub.mongoboardbackend.entity.ImprovementTaskEntity;
import pl.jakub.mongoboardbackend.entity.StoryTaskEntity;
import pl.jakub.mongoboardbackend.entity.TaskEntity;

public class TaskMapper {

    public static TaskDto mapToTask(final TaskEntity taskEntity) {
        if (taskEntity instanceof BugTaskEntity e) {
            return BugTaskDto.map(e);
        }
        if (taskEntity instanceof FeatureTaskEntity e) {
            return FeatureTaskDto.map(e);
        }
        if (taskEntity instanceof StoryTaskEntity e) {
            return StoryTaskDto.map(e);
        }
        if (taskEntity instanceof EpicTaskEntity e) {
            return EpicTaskDto.map(e);
        }
        if (taskEntity instanceof ImprovementTaskEntity e) {
            return ImprovementTaskDto.map(e);
        }
        return TaskDto.map(taskEntity);
    }

    public static TaskEntity mapToEntity(final TaskDto taskDto) {
        return switch (taskDto.getTaskType()) {
            case BUG -> BugTaskEntity.map((BugTaskDto) taskDto);
            case FEATURE -> FeatureTaskEntity.map((FeatureTaskDto) taskDto);
            case STORY -> StoryTaskEntity.map((StoryTaskDto) taskDto);
            case EPIC -> EpicTaskEntity.map((EpicTaskDto) taskDto);
            case IMPROVEMENT -> ImprovementTaskEntity.map((ImprovementTaskDto) taskDto);
            case NORMAL -> TaskEntity.map(taskDto);
        };
    }
}
