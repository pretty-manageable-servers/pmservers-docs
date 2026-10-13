---
title: Voice
description: Talk with Slopbot in a Discord voice channel. Learn how speech is posted, how long spoken answers are and how voice counts toward your limits.
sidebar:
  order: 7
---

Slopbot can join a Discord voice channel. You speak. Slopbot answers with its normal model and tools. It posts the answer in the text chat of the voice channel, and it reads the answer aloud.

## Start a voice session

1. Join a voice channel.
2. Run `/slopbot voice action:join`. Slopbot joins the channel.
3. Speak. Slopbot answers.

Run `/slopbot voice action:status` to check the session. Run `/slopbot voice action:leave` to make Slopbot leave. Slopbot also leaves when the channel is empty, or after five minutes with no activity.

A server admin must give Slopbot the View Channel, Connect, Speak and Send Messages permissions in the voice channel. Stage channels are not supported.

## What you see and hear

- When you speak, Slopbot transcribes your speech. It posts the text in the voice channel text chat as you. The post shows your name. If the channel has no webhook, Slopbot posts `**Name** (from voice): text`.
- Slopbot posts its answer in the same chat.
- Slopbot reads the answer aloud. A spoken answer is short: one to three sentences. Speech stops at 600 characters. The full answer stays in the text chat.
- When Slopbot starts a tool, it says "One moment."

## Turns

- Slopbot handles one speaker at a time.
- Slopbot ignores other speech until its answer is spoken. Wait for the answer before you speak again.
- Each utterance is limited to 30 seconds.

## Usage limits

Speech and replies count toward the usage limits of the person who spoke. See [Usage and limits](/slopbot/usage-and-limits/).
