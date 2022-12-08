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
        description: "write 'null' if no deadline",
        required: true,
      },
    ],
  },
  {
    name: "delete-task",
    description: "delete a task by aname",
    options: [
      {
        type: 3,
        name: "enter-task-name",
        description: "You can view the task name by doing /see-tasks",
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
    description: "delete a link by name",
    options: [
      {
        type: 3,
        name: "enter-link-name",
        description: "You can view the link name by doing /see-links",
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
