
module.exports = (client, member) =>{

  const channel = member.guild.channels.find(
    channel => channel.name === "👤"
  );
  if (!channel) return;

  channel.send(`Maligayang pagdating ${member}`);
};
  