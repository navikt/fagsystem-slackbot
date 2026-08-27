const blocks = [
  {
    type: "divider",
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: ":working-from-home: Hjemmekontor",
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: ":working-from-home:",
        emoji: true,
      },
      value: "home",
      action_id: "button_select_workplace",
    },
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: ":working-in-office: Kontoret (FYA1)",
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: ":working-in-office:",
        emoji: true,
      },
      value: "office",
      action_id: "button_select_workplace",
    },
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: ":relaxing: Ferie / fri",
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: ":relaxing:",
        emoji: true,
      },
      value: "vacation",
      action_id: "button_select_workplace",
    },
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: ":meow-sip: Annet (kommenter i tråd)",
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: ":meow-sip:",
        emoji: true,
      },
      value: "other",
      action_id: "button_select_workplace",
    },
  },
];

const initWorkplaceBlocks = (title) => {
  const heading = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: title,
    },
  };

  return [heading, ...blocks];
};

module.exports = initWorkplaceBlocks;
