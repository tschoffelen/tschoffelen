const fs = require("fs")
const path = require("path")
const slug = require("slug")
const { format } = require("date-fns")
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const base = path.join(__dirname, "..", "..", "content")

if (process.argv.length < 3) {
  console.error(
    '\nEnter a post title as a parameter:\n   yarn new "My new post"\n'
  )
  process.exit(1)
}

const title = process.argv.slice(2).join(" ")
const name = slug(title)
const dir = path.join(base, name)

const body = `---
title: ${title}
date: ${format(new Date(), "yyyy-MM-dd")}
category: Writing
---\n\n`

;(async () => {
  await exec("git checkout master")
  await exec("git pull")
  await exec(`git checkout -b '${name}'`)

  if (fs.existsSync(dir)) {
    console.error("\nError: that post name already exists.\n")
    process.exit(1)
  }

  fs.mkdirSync(dir)
  fs.writeFileSync(path.join(dir, "index.md"), body, "utf-8")

  return exec(`subl '${dir}'`)
})()
