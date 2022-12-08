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
        description: "Description of the task",
        required: true,
      },
      {
        type: 3,
        name: "task-deadline",
        description: "Deadline (optional)",
        required: true,
      },
    ],
  },
  {
    name: "create-link",
    description: "create a new hyperlink",
    options: [
      {
        type: 3,
        name: "link-name",
        description: "ex. facebook",
        required: true,
      },
      {
        type: 3,
        name: "link-url",
        description: "ex. www.facebook.com",
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
        name: "enter-task-id",
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
  {
    name: "see-links",
    description: "See all links",
    options: [],
  },
];
