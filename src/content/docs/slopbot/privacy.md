---
title: Privacy
description: Who can read Slopbot private chats, channel transcripts and shared links. What Slopbot keeps out of search and memory.
sidebar:
  order: 6
---

## Private chats

- Only the owner can open a private chat in the web console.
- Private chats are not in channel lists, history search or the memory index.
- Slopbot can read and search in a private chat. It cannot change anything there.
- Slopbot does not read Discord file attachments in a private chat yet.

## Channel transcripts

- Transcripts are off by default. Only an admin can turn them on, one channel at a time.
- When a transcript is on, anyone who can view the channel in Discord can open it.
- A transcript shows the tool steps and the thinking text of each run. Everyone who can open the transcript can see them.
- Plain threads do not appear in transcripts.

## Shared links

- A shared link is a frozen copy. It does not need a sign-in.
- Search engines do not index shared links.
- Anyone with a link can read it. Revoke a link when you no longer want people to read it.
- A link to a private chat stops working if the owner leaves the server.

## Messages, memory and totals

- Slopbot stores messages from the channels that an admin added. It does not store messages from other channels.
- A memory is a statement with its source message. You can forget your own statements with `memory_forget`.
- Slopbot keeps token and cost totals for each member and server. The totals are for statistics. Members see only percents of their limits. See [Usage and limits](/slopbot/usage-and-limits/).
