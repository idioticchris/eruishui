module.exports = (client, member, args) =>{

const channel = member.guild.channels.find(
    channel => channel.name === "👤"
  );
  if (!channel) return;

  channel.send(`Paalam at wag kanang babalik bwesit! ${member}`);
}