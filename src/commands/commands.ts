export const slashCommands = [
  {
    name: "create-task",
    description: "create a new school task",
    options: [
      {
        type: 3,
        name: "task-subject",
        description: "subject of the task ex. CC104",
        required: true,
      },
      {
        type: 3,
        name: "task-description",
        description: "Description of the taskk",
        required: true,
      },
    ],
  },
  {
    name: "delete-task",
    description: "delete a task by ID",
    options: [
      {
        type: 3,
        name: "Enter the task ID",
        description: "You can view the task id by doing /see-tasks",
        required: true,
      },
    ],
  },
  {
    name: "schedule",
    description: "BSIT 2-A School Schedule",
    options: [],
  },
  {
    name: "see-tasks",
    description: "See all tasks",
    options: [],
  },
];
