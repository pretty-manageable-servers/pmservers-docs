---
title: Project members
description: Invite people to a project. Members can do all that the owner can, but cannot delete the project.
sidebar:
  order: 4
---

You can invite other people to a project. They get access at once.

## Roles

| Action | Owner | Member |
|---|---|---|
| See and use VMs, AI keys and activity | Yes | Yes |
| Create, start, stop and delete VMs | Yes | Yes |
| Create, rotate and revoke AI keys | Yes | Yes |
| Rename the project | Yes | Yes |
| SSH to the VMs of the project | Yes | Yes |
| Invite and remove members | Yes | No |
| Leave the project | No | Yes |
| Delete the project | Yes | No |

The person who creates a project is its owner. A project has one owner. You cannot change the owner.

## Usage and limits

All usage in a project counts against the owner's account. This includes the VMs and AI keys that a member creates, and the AI spend of all keys in the project.

The owner's limits apply. A member's own limits do not add to them. See [Limits](/billing/limits/).

## Invite a member

1. In the console, open the project, then **Settings**.
2. Under **Members**, type the email address, then click **Invite**.

- If the person has a PMS Cloud account, they are added at once.
- If not, they are added at once and get an email to set up a sign-in. Sign-ups are closed, so this invite is their way in.

A project can have up to 20 members.

## Remove a member or leave

- The owner clicks **Remove** next to a member.
- A member clicks **Leave** next to their own email.

The VMs and AI keys stay in the project. AI keys keep working. To stop a key, revoke or rotate it.

## SSH

Each member uses their own SSH keys. Your saved keys and the key that you gave at VM create can reach the VMs of all projects where you are the owner or a member. See [SSH](/vms/ssh/).

## API

See [Project members](/api/management/#project-members) in the API reference.
