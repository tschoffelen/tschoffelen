---
title: Using Gemini in My Todo Flow
date: 2025-06-17
description: Maybe it's taken too long, but I more and more am actually integrating little LLM tools into my daily workflows, other than coding and chat.  This...
taxonomies:
  category:
    - Blog
extra: {}
---

Maybe it's taken too long, but I more and more am actually integrating little LLM tools into my daily workflows, other than coding and chat.

This week, I've added Gemini into my flow to add tasks into [Things](https://culturedcode.com/things/). I often will receive a Slack message that contains a task, or will reply to someone saying "Okay, I'll take care of doing X later today."

Rather than having to turn this into a task in Things, I use an [Alfred](https://www.alfredapp.com/) workflow to have Gemini turn the message into an actionable task:

<img src="https://mirri.link/XHzluuN" alt="Image" />

The flow for this is very simple:
<img src="https://mirri.link/-GDr1eU" alt="Image" />

An 'Arg and vars' block contains the prompt:

```text
Extract the title of a task from the text pasted in by the user. Make it actionable, e.g. including a verb. If the text passed in is already in this format, you don't need to change anything, other than cleaning up capitalisation and punctuation. Don't include a period at the end of the task title. 

Be as specific as possible with the title of the task, and extract as much information from the input as possible.

User input:

{query}
```

And then a simple bash script runs it through Gemini 2.5 Flash:

```bash
# Configuration
API_KEY="YOUR API KEY HERE"
MODEL="gemini-2.5-flash-preview-05-20"
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


<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>