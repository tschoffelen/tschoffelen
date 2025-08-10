---
title: Building AI Workflows Using Alfred
date: 2025-08-10
description: Alfred has long been my launcher of choice, and I have dozens of custom workflows built for it, including lots of internal tools that help me quickly...
taxonomies:
  category:
    - Blog
extra: {}
---

[Alfred](https://www.alfredapp.com) has long been my launcher of choice, and I have dozens of custom workflows built for it, including lots of internal tools that help me quickly look up items in the databases of my various projects.

More and more, I'm building simple AI workflows within Alfred, so I thought I'd share how I go about it.

## Things todo workflow
Here's an example of a workflow that takes some text, and turns it into an actionable task in [Things](https://culturedcode.com/things/):

<img src="https://mirri.link/1KC19ZD" alt="Image" />

I use this one a lot to copy over Slack messages I've received or sent (e.g. "cool, I'll send the newsletter on Monday"), and have it turn this into a Things task ("Send newsletter on Monday").

After adding a keyword entry point, I added a little "Args and vars" utility to hold the prompt:

<img src="https://mirri.link/D2ZR_7s" alt="Image" />

This is useful, as it allows me to change the text of the prompt, without having to dive into the 'script' stage. The full prompt in this example looks like this:

```plain
Extract the title of a task from the text pasted in by the user. Make it actionable, e.g. including a verb. If the text passed in is already in this format, you don't need to change anything, other than cleaning up capitalisation and punctuation. Don't include a period at the end of the task title. 

Be as specific as possible with the title of the task, and extract as much information from the input as possible.

User input:

{query}
```

I pass through the original query as the variable `description`, so that I can add it to my task in Things for some additional context.

The 'Run script' stage looks like this:

<img src="https://mirri.link/bpBh4_C" alt="Image" />

It's a simple bash script that builds a JSON payload, then extracts the response text. Here it is in full:

```bash
#!/bin/bash

# Configuration
API_KEY="YOUR API KEY"
MODEL="gemini-2.5-flash-lite"
API_URL="https://generativelanguage.googleapis.com/v1beta/models/$MODEL:generateContent"

# Get input from Alfred
query="$1"

# Prepare the request body
request_body=$(cat <<EOF
{
  "contents": [
    {
      "parts": [
        {
          "text": "$query"
        }
      ]
    }
  ]
}
EOF
)

# Send request to Gemini API
response=$(curl -s -X POST "$API_URL?key=$API_KEY" \
	-H "Content-Type: application/json" \
	-d "$request_body")

# Extract and output the text response
echo "$response" | grep -o '"text": "[^"]*"' | head -1 | sed 's/"text": "\(.*\)"/\1/'
```

I found Gemini's 2.5 Flash Lite model to be best for this, since it's fast and small, and the prompt is simple enough to produce decent results. If you have a more complex prompt, you might want to go for Gemini Flash or Gemini Pro instead.

The last step simply involves opening Things with its [URL scheme](https://culturedcode.com/things/support/articles/2803573/):

<img src="https://mirri.link/CDZ9jrh" alt="Image" />

## Other uses
I have similar scripts to do other things. The main one I like is "create event from text", which allows me to quickly create a calendar event from some text.

I tend to copy some text from a web page or text message, and have it create a calendar event for me.

<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>