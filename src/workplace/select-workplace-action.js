const addOrRemoveUser = (block, userId) => {
  const origMsg = block.text.text;

  const userCount = (origMsg.match(/@/g) || []).length;

  if (userCount > 0) {
    // Create array of all users in original message
    // Users are formatted like this: <@userId>
    let users = origMsg
      .substring(origMsg.indexOf("<"))
      .split(",")
      .map((user) => user.trim());

    if (origMsg.includes(userId)) {
      users = users.filter((user) => !user.includes(userId));
    } else {
      users.push(`<@${userId}>`);
    }

    // Strip text of users and user count
    const text = origMsg.substring(0, origMsg.indexOf("`")).trim();

    if (users.length) {
      block.text.text = `${text} \`${users.length}\`\n${users.join(", ")}`;
    } else {
      block.text.text = text;
    }
  } else {
    block.text.text = `${origMsg} \`1\`\n <@${userId}>`;
  }

  return block;
};

const updateBlocks = async (username, blocks, actions) => {
  console.log(`update blocks from action @${actions[0].value}`);
  const action = actions[0];

  return blocks.map((block) => {
    if (block.accessory?.action_id && block.accessory.value === action.value) {
      return addOrRemoveUser(block, username);
    } else {
      return block;
    }
  });
};

const setupActions = (app) => {
  app.action("button_select_workplace", async ({ ack, body, context }) => {
    await ack();

    try {
      console.log(
        `select_workplace_action triggered by user @${body.user.username}`,
      );
      const blocks = await updateBlocks(
        body.user.id,
        body.message.blocks,
        body.actions,
      );

      const result = await app.client.chat.update({
        token: context.botToken,
        ts: body.message.ts,
        channel: body.channel.id,
        blocks,
        text: "updating responses",
      });

      if (result.ok) {
        console.log("Message updated OK");
      } else {
        console.error(`Error on message update: ${result.error}`);
      }
    } catch (e) {
      console.error(e);
    }
  });
};

module.exports = setupActions;
