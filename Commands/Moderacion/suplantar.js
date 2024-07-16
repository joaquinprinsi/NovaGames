const { SlashCommandBuilder } = require("discord.js");
module.exports = {
   data: new SlashCommandBuilder()
    .setName("personificar")
    .setDescription("te hace ver como otra persona")
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("Mention a user to impersonate")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("mensaje")
        .setDescription("¿Qué mensaje quieres que escriba el usuario?")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { options } = interaction;

    const member = options.getUser("usuario");
    const message = options.getString("mensaje");
    interaction.channel
      .createWebhook({
        name: member.username,
        avatar: member.displayAvatarURL({ dynamic: true }),
      })
      .then((webhook) => {
        webhook.send({ content: message });
        setTimeout(() => {
          webhook.delete();
        }, 3000);
      });
    interaction.reply({
      content: "**> El usuario ha sido suplantado con éxito**",
      ephemeral: true,
    });
  },
};