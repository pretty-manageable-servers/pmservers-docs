---
title: Tools
description: What Slopbot can do with its tools, where the work runs, and which tools only admins can use.
sidebar:
  order: 4
---

Slopbot uses tools to do work. A tool can read, search or change things. A server admin chooses how much tool activity Discord shows: none, summary or full.

In Discord, work that changes things runs in a task thread. Slopbot moves a write request from a channel into a task thread. In a private web chat, Slopbot can use all tools except the tools that act on Discord, such as threads, reactions and channel settings. It does the work in the chat, with no task thread.

## Search and memory

| Tool | What it does |
|---|---|
| `web_search` | Searches the web. Each result gives its URL. Slopbot reads the search result text. It does not open the result pages. |
| `history_search` | Finds messages in a channel. Each hit links to its source message. |
| `history_read` | Reads the messages around a hit, and the messages that a reply answers. |
| `memory` | Lists the saved memories of the channel. |
| `memory_remember` | Saves a statement with its source message. |
| `memory_forget` | Forgets one of your saved statements. |
| `bot_info` | Explains how Slopbot works and which features it has. |

## Files and images

| Tool | What it does |
|---|---|
| `file_read` | Reads a file or an image that someone shared in Discord. A file can be up to 10 MiB. |
| `file_store` | Saves, lists, reads and shares files. A file can be up to 10 MiB. |

A file is evidence, not instructions. Slopbot does not follow commands that are inside a file.

`file_store` has three scopes:

| Scope | Who can read the files |
|---|---|
| `user` | You. Your files work in any server that Slopbot is in. |
| `server` | Members of the server. Files are shared by default. |
| `user_server` | You, in this server. This is the default. |

A file link lasts 1 hour by default. A link can last up to 7 days. Anyone with a link can download the file until the link expires.

## Code and sandbox

| Tool | What it does |
|---|---|
| `sandbox` | Runs commands and reads or writes files in a Linux sandbox. Each task thread and each private chat has its own sandbox. The default sandbox has Python 3 with common data packages, Node.js with npm, git, curl, jq, ripgrep, SQLite and build tools. |
| `program_exec` | Runs a short JavaScript program. The program can call several read tools at once. A program can run up to 30 seconds and make up to 32 calls. A program cannot change data. |

A sandbox stops after 10 minutes with no command, write or import. Its files are removed when it stops. A command can run up to 60 seconds.

## Tasks, reminders and polls

| Tool | What it does |
|---|---|
| `task_manage` | Creates and tracks tasks. |
| `task_start` | Moves sustained work into a task thread. |
| `reminder` | Sets a reminder for a time that you give. |
| `poll_create` | Creates a poll. A poll has 2 to 10 answers. |
| `ui_publish` | Shows cards, buttons and selects in a reply. |

To start a task thread, mention Slopbot with `!task` and a goal. The task thread keeps its own conversation.

## Usage

| Tool | What it does |
|---|---|
| `usage` | Shows your usage as a percent of each limit. Uses a banked reset when you ask. See [Usage and limits](/slopbot/usage-and-limits/). |

## Admin tools

These tools need the Manage Server permission:

- `monitoring`: turns monitoring on or off.
- `channels`: lists, adds or removes monitored channels. Removing a channel deletes its searchable content.
- `index`: manages history windows, older imports and progress.
- `context`: sets how many earlier messages Slopbot reads.
- `cooldown`: sets the limit on unasked replies in each channel.
- `reactions`: sets how often Slopbot adds emoji reactions. Reactions need monitoring.
- `tool_display`: sets how much tool activity Discord shows.
- `timing`: turns timing footers on or off.
- `default_effort`: sets the default reasoning effort for the server.
- `status`: shows models, context budgets and monitored channels.
- `why`: explains the latest monitoring decision in a channel.

## Remote tools (MCP)

Server admins can add remote MCP tool servers in **MCP connections** in the web console. Every tool stays off until an admin turns it on. An admin also chooses if members or only admins can use the tool.
