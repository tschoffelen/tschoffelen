---
title: Integrating Safe Exam Browser
date: 2025-06-01
description: Safe Exam Browser is an app that can be installed on Mac, Windows and iOS to create a safe test taking environment for students that prevents some...
taxonomies:
  category:
    - Blog
extra: {}
---


[Safe Exam Browser](https://safeexambrowser.org/news_en.html) is an app that can be installed on Mac, Windows and iOS to create a safe test taking environment for students that prevents some basic ways of cheating, e.g. by switching to other apps, or copying and pasting content. 

It's supported by Moodle and various other e-learning tools.

Implementing it is not super difficult, but is not made very easy by the fact that the [developer documentation](https://safeexambrowser.org/developer/overview.html) on the website is not very clear, and there's many different methods.

Here's how to do it using the 'config keys' method, which at the time of writing seems to be the preferred way.

## Creating a settings file
The easiest way to get users to open the Safe Exam Browser with the correct URL and settings is to provide a link to a XML settings file, which can be opened through the `seb://` or `sebs://` URL scheme to open the app:

```
sebs://domain.com/example/config.seb
```

Would open SEB if it is installed and downloads the XML config from `https://domain.com/example/config.seb` (note the `s` in the `sebs://` URL scheme, you might want to use `seb://` if you're on localhost and need HTTP instead of HTTPS).

This file should contain a Apple-style XML [property list](https://en.wikipedia.org/wiki/Property_list):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>startURL</key>
	    <string>http://example.com/...</string>
        <key>sendBrowserExamKey</key>
        <false/>
        <key>browserWindowWebView</key>
        <integer>3</integer>
        <key>allowPreferencesWindow</key>
        <false/>
        <key>allowQuit</key>
        <true/>
        <key>showTaskBar</key>
        <true/>
        <key>allowWlan</key>
        <false/>
        <key>showTime</key>
        <false/>
        <key>allowSpellCheck</key>
        <false/>
        <key>showReloadButton</key>
        <true/>
        <key>showInputLanguage</key>
        <true/>
        <key>audioControlEnabled</key>
        <false/>
        <key>audioMute</key>
        <false/>
        <key>browserMediaCaptureCamera</key>
        <false/>
        <key>browserMediaCaptureMicrophone</key>
        <false/>
        <key>browserWindowAllowReload</key>
        <true/>
        <key>examSessionClearCookiesOnStart</key>
        <false/>
    </dict>
</plist>
```

Hosting this file and linking to it is enough to get your `startURL` to show in Safe Exam Browser.

## Checking if we're running in Safe Exam Browser
You probably want to check if your page is opened in Safe Exam Browser, though.

The current recommended way to do so is in JavaScript:

```js
const isSafeExamBrowser =
	typeof window.SafeExamBrowser !== 'undefined' &&
	window.SafeExamBrowser.version;

console.log("Safe Exam Browser in use?", isSafeExamBrowser);
```

## Checking the configuration is valid
Okay, so that is enough to know whether you're running in SEB, but someone could have manually gone to your website in SEB and not used your provided configuration. To check if the settings are equal to what is expected, you should check the `configKey`:

```js
const expectedConfigKey = generateConfigKey(settings);

const validConfiguration = 
	window.SafeExamBrowser.security.configKey === expectedConfigKey;
```

Generating the config key is a multi-step process, that looks like this:

1. Convert the XML options into a JSON object
2. Remove the `originatorVersion` field if it exists
3. Sort the JSON keys alphabetically
4. Generate a SHA256 hash from the SEB-JSON string
5. Encode that hash as Base-16
6. Concatenate the expected URL and the generated hash
7. Generate a new SHA256 hash from this, and output it as a lowercased Base-16 HEX string

To simplify this a bit, I created [a simple JS class](https://gist.github.com/tschoffelen/5fa4ca1841ee09f96c9a0f21b4787eff) that takes care of all of this for me. It's not the cleanest code, but it does the job.

The usage is as follows:

```js
const plist = new Plist({
	startURL: `https://example.com/...`,
	sendBrowserExamKey: false,
	browserWindowWebView: 3,
	allowPreferencesWindow: false,
	// etc...
});

// Generate XML payload:
const xmlOutput = plist.toXML();
// -> <?xml version="1.0" encoding="UTF-8"?>...

// Get config key
// (based on `startURL` above)
const configKey = await plist.getConfigKey();
// -> b07b99ebdab710432638fc111cc406881593fd5dc...
```






<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>