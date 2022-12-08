const tasks = [
  {
    name: "create-task",
    description: "create a new task",
    options: [
      {
        type: 3,
        name: "task-name",
        description: "CC104 Assignment",
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
        required: false,
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
    name: "see-tasks",
    description: "See all tasks",
    options: [],
  },
];

const links = [
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
    name: "see-links",
    description: "See all links",
    options: [],
  },
  {
    name: "delete-link",
    description: "delete a link by id",
    options: [
      {
        type: 3,
        name: "enter-link-id",
        description: "You can view the linkk id by doing /see-links",
        required: true,
      },
    ],
  },
];

export const slashCommands = [
  ...tasks,
  ...links,
  {
    name: "schedule",
    description: "BSIT 2-A School Schedule",
    options: [],
  },
];
