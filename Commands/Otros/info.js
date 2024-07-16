const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, GuildVerificationLevel, GuildExplicitContentFilter, GuildNSFWLevel} = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
	.setName('info')
	.setDescription("Obten informacion sobre el usuario.")
	.addSubcommand(subcommand => subcommand.setName("user").setDescription("Obten informacion sobre el usuario").addUserOption(option => option.setName("user").setDescription("Usuario del que quieres obtener la informacion sobre el usuario").setRequired(false)))
	.addSubcommand(subcommand => subcommand.setName("avatar").setDescription("Obten el avatar y banner del usuario").addUserOption(option => option.setName("user").setDescription("Usuario del que quieres obtener el avatar").setRequired(false)))
	.addSubcommand(subcommand => subcommand.setName("server").setDescription("Obten la informacion del servidor")),

	async execute (interaction, client) {
		const { options } = interaction;
		const sub = options.getSubcommand();

		switch (sub) {
			case 'user': {
			const user = options.getUser(`user`) || interaction.user;
        	const member = await interaction.guild.members.fetch(user.id);
        	const icon = user.displayAvatarURL();
        	const tag = user.tag;
        	const badges = user.flags.toArray().join(", ") || "Ninguna"; // join array into a string
        	const nick = member.displayName || "Ninguno"; // use "None" if nick is falsy (empty string or undefined)
			const isBot = user.bot ? "Sí" : "No";
			
        	const embed = new EmbedBuilder()
        	.setColor("Random")
        	.setThumbnail(icon)
        	.setDescription(`\`❓\`・${user}'s Information`)
        	.addFields({ name: `\`💳\`・ID:`, value: `${user.id || "None"}`, inline: false })
        	.addFields({ name: `\`📖\`・Nickname:`, value: `${nick}`, inline: false })
        	.addFields({ name: `\`🤖\`・Bot:`, value: `${isBot}`, inline: false })
        	.addFields({ name: `\`👋\`・Entro al Server:`, value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: false })
        	.addFields({ name: `\`👴\`・Entro a Discord:`, value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: false })
        	.addFields({ name: `\`📛\`・Insignias:`, value: `${badges}`, inline: false })
        	.setFooter({ text: tag, iconURL: icon })
			

        	await interaction.reply({ embeds: [embed] })
			}	
			break;
			
			case 'avatar': {
				const usermention = options.getUser(`user`) || interaction.user;
        		const avatar = usermention.displayAvatarURL({ size: 1024, format: "png"});
        		const banner = await (await client.users.fetch(usermention.id, { force: true })).bannerURL({ size: 4096 });
        		await interaction.channel.sendTyping()

        		const cmp = new ActionRowBuilder()
        		.addComponents(
        		    new ButtonBuilder()
        		    .setLabel(`Avatar`)
        		    .setCustomId(`avatar`)
        		    .setDisabled(true)
        		    .setStyle(ButtonStyle.Secondary),
				
        		    new ButtonBuilder()
        		    .setLabel(`Banner`)
        		    .setCustomId(`banner`)
        		    .setStyle(ButtonStyle.Secondary),
				
        		    new ButtonBuilder()
        		    .setLabel(`Delete`)
        		    .setCustomId(`delete`)
        		    .setStyle(ButtonStyle.Danger)
        		)
				
        		const cmp2 = new ActionRowBuilder()
        		.addComponents(
        		    new ButtonBuilder()
        		    .setLabel(`Avatar`)
        		    .setCustomId(`avatar`)
        		    .setStyle(ButtonStyle.Secondary),
				
        		    new ButtonBuilder()
        		    .setLabel(`Banner`)
        		    .setCustomId(`banner`)
        		    .setDisabled(true)
        		    .setStyle(ButtonStyle.Secondary),
				
        		    new ButtonBuilder()
        		    .setLabel(`Delete`)
        		    .setCustomId(`delete`)
        		    .setStyle(ButtonStyle.Danger)
        		)
				
        		const cmp3 = new ActionRowBuilder()
        		.addComponents(
        		    new ButtonBuilder()
        		    .setLabel(`Avatar`)
        		    .setCustomId(`avatar`)
        		    .setDisabled(true)
        		    .setStyle(ButtonStyle.Secondary),
				
        		    new ButtonBuilder()
        		    .setLabel(`Delete`)
        		    .setCustomId(`delete`)
        		    .setStyle(ButtonStyle.Danger)
        		)
				
        		const embed = new EmbedBuilder()
        		.setColor("Random") 
        		.setAuthor({ name: `${usermention.tag}, avatar`, iconURL: `${usermention.displayAvatarURL()}`})
        		.setTitle(`Download`)
        		.setURL(avatar)
        		.setImage(avatar)
				
        		const embed2 = new EmbedBuilder()
        		.setColor("Random")
        		.setAuthor({ name: `${usermention.tag}, banner`, iconURL: `${usermention.displayAvatarURL()}`})
        		.setTitle(`Download`)
        		.setURL(banner)
        		.setImage(banner)
				
        		if(!banner) { //checking if the user does not have a banner, so it will send profile icon.
        		  const message2 = await interaction.reply({embeds: [embed], components: [cmp3]});
        		  const collector = await message2.createMessageComponentCollector();
        		  collector.on(`collect`, async c => {
        		    if (c.customId === 'delete') {
					
        		      if (c.user.id !== interaction.user.id) {
        		        return await c.reply({ content: `${error} Solo ${interaction.user.tag} puede interactuar con los botones!`, ephemeral: true})
        		      }
				  
        		      interaction.deleteReply();
        		    }
        		  })
        		  return;
        		}
			
        		// sending embed with both profile icons, banner and avatar.
        		const message = await interaction.reply({ embeds: [embed], components: [cmp] });
        		const collector = await message.createMessageComponentCollector();
			
        		collector.on(`collect`, async c => {
				
        		    if (c.customId === 'avatar') {
					
        		      if (c.user.id !== interaction.user.id) {
        		        return await c.reply({ content: `${error} Solo ${interaction.user.tag} puede interactuar con los botones!`, ephemeral: true})
        		      }
				  
        		      await c.update({ embeds: [embed], components: [cmp]})
        		    }
				
        		    if (c.customId === 'banner') {
					
        		      if (c.user.id !== interaction.user.id) {
        		        return await c.reply({ content: `${error} Solo ${interaction.user.tag} puede interactuar con los botones!`, ephemeral: true})
        		      }
				  
        		      await c.update({ embeds: [embed2], components: [cmp2]})
        		    }
				
        		    if (c.customId === 'delete') {
					
        		      if (c.user.id !== interaction.user.id) {
        		        return await c.reply({ content: `${error} Solo ${interaction.user.tag} puede interactuar con los botones!`, ephemeral: true})
        		      }
				  
        		      interaction.deleteReply();
        		    }
        		  })
			}
			break;
			case 'server': {
				const { guild } = interaction;
        		const {
        		    members,
        		    channels,
        		    emojis,
        		    roles,
        		    stickers
        		} = guild;
			
        		const sortedRoles  = roles.cache.map(role => role).slice(1, roles.cache.size).sort((a, b) => b.position - a.position);
        		const userRoles    = sortedRoles.filter(role => !role.managed);
        		const managedRoles = sortedRoles.filter(role => role.managed);
        		const botCount     = members.cache.filter(member => member.user.bot).size;
			
        		const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
        		    let totalLength = 0;
        		    const result = [];
				
        		    for (const role of roles) {
        		        const roleString = `<@&${role.id}>`;
					
        		        if (roleString.length + totalLength > maxFieldLength)
        		            break;
					
        		        totalLength += roleString.length + 1; // +1 as it's likely we want to display them with a space between each role, which counts towards the limit.
        		        result.push(roleString);
        		    }
				
        		    return result.length;
        		}
			
        		const splitPascal = (string, separator) => string.split(/(?=[A-Z])/).join(separator);
        		const toPascalCase = (string, separator = false) => {
        		    const pascal = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
        		    return separator ? splitPascal(pascal, separator) : pascal;
        		};
			
        		const getChannelTypeSize = type => channels.cache.filter(channel => type.includes(channel.type)).size;
			
        		const totalChannels = getChannelTypeSize([
        		    ChannelType.GuildText,
        		    ChannelType.GuildNews,
        		    ChannelType.GuildVoice,
        		    ChannelType.GuildStageVoice,
        		    ChannelType.GuildForum,
        		    ChannelType.GuildPublicThread,
        		    ChannelType.GuildPrivateThread,
        		    ChannelType.GuildNewsThread,
        		    ChannelType.GuildCategory
        		]);
			
        		interaction.reply({ embeds: [
        		    new EmbedBuilder()
        		        .setColor(members.me.roles.highest.hexColor)
        		        .setTitle(`${guild.name}'s Information`)
        		        .setThumbnail(guild.iconURL({ size: 1024 }))
        		        .setImage(guild.bannerURL({ size: 1024 }))
        		        .addFields(
        		            { name: "Description", value: `📝 ${guild.description || "Ninguna"}` },
        		            {
        		                name: "General",
        		                value: [
        		                    `📜 **Creado** <t:${parseInt(guild.createdTimestamp / 1000)}:R>`,
        		                    `💳 **ID** ${guild.id}`,
        		                    `👑 **Owner** <@${guild.ownerId}>`,
        		                    `🌍 **Language** ${new Intl.DisplayNames(["en"], { type: "language" }).of(guild.preferredLocale)}`,
        		                    `💻 **Vanity URL** ${guild.vanityURLCode || "Ninguna"}`,
        		                ].join("\n")
        		            },
        		            { name: "Features", value: guild.features?.map(feature => `- ${toPascalCase(feature, " ")}`)?.join("\n") || "Ninguno", inline: true },
        		            {
        		                name: "Security",
        		                value: [
        		                    `👀 **Explicit Filter** ${splitPascal(GuildExplicitContentFilter[guild.explicitContentFilter], " ")}`,
        		                    `🔞 **Nivel de NSFW** ${splitPascal(GuildNSFWLevel[guild.nsfwLevel], " ")}`,
        		                    `🔒 **Nivel de Verificación** ${splitPascal(GuildVerificationLevel[guild.verificationLevel], " ")}`
        		                ].join("\n"),
        		                inline: true
        		            },
        		            {
        		                name: `Users (${guild.memberCount})`,
        		                value: [
        		                    `👨‍👩‍👧‍👦 **Miembros** ${guild.memberCount - botCount}`,
        		                    `🤖 **Bots** ${botCount}`
        		                ].join("\n"),
        		                inline: true
        		            },
        		            { name: `User Roles (${maxDisplayRoles(userRoles)} of ${userRoles.length})`, value: `${userRoles.slice(0, maxDisplayRoles(userRoles)).join(" ") || "Ninguno"}`},
        		            { name: `Managed Roles (${maxDisplayRoles(managedRoles)} of ${managedRoles.length})`, value: `${managedRoles.slice(0, maxDisplayRoles(managedRoles)).join(" ") || "Ninguno"}`},
        		            {
        		                name: `Channels, Threads & Categories (${totalChannels})`,
        		                value: [
        		                    `💬 **Texto** ${getChannelTypeSize([ChannelType.GuildText, ChannelType.GuildForum, ChannelType.GuildNews])}`,
        		                    `🔊 **Voice** ${getChannelTypeSize([ChannelType.GuildVoice, ChannelType.GuildStageVoice])}`,
        		                    `🧵 **Threads** ${getChannelTypeSize([ChannelType.GuildPublicThread, ChannelType.GuildPrivateThread, ChannelType.GuildNewsThread])}`,
        		                    `📑 **Categorias** ${getChannelTypeSize([ChannelType.GuildCategory])}`
        		                ].join("\n"),
        		                inline: true
        		            },
        		            {
        		                name: `Emojis & Stickers (${emojis.cache.size + stickers.cache.size})`,
        		                value: [
        		                    `📺 **Animated** ${emojis.cache.filter(emoji => emoji.animated).size}`,
        		                    `🗿 **Static** ${emojis.cache.filter(emoji => !emoji.animated).size}`,
        		                    `🏷 **Stickers** ${stickers.cache.size}`
        		                ].join("\n"),
        		                inline: true
        		            },
        		            { 
        		                name: "Nitro",
        		                value: [
        		                    `📈 **Tier** ${guild.premiumTier || "Ninguno"}`,
        		                    `💪🏻 **Boosts** ${guild.premiumSubscriptionCount}`,
        		                    `💎 **Boosters** ${guild.members.cache.filter(member => member.roles.premiumSubscriberRole).size}`,
        		                    `🏋🏻‍♀️ **Total Boosters** ${guild.members.cache.filter(member => member.premiumSince).size}`
        		                ].join("\n"),
        		                inline: true
        		            },
        		            { name: "Banner", value: guild.bannerURL() ? "** **" : "Ninguno" }
        		        	)
        				], ephemeral: false });
			}}
			
	}
}

