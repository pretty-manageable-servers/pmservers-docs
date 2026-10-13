---
title: Usage and limits
description: Each member has a 5-hour limit and a 7-day limit for Slopbot in each server. Learn how the windows, the grace and the resets work.
sidebar:
  order: 5
---

Slopbot limits how much each member can use it. Each member has two limits in each server.

| Window | Default limit |
|---|---|
| 5 hours | $2.00 of model cost |
| 7 days | $20.00 of model cost |

The limit counts the cost of the model calls that Slopbot makes for you. It does not count messages. A server admin can change these limits. A limit of 0 means that the window has no limit.

## How a window works

- A window starts at your first use after the last window ended.
- A 5-hour window lasts 5 hours. A 7-day window lasts 7 days.
- When a window ends, your usage in it returns to zero. Your next use starts a new window.

Slopbot charges each model call to the member whose message caused it. This includes replies, tool use and file reading. Work that has no member behind it is not charged.

## Your usage

Members see usage as a percent of each limit. Members do not see money amounts. You can see your usage in:

- The usage meter in the [web console](/slopbot/web-console/#usage).
- The `/usage` command in Discord.
- The `usage` tool. Ask Slopbot how much usage you have left.

## When you reach a limit

- Slopbot does not start new work for you when a window is at its limit.
- Slopbot tells you when you can try again.
- A run that started before the limit can go past it. It can go up to 10% past the limit. This is the grace.
- When a run goes past the grace, Slopbot stops its later tool rounds.

## Resets

A banked reset clears one window at once. Use it when you need to work before the window ends.

- A team admin can give you banked resets for a window.
- To use a reset, use the reset option of `/usage`, or select **Use a reset** in the web console.
- You can use a reset on the 5-hour window or the 7-day window.
- If you have no banked reset for that window, Slopbot tells you.
