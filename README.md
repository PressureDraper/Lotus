# 🌸 Introduction 🌸
Lotus is a simple but powerful Discord bot made over Node.js that plays music from Youtube and Spotify immersed into Warframe game thematic. ❤️

![Imagen](https://images-ext-2.discordapp.net/external/UyBnKuFc1uvUQkQdiU58TdWK4KPtJCZVMbA1PsoKsJc/https/64.media.tumblr.com/8419269fba8f8141cdb286199c26e7d0/cae3ab100cfd2b48-35/s540x810/87dcc421e7b173a108abea55120ee1f9315c5b10.gifv)

# 🌸 Requirements 🌸

- Have [discord app](https://discord.com/developers/applications/) already created.
- Have installed [node.js](https://nodejs.org/es/).
- Have created a target folder where all files will be storaged.
- Have enabled [Discord developer mode](https://www.youtube.com/watch?v=13LeA6m9kU8) (random info video)

# 🌸 Installing dependencies 🌸
`To avoid problems with packages, init node_modules folder and install modules as follows:`

```
Execute all commands on the target folder you already created❗︎
```

1. npm init 
2. npm install discord.js
3. npm install distube
4. npm install @distube/yt-dlp@latest
5. npm install ffmpeg-static
6. npm install @discordjs/opus
7. npm install @distube/spotify@latest
8. npm install libsodium-wrappers

After this you should be ready to rock! 🥰

# 🌸 Configuration 🌸

- Clone or create your own [config.json](/config.json) file.
- Put your main ID discord channel on the ready listener. (*line 34*) - right click on the channel -> copy ID
![image](https://user-images.githubusercontent.com/61709144/154240715-7c223f45-d466-4a5f-86ff-0ace07795eb0.png)
- Change **prefix** if you want, displayed in [lotus.js](/lotus.js) file. (*line 30*)
- Change **channel.send** messages for your bot.
- Change **client.distube** arguments if you want to. (*line 17 - 20*)
- Personalize embed message to the user who use `help` command.

I highly recommend you to check out [Distube.js](https://distube.js.org/#/docs/DisTube/stable/general/welcome) and [Discord.js](https://discord.js.org/#/docs/discord.js/stable/general/welcome) documentation to get a better understanding of the using of all stuff. 😉

# 🌸 Lotus 🌸

If you want to invite Lotus to your discord, use the following [link](https://discord.com/api/oauth2/authorize?client_id=930573366648270849&permissions=8&scope=bot). (*You must have admin permissions on the target server*)

![image](https://user-images.githubusercontent.com/61709144/154245426-3a4200b6-0b86-439f-b359-e083966eb69b.png)

## Commands

:cherry_blossom: Music :cherry_blossom:

`*play song name` or `*p song name` : Play any song/playlist from Youtube or Spotify ~ :arrow_forward:

`*repeat` or `*loop all` : Repeat all queue songs ~ :arrows_counterclockwise:

`*repeat` or `*loop single` : Repeat only current song ~ :repeat_one:

`*repeat` or `*loop off` : Switch to off repeat mode ~ :x: :arrows_counterclockwise:

`*stop` : Empty current queue and stop the music ~ :no_entry_sign:

`*song` : Displays the name of the current playing song ~ :one: :notes:

`*pause` : Pause current song or queue ~ :pause_button:
 
`*resume` : Continue playing songs ~ :play_pause:

`*skip` : Skip current song ~ :track_next:

`*queue` or `*q` : Show current song list ~ :1234:

`*shuffle` : Shuffle current playlist songs : :twisted_rightwards_arrows:

`*volume 0 - 100` : Only when a song is playing, you can use this command to increase or decrease Lotus volume ~ :sound: :loud_sound:

:cherry_blossom: Filters :cherry_blossom:

**Only** when a song is playing, you can choose one of these filters to change music perception:

`*3d` | `*bassboost` | `*echo` | `*karaoke` | `*nightcore` | `*vaporwave`

`Note: To turn off any filter, just type the command of the filter you selected again.`

:cherry_blossom: Management :cherry_blossom:

`*join` : Tell Lotus to join your current voice channel ~ :cherry_blossom: :blush:

`*leave` : Tell Lotus to leave your current voice channel ~ :sob: :ok_hand:

`*ping` : Check if Lotus is being chased by Ballas again showing her heartbeat ~ :heartbeat:
