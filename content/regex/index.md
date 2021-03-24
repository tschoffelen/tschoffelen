---
title: Practical regular expressions
date: 2020-07-26
category: Dev basics
---

Regular expressions (regex) are one of those topics that a lot of developers find difficult to get started with. I think that's not because they're so complicated, but because they look quite daunting to start with.

There's a lot of seemingly random characters and brackets and special characters. Take this example, which matches any URI:

```regex
/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
```

That just looks terrifying.

There are a lot of simple practical applications for regular expressions though, and since almost every programming language supports them out-of-the-box, it is good to know some basics.


## The basics

Regular expressions are used to extract or replace parts of text strings. You do that by specifying rules for what characters you want to extract.


## Groups of characters

Let's imagine we want to match the last words of every sentence in a paragraph of text. That probably means we want to select all letters preceding a period, exclamation mark or a question mark. What would that look like in regex?

```regex
[a-z]+(\.|\?|!)
```

If we ran that regex on the previous paragraph, it would yield these results:

```json
[
    "text.",
    "mark.",
    "regex?"
]
```

Okay, bit by bit now:

* `[a-z]` means match every character between **a** and **z**
* `+` means _at least one or more_ and applies to whatever directly precedes it
* `()` is a way of defining a group, and the pipe characters are the different options we want to match. So `(a|b)` means any character that is either **a** or **b**.
* `\.` and `\?` have slashes before them because those characters have special meaning in regex (`.` is similar to `+`, but means _zero or more_, `?` means the group before it is optional). The slashes are a way to _escape_ those characters, so that we can match them as a normal characters without special regex meaning.


## Exact number of matched characters

What if I want to get all the 5-letter words from this sentence? Instead of just using `+` and `.` to specify how many matches you want, you can also specify an exact number of matches:

* To match all 5-letter words: `[a-z]{5}`
* To match all words with more than 4 letters: `[a-z]{4,}`
* To match all words between 1 and 3 letters: `[a-z]{1,3}`


## Matching other stuff than just letters

Okay, so we know what `[a-z]` does, and also took a quick peek at `(a|b)`. But there's some other options:

* `[abc]` is the same as `(a|b|c)` – matches any of **a**, **b**, **c**
* `[0-9]` matches a character between **0** and **9**
* `[0-9a-b]` matches a character between **0** and **9** and **a** and **z**

But there's also some shortcodes to simplify common expressions:

* `\d` is the same as `[0-9]`
* `\w` matches any word character (equal to `[a-zA-Z0-9_]`)
* `\s` matches any type of white space (spaces, tabs, etc.)


## Start and end

So we now know how to find matches anywhere in our text string. What if we want to only match something when it's at the start or end of a string?

This would give you the first word in the string:

```regex
^\w+
```

* `^` specifies the string has to start with your expression to match
* `$` specifies the string has to end with your expression

Combining these two gives you a perfect way to check if the full string matches your expression. Consider wanting to check if the input is a valid numberic string between 8 and 10 characters long:

```regex
^\d{8,10}$
```


## Lookaheads, backreferences, match sets, and more

These are just the basics you will most often need.

There's much more in the wonderful world of regex, like being able to check if something matches your expression and is or isn't [preceded with another expression](https://www.regular-expressions.info/refcapture.html).


## A practical example

So how would you use all of this in practice? Well, imagine you have this bit of HTML representing a product in a web shop.

```html
<a href="/products/234923" class="product">
    <img src="/images/product-image-234923.png"/>
    Desk lamp
    <span class="price">$49.95</span>
</div>
```

How would you extract the price from that? Let's write our regular expression first.

```regex
<span class="price">([^<]+)<\/span>
```

And then use the programming language of your choice to invoke it. Let's go for Javascript here.

```js
const html = '<a href="...';
const regex = /<span class="price">([^<]+)<\/span>/

console.log(regex.exec(html)) // ['<span...', '$49,95']
```


## Tools

* Test regular expressions in the browser using [regexr.com](https://regexr.com/) or try the amazing [Expressions](https://apptorium.com/expressions) app for Mac.
* Use this helpful [cheat sheet](https://cheatography.com/davechild/cheat-sheets/regular-expressions/).
