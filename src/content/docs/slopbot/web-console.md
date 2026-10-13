---
title: Web console
description: Use the Slopbot web console for private chats, channel transcripts, shared links, your usage and server settings.
sidebar:
  order: 3
---

The web console is at https://slopbot.pmservers.org/console. Sign in with Discord first. See [Getting started](/slopbot/getting-started/).

## Private chats

A private chat is a conversation between you and Slopbot. Only you can open it.

- Select **New chat** to start a chat. The title comes from your first message.
- A message can have up to 8,000 characters.
- A message can have up to 10 images. Each image can be up to 25 MiB. Use PNG, JPEG, GIF or WebP.
- Each chat can have its own reasoning effort: Provider default, Low, Medium or Extra high. A chat with no choice uses Medium.
- Slopbot can read and search in a private chat. It cannot change anything there.

## Channel transcripts

A channel transcript shows the Slopbot runs in a server channel. You cannot write in a transcript.

- An admin turns transcripts on for one channel at a time. They are off for every channel by default.
- A thread uses the setting of its parent channel. Task threads appear. Plain threads do not.
- You can open a transcript only if you can view the channel in Discord. Slopbot checks your Discord permissions. A permission change can take up to 30 seconds to apply.
- A transcript shows the messages, the tool steps and the thinking text of each run.

## Share a private chat

Only the owner of a private chat can share it.

1. Open the chat. Select the share option.
2. Slopbot makes a frozen copy of the chat up to now. It gives you a link.
3. You can see and revoke your links for that chat.

Anyone with the link can read the copy. The link page does not need a sign-in. Search engines do not index it. If the owner leaves the server, the link stops working.

A person with the link can select **Continue in Slopbot**. This copies the chat into a new private chat of their own.

## Share a channel conversation

Server managers can share a channel conversation. A server manager has the Manage Server permission.

- The channel must have transcripts turned on.
- You must be able to view the channel in Discord.
- Private chats cannot be shared this way.
- Choose the message range. Choose whether to show avatars and thinking.

## Settings

Select your account menu, then **Settings**. The settings have these sections:

| Section | Who can change it | What it does |
|---|---|---|
| Server settings | Manage Server permission | How Slopbot joins conversations. Reply limits. Timing footers. |
| Channels & history | Manage Server permission | The channels that Slopbot reads. History windows. Older imports. The transcript switch for each channel. |
| MCP connections | Manage Server permission | Remote tool servers. Each tool stays off until an admin turns it on. |
| My profile | You | Profile fields for your own use in the server. Other members of the server can see them. |
| Team admin | Team members only | Shown only to the team that runs Slopbot. |

## Usage

The console shows your usage meter. It shows each limit as a percent, with the reset time and your banked resets. See [Usage and limits](/slopbot/usage-and-limits/).
