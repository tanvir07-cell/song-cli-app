#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import 'dotenv/config'
import open from 'open'


const api = process.env.YOUTUBE_API


yargs(hideBin(process.argv))
  .command('song <name>', 'fetch the contents of the URL', () => {}, async (argv) => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${api}&type=video&q=${argv.name}&maxResults=1`
  
  const response = await fetch(url)
  const data = await response.json();
  const id = data.items[0].id.videoId

  const playSong = await open(`https://www.youtube.com/watch?v=${id}`)  
  })
  .demandCommand(1)
  .parse()
