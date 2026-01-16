package pl.jakub.mongoboardbackend.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import org.bson.Document;

import pl.jakub.mongoboardbackend.dto.TaskDto;
import pl.jakub.mongoboardbackend.dto.TaskFilterDto;
import pl.jakub.mongoboardbackend.dto.TaskMapper;
import pl.jakub.mongoboardbackend.dto.TaskStatisticsDto;
import pl.jakub.mongoboardbackend.entity.TaskEntity;
import pl.jakub.mongoboardbackend.repository.TaskRepository;
import pl.jakub.mongoboardbackend.service.TaskService;
import pl.jakub.mongoboardbackend.service.validation.ActionType;
import pl.jakub.mongoboardbackend.service.validation.TaskValidator;
import pl.jakub.mongoboardbackend.service.validation.impl.TaskValidatorBuilder;

@Service
class TaskServiceImpl implements TaskService {

    public TaskServiceImpl(final TaskValidatorBuilder validatorBuilder,
                          final TaskRepository taskRepository,
                          final MongoTemplate mongoTemplate) {
        this.validator = validatorBuilder.linkValidators();
        this.taskRepository = taskRepository;
        this.mongoTemplate = mongoTemplate;
    }

    private final TaskValidator validator;
    private final TaskRepository taskRepository;
    private final MongoTemplate mongoTemplate;

    @Override
    public List<TaskDto> getAllTasks() {
        return taskRepository.findAll().stream().map(TaskMapper::mapToTask).toList();
    }

    @Override
    public List<TaskDto> filterTasks(final TaskFilterDto filter) {
        Query query = new Query();

        if (filter.getTaskType() != null) {
            query.addCriteria(Criteria.where("task_type").is(filter.getTaskType().name()));
        }
        if (filter.getStatus() != null && !filter.getStatus().isBlank()) {
            query.addCriteria(Criteria.where("status").is(filter.getStatus()));
        }
        if (filter.getPriority() != null && !filter.getPriority().isBlank()) {
            query.addCriteria(Criteria.where("priority").is(filter.getPriority()));
        }
        if (filter.getAssignee() != null && !filter.getAssignee().isBlank()) {
            query.addCriteria(Criteria.where("assignee").regex(Pattern.quote(filter.getAssignee()), "i"));
        }
        if (filter.getSearch() != null && !filter.getSearch().isBlank()) {
            query.addCriteria(new Criteria().orOperator(
                Criteria.where("title").regex(Pattern.quote(filter.getSearch()), "i"),
                Criteria.where("description").regex(Pattern.quote(filter.getSearch()), "i")
            ));
        }
        if (filter.getDateFrom() != null) {
            query.addCriteria(Criteria.where("created_at").gte(filter.getDateFrom()));
        }
        if (filter.getDateTo() != null) {
            query.addCriteria(Criteria.where("created_at").lte(filter.getDateTo()));
        }

        return mongoTemplate.find(query, TaskEntity.class)
            .stream()
            .map(TaskMapper::mapToTask)
            .toList();
    }

    @Override
    public TaskStatisticsDto getStatistics() {
        long total = taskRepository.count();

        Map<String, Long> byStatus = aggregateByField("status");
        Map<String, Long> byPriority = aggregateByField("priority");
        Map<String, Long> byTaskType = aggregateByField("task_type");
        Map<String, Long> byAssignee = aggregateByField("assignee");

        return TaskStatisticsDto.builder()
            .totalTasks(total)
            .byStatus(byStatus)
            .byPriority(byPriority)
            .byTaskType(byTaskType)
            .byAssignee(byAssignee)
            .build();
    }

    private Map<String, Long> aggregateByField(final String fieldName) {
        Aggregation aggregation = Aggregation.newAggregation(
            Aggregation.group("$" + fieldName).count().as("count")
        );

        AggregationResults<Document> results = mongoTemplate.aggregate(
            aggregation, "tasks", Document.class
        );

        Map<String, Long> resultMap = new HashMap<>();
        for (Document doc : results.getMappedResults()) {
            String key = doc.get("_id") != null ? doc.get("_id").toString() : "Unknown";
            Long count = doc.get("count", Number.class).longValue();
            resultMap.put(key, count);
        }
        return resultMap;
    }

    @Override
    public TaskDto addTask(final TaskDto taskDto) {
        validator.validate(taskDto, ActionType.CREATE);
        return TaskMapper.mapToTask(taskRepository.save(TaskMapper.mapToEntity(taskDto)));
    }

    @Override
    public TaskDto updateTask(final TaskDto taskDto) {
        validator.validate(taskDto, ActionType.UPDATE);
        return TaskMapper.mapToTask(taskRepository.save(TaskMapper.mapToEntity(taskDto)));
    }

    @Override
    public void deleteTask(final String id) {
        taskRepository.deleteById(id);
    }
}
