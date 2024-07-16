const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const boobjob = [
"https://images-ext-1.discordapp.net/external/y1HVHKhp0Www--Ekc-55PUbQbWFSlnxs_Xq8kmXbSQ4/https/nekocdn.com/images/BOVIIkIJ.gif?width=523&height=393",
    "https://cdn.sex.com/images/pinporn/2021/02/03/24509109.gif?width=300",
    "https://cdn.sex.com/images/pinporn/2020/03/14/22724237.gif?width=300",
    "https://cdn.sex.com/images/pinporn/2021/06/17/25376724.gif?width=300",
    "https://cdn.sex.com/images/pinporn/2022/12/13/28550139.gif?width=300",
    "https://images-ext-1.discordapp.net/external/Nv1pdhqJw47LcHK_Ja02f5Xx7ZmtX0iN4R0WhDjK0qw/https/nekocdn.com/images/Q-79ZToz.gif?width=268&height=201",
    "https://images-ext-1.discordapp.net/external/vCMrvwzWfXj9ZV9tCZhpuIVAgo0G_zhaao3UVJt5tzI/https/nekocdn.com/images/BZjFOdi3.gif?width=698&height=393",
    "https://images-ext-1.discordapp.net/external/ZOwgCTwu_5aBW3L3GwFm2P_Ek4FZpzZGB8S0xgRj-Go/https/nekocdn.com/images/f6Ux6ooJ.gif?width=697&height=393",
    "https://images-ext-1.discordapp.net/external/WJMd0IVbZAIIFHpS0qMnGPZSk2ZZ2u2fD5m8ugrbE24/https/nekocdn.com/images/KTm1iDF0.gif?width=523&height=393",
    "https://images-ext-1.discordapp.net/external/W97gngMHa_l_22CwPrRJZxrlvqV4hka4YF6pBojFkwc/https/nekocdn.com/images/ggcgp-J6.gif?width=523&height=393",
    "https://images-ext-2.discordapp.net/external/VJ0m2EYtGtthun_EYy-kXqNgEpXXeOPFow1rxs9ghto/https/nekocdn.com/images/Yg1XFPf0.gif?width=483&height=272",
    "https://images-ext-1.discordapp.net/external/jLvwZgY55geYuN42_KNMMVj2Dt4ZF_gHvhKvsVSf4qM/https/nekocdn.com/images/oJ0NmBpO.gif?width=368&height=393",
    "https://images-ext-2.discordapp.net/external/p7tR1ZqWOsBhUdzGfV0X4sJKSOSzKxgN38Z6Id76ssE/https/nekocdn.com/images/GBxW7w5S.gif?width=555&height=311",
    "https://images-ext-1.discordapp.net/external/Dm7ZfpzgTnU9yX5XAZdqK3Ez6EzkBwlqdWXu4ogqaqI/https/nekocdn.com/images/eEiWuJ0P.gif?width=447&height=252",
    "https://images-ext-1.discordapp.net/external/vnzDbjSou9RDt1uo70dygBpZLjlD8hJl5tiu7Fdd_Ao/https/nekocdn.com/images/pSypvv1x.gif?width=523&height=393",
    "https://images-ext-2.discordapp.net/external/V6b33le7aqiIZmlEc_fg8O3menFOUtxuQKlM9d45weA/https/nekocdn.com/images/KRPMW4Xz.gif?width=589&height=393",
    "https://images-ext-1.discordapp.net/external/yI95yJRcE8oCuWH24KjB5X9a9RttfCvim8YZjnH48ow/https/nekocdn.com/images/WgEbkuF1.gif?width=483&height=272",
    "https://images-ext-2.discordapp.net/external/0HpAj47FrODIvXvCHfBLkJNfA3YZ8_SmM177w2esyCk/https/nekocdn.com/images/JriyVaHa.gif?width=523&height=393",
    "https://images-ext-2.discordapp.net/external/IHKPk9ZTGYqNbC3N1y_8syWRyhI2P6Sx-IXqbXfWcs4/https/nekocdn.com/images/eq5MsR7H.gif?width=523&height=393",
    "https://images-ext-2.discordapp.net/external/9EYgXqaSWOscyMr_7N4Ui2goX7Ar1FuzsIzbWgXCHQU/https/nekocdn.com/images/RV3PWPQT.gif?width=523&height=393",//20
    
];

// Variable global para almacenar el recuento de usos del comando por usuario
const commandCount = {};

module.exports = {
  premiumOnly: false,
  data: new SlashCommandBuilder()
    .setName("boobjob")
    .setDescription("¡Asle usa rusa a alguien!")
    .addUserOption(option =>
      option.setName("target")
        .setDescription("¿A quién le quieres hacer una rusa?")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (!interaction.channel.nsfw) {
      return interaction.reply({ content: 'Este comando solo puede ser usado en canales NSFW.', ephemeral: true });
    }

    const { options, member } = interaction;
    const user = options.getUser("target");
    const userId = member.user.id;    



    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Random")
          .setImage(boobjob[Math.floor(Math.random() * boobjob.length)])
          .setDescription(`${member} Le hizo una rusa a ${user}!`) 
      ]
    });
  }
};