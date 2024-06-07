---
title: Digital Archival with RClone
description: I got a notification the other day that my Dropbox storage was
  full. Weird, because I haven’t used my Dropbox account in about 5 years, but…
date: 2023-07-16T09:10:43.870Z
taxonomies:
  category:
    - Blog
extra: {}
---
I got a notification the other day that my Dropbox storage was full. Weird, because I haven't used my Dropbox account in about 5 years, but I guess they were done paying for the additional storage I was using for free after my paid account expired a long time ago.

I like to keep backups of my files in Google Drive and Dropbox, and keep historical records of things. Cloud storage is very cheap these days, so why not keep copies in case you need something someday.

So I decided I wanted to save a copy of my Dropbox storage to an S3 bucket for deep storage.

Turns out I had more than 300 GB of data in Dropbox, and I initially had no idea how to take it out of there and get it to S3 at a reasonable speed. I didn't want this to become a month-long project, which with my home internet speed it might have well become.

## Enter RClone

I remembered learning about a tool called [rclone](https://rclone.org), a cloud storage syncing tool inspired by `rsync`.

I spun up a quick AWS EC2 instance (the cheapest one) to give it manual bandwidth, and after about a minute of configuration I was able to run the command:

```bash
rclone sync dropbox: aws:thomas-backups/dropbox
```
 
That ran for about a day in the background (Dropbox's API has pretty strict rate limits for free accounts), and then I was able to delete my Dropbox account.

I haven't yet transitioned my backup in S3 [to Glacier](https://aws.amazon.com/s3/storage-classes/glacier/), but I might do that soon to shave a little bit off my S3 bill.