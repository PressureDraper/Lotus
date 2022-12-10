const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const config = require("./config.json");
const { DisTube }  = require('distube');
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { SpotifyPlugin } = require('@distube/spotify')


const client = new Discord.Client({
	intents: [
	  Discord.GatewayIntentBits.Guilds,
	  Discord.GatewayIntentBits.GuildMessages,
	  Discord.GatewayIntentBits.GuildVoiceStates,
	  Discord.GatewayIntentBits.MessageContent
	]
});

client.distube = new DisTube(client, { 
	searchSongs: 5,
	emitNewSongOnly: false,
	leaveOnStop: false,
	leaveOnFinish: false,
	leaveOnEmpty: true,
	plugins: [
		new SpotifyPlugin({
			emitEventsAfterFetching: true
		}),
		new YtDlpPlugin()
	]
});

const prefix = "*";

client.on('ready', () => {
	//ID channel where main message will be displayed
	var channel = client.channels.cache.get("930572316696522775");
	//var channel = client.channels.cache.get("817270945315553350");
	channel.send("Hey, Kiddo. Ready to start your adventure?");
});

client.on('messageCreate', async message => {

	client.user.setActivity('Warframe | *help', { type: 'PLAYING' });
	/*{
		type: "STREAMING",
		url: "https://www.twitch.tv/example-url"
	}*/

	if (message.author.bot || !message.guild) return;
	if (!message.content.startsWith(prefix)) return;

	//args = array that saves all incoming words after prefix *command [ 'p', 'args' ]
	const args = message.content.slice(prefix.length).trim().split(" ");
	//saving only main command on variable and removing main command from args array
	const command = args.shift().toLowerCase();

	if (command === 'play' || command === 'p'){
		if (!message.member.voice.channel) return message.channel.send("Hey, Kiddo. Please join to a voice channel first. :cherry_blossom:")
		if (args.length === 0){
			message.channel.send("You should enter a song name, Tenno. :cherry_blossom:");
		}else{
			try {
				client.distube.play(message.member.voice?.channel, args.join(' '), {
					member: message.member,
					textChannel: message.channel,
					message
				});
			} catch (e) {
				console.log(e);
			}
		}
	}

	if (command === 'song') {
		if (!message.member.voice.channel) return message.channel.send("Hey, Kiddo. Please join to a voice channel first. :cherry_blossom:")
		let queue = client.distube.getQueue(message);
		if (!queue) {
        	message.channel.send("There's nothing playing now, Tenno. :cherry_blossom:")
        } else {
        	message.channel.send('Now playing: ' + queue.songs.map((song) =>
            `${song.name} (\`${song.formattedDuration}\`)`).slice(0, 1));
        }
	}

	if (command === 'ping') {
		try {
			message.channel.send(`I'm alive, Tenno. :cherry_blossom:\nHeartbeat: ${client.ws.ping}ms.`);
		} catch(e) {
			console.log(e);
		}
	}

	if (command === 'repeat' || command === 'loop'){
		if (!message.member.voice.channel) return message.channel.send("Hey, Kiddo. Please join to a voice channel first. :cherry_blossom:")
		let queue = client.distube.getQueue(message);
		if (!queue) return message.channel.send("There's nothing playing now, Tenno. :cherry_blossom:");
		try {
			if (args[0] === undefined) {
				message.channel.send("Correct usage: \`*repeat or *loop single | all | off\`")
			} else {
				if (args[0].toLowerCase() === "single") {
					client.distube.setRepeatMode(message, 1);
					message.channel.send(`Set repeat mode to \`Single\``)
				}
				if (args[0].toLowerCase()  === "all") {
					client.distube.setRepeatMode(message, 2);
					message.channel.send(`Set repeat mode to \`All\``)
				}
				if (args[0].toLowerCase() === "off") {
					client.distube.setRepeatMode(message, 0);
					message.channel.send(`Set repeat mode to \`Off\``)
				}
			}
		} catch(e) {
			console.log(e);
		}
	}

	if (command === "stop") {
		if (!message.member.voice.channel) return message.channel.send("Hey, Kiddo. Please join to a voice channel first. :cherry_blossom:")
		let queue = client.distube.getQueue(message);
		if (!queue) return message.channel.send("There's nothing playing now, Tenno. :cherry_blossom:");
        client.distube.stop(message);
        message.channel.send("The music has been stopped, my child. :cherry_blossom:");
    }

	if (command === "pause") {
		if (!message.member.voice.channel) return message.channel.send("Hey, Kiddo. Please join to a voice channel first. :cherry_blossom:")
		let queue = client.distube.getQueue(message);
		if (!queue) return message.channel.send("There's nothing playing now, Tenno. :cherry_blossom:");
		try {
			if (queue.playing === false) return; 
			else {
				client.distube.pause(message);
				message.channel.send("The music has been paused, Tenno. :cherry_blossom:");
			}
		} catch(e) {
			console.log(e);
		}
	}

	if (command === "resume") {
		if (!message.member.voice.channel) return message.channel.send("Hey, Kiddo. Please join to a voice channel first. :cherry_blossom:")
		let queue = client.distube.getQueue(message);
		if (!queue) return message.channel.send("There's nothing playing now, Tenno. :cherry_blossom:");
		try {
			if (queue.playing === true) return; 
			else {
				client.distube.resume(message);
				message.channel.send("Continue playing. :cherry_blossom:");
			}
		} catch(e) {
			console.log(e);
		}
	}

    if (command === "skip") {
    	if (!message.member.voice.channel) return message.channel.send("Hey, Kiddo. Please join to a voice channel first. :cherry_blossom:")
    	let queue = client.distube.getQueue(message);
    	if (!queue) return message.channel.send("There's nothing playing now, Tenno. :cherry_blossom:");
    	try {
    		if (queue.songs.length > 1) {
    			client.distube.skip(message);
    		} else if (queue.songs.length === 1) {
    			client.distube.stop(message);
    			message.channel.send("The music has been stopped, my child. :cherry_blossom:");
    		}
    	} catch(e) {
    		console.log(e);
    	}
    }

    if (command === "queue" || command === "q") {
    	if (!message.member.voice.channel) return message.channel.send("Hey, Kiddo. Please join to a voice channel first. :cherry_blossom:")
        let queue = client.distube.getQueue(message);
        if (!queue) {
        	message.channel.send("There's nothing playing now, Tenno. :cherry_blossom:");
        } else {
        	message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} (\`${song.formattedDuration}\`)`
        	).slice(0, 10).join("\n"));
        }
    }

    if (command === 'shuffle') {
		try {
			let queue = client.distube.getQueue(message);
			if (!queue) {
				message.channel.send("There's nothing playing now, Tenno. :cherry_blossom:")
	        } else if (queue.songs.length > 2) {
	        	client.distube.shuffle(message);
	        	message.channel.send(`Current queue has been shuffled. :notes:`);
			} else if (queue.songs.length < 2) {
				message.channel.send("There need to be more than 2 songs to shuffle the queue, Tenno. :cherry_blossom:");
			}
		} catch(e) {
			console.log(e);
		}
	}

    if (command === "join") {
    	try {
    		ch = message.member.voice.channel;
        	client.distube.voices.join(ch);
    	} catch(e) {
    		console.log(e);
    	}
    }

    if (command === "leave") {
    	try {
    		client.distube.voices.leave(message);
    	} catch(e) {
    		console.log(e);
    	}
    }

    if (command === "volume") {
    	if (!message.member.voice.channel) return message.channel.send("Hey, Kiddo. Please join to a voice channel first. :cherry_blossom:")
    	try {
    		let queue = client.distube.getQueue(message);
	        if (!queue) {
	        	message.channel.send("There's nothing playing now, Tenno. :cherry_blossom:")
	        } else {
	        	if (args[0] > 100 || args[0] < 0 ) {
	    			message.channel.send("Please type a number between 0 :sound: - 100 :loud_sound:, Tenno. :cherry_blossom:")
	    		} else {
		    		client.distube.setVolume(message, Number(args[0]));
		    		message.channel.send(`Set volume to \`${args[0]}\`%`)
	    		}
	        }
    	} catch (e) {
    		message.channel.send("Correct usage: \`*volume 0 - 100\`")
    		console.log(e);
    	}
    }

    //when playing a song, one of this filters can be selected
    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
    	if (!message.member.voice.channel) return message.channel.send("Hey, Kiddo. Please join to a voice channel first. :cherry_blossom:")
    	let queue = client.distube.getQueue(message);
		if (!queue) return message.channel.send("There's nothing playing now, Tenno. :cherry_blossom:");
		try {
			const filter = client.distube.setFilter(message, command)
        	message.channel.send(`Current queue filter: \`${filter.join(", ") || "Off"}\``)
		} catch (e) {
			message.channel.send(`Could not apply ${filter.join(", ")} filter for that song my child. :cry:`)
			console.log(e)
		}
    }

    if (command === 'help') {
    	let desc = `
    	:cherry_blossom:  *Music*  :cherry_blossom:\n
\\*play \`song name\` or \\*p \`song name\` : Play any song/playlist from Youtube or Spotify ~ :arrow_forward: 
\\*repeat or \\*loop \`all\` : Repeat all queue songs ~ :arrows_counterclockwise:
\\*repeat or \\*loop \`single\` : Repeat only current song ~ :repeat_one:
\\*repeat or \\*loop \`off\` : Switch to off repeat mode ~ :x: :arrows_counterclockwise:
\\*stop : Empty current queue and stop the music ~ :no_entry_sign:
\\*song : Display the name of the current playing song ~ :one: :notes:
\\*pause : Pause current song or queue ~ :pause_button:
\\*resume : Continue playing songs ~ :play_pause:
\\*skip : Skip current song ~ :track_next:
\\*queue or \\*q : Show current song list ~ :1234:
\\*shuffle : Shuffle current playlist songs : :twisted_rightwards_arrows:
\\*volume \`0 - 100\` : **Only** when a song is playing, you can use this command to increase or decrease Lotus volume (Default is 100) ~ :sound: :loud_sound:\n
:cherry_blossom:  *Filters*  :cherry_blossom:\n
**Only** when a song is playing, you can choose one of these filters to change music perception:
\\*3d | \\*bassboost | \\*echo | \\*karaoke | \\*nightcore | \\*vaporwave

*Note*: To turn off any filter, just type the command of the filter you selected again.\n
:cherry_blossom:  *Management*  :cherry_blossom:\n
*join : Tell Lotus to join your current voice channel ~ :cherry_blossom: :blush:
*leave : Tell Lotus to leave your current voice channel ~ :sob: :ok_hand:
*ping : Check if Lotus is being chased by Ballas again showing her heartbeat ~ :heartbeat: 
`;
    	const membed = new EmbedBuilder()
    		.setColor('#945AFA')
    		.setTitle('These are all my useful commands:')
    		.setDescription(`${desc}`)
    		.setImage('https://64.media.tumblr.com/8419269fba8f8141cdb286199c26e7d0/cae3ab100cfd2b48-35/s540x810/87dcc421e7b173a108abea55120ee1f9315c5b10.gifv')
    		.setTimestamp()
    		.setFooter({ text: '-Lotus Fragment', iconURL: 'https://content.invisioncic.com/Mwarframe/pages_media/1_KedLotus.png' });
		message.author.send({ embeds: [membed] });
		message.channel.send("Hey, kiddo. I've sent you all commands as private message. :cherry_blossom:");
	}
});
//https://cdn.fanbyte.com/wp-content/uploads/2021/12/warframe-new-war-lotus.png?x60655
//Distube event listeners
client.distube
    /*.on("playSong", (queue, song) => queue.textChannel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)
    )*/
    .on("addSong", (queue, song) =>
        queue.textChannel.send(`Added ${song.name} (\`${song.formattedDuration}\`) to the queue by ${song.user}`)
    )
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (queue, playlist) => {
        queue.textChannel.send(
            `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue:\n`
        )
        queue.textChannel.send(queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} (\`${song.formattedDuration}\`)`
        ).slice(0, 10).join("\n"))
    })
    // DisTubeOptions.searchSongs > 1
    .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send(
            `**Choose an option from below**\n${result
                .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
                .join("\n")}\n*Enter anything else or wait 30 seconds to cancel*`
        )
    })
    .on("finish", queue => queue.textChannel.send("All queue songs has been played, Tenno. :cherry_blossom:"))
    //.on("finishSong", queue => queue.textChannel.send("Finish song!"))
    //.on("disconnect", queue => queue.textChannel.send("Disconnected!"))
    .on("empty", queue => queue.textChannel.send("It seems there's no one here...\nSee you later, travelers. :cherry_blossom:"))
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled.`))
    .on("searchNoResult", (message, query) => message.channel.send(
		`No results found for ${query}`
	))
    .on("searchInvalidAnswer", (message) => message.channel.send(
		'Please type a valid number, Tenno. :cherry_blossom:'
	))
	.on("initQueue", queue => {
		queue.volume = 100;
	})
    .on("searchDone", () => {})
    .on("error", (error) => {
    	console.log(error);
    });

client.login(config.BOT_TOKEN)

/* Set username
client.user.setUsername('discordjs')
  .then(user => console.log(`My new username is ${user.username}`))
  .catch(console.error);
*/

/* set avatar
client.user.setAvatar('./avatar.png')
  .then(user => console.log(`New avatar set!`))
  .catch(console.error);
*/