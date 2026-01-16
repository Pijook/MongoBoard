// MongoDB initialization script for MongoBoard
// This script runs automatically on first container startup

// Switch to the application database
db = db.getSiblingDB('mydb');

// Current date for timestamps
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

print('Initializing MongoBoard database with sample tasks...');

// Insert sample tasks of all types
db.tasks.insertMany([
  // NORMAL task
  {
    _class: "pl.jakub.mongoboardbackend.entity.TaskEntity",
    title: "Setup project documentation",
    description: "Create comprehensive README and API documentation for the project",
    status: "TODO",
    assignee: "John Doe",
    priority: "Low",
    created_at: today,
    updated_at: today,
    task_type: "NORMAL"
  },

  // BUG task
  {
    _class: "pl.jakub.mongoboardbackend.entity.BugTaskEntity",
    title: "Fix login timeout issue",
    description: "Users are experiencing random logouts after 5 minutes of inactivity. Should be 30 minutes.",
    status: "In progress",
    assignee: "Jane Smith",
    priority: "Critical",
    created_at: today,
    updated_at: today,
    task_type: "BUG",
    blocker: true
  },

  // FEATURE task
  {
    _class: "pl.jakub.mongoboardbackend.entity.FeatureTaskEntity",
    title: "Add dark mode support",
    description: "Implement a dark mode theme toggle for better user experience in low-light environments",
    status: "TODO",
    assignee: "Mike Johnson",
    priority: "Medium",
    created_at: today,
    updated_at: today,
    task_type: "FEATURE",
    target_version: "2.0.0",
    effort_estimate: "1 week"
  },

  // STORY task
  {
    _class: "pl.jakub.mongoboardbackend.entity.StoryTaskEntity",
    title: "User can export data to CSV",
    description: "As a user, I want to export my task board data to CSV format so I can analyze it in spreadsheet applications",
    status: "TODO",
    assignee: "Sarah Wilson",
    priority: "High",
    created_at: today,
    updated_at: today,
    task_type: "STORY",
    story_points: 5,
    acceptance_criteria: "- Export button visible on board\n- CSV includes all task fields\n- File downloads automatically\n- Works in all browsers"
  },

  // EPIC task
  {
    _class: "pl.jakub.mongoboardbackend.entity.EpicTaskEntity",
    title: "Q1 Release Planning",
    description: "Plan and track all features and improvements for the Q1 2024 release",
    status: "In progress",
    assignee: "Team Lead",
    priority: "High",
    created_at: today,
    updated_at: today,
    task_type: "EPIC",
    child_task_ids: []
  },

  // IMPROVEMENT task
  {
    _class: "pl.jakub.mongoboardbackend.entity.ImprovementTaskEntity",
    title: "Optimize database queries",
    description: "Review and optimize MongoDB queries for better performance on large datasets",
    status: "Done",
    assignee: "Alex Brown",
    priority: "Medium",
    created_at: today,
    updated_at: today,
    task_type: "IMPROVEMENT",
    affected_area: "Backend Performance"
  }
]);

print('Successfully inserted 6 sample tasks into the database!');
print('Task types: NORMAL, BUG, FEATURE, STORY, EPIC, IMPROVEMENT');
