const { loadCommands } = require("../../Handlers/commandHandler");

const config = require("../../config.json");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log("El cliente ya está listo");

    loadCommands(client);
  },
};

