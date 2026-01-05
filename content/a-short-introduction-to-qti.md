---
title: A Short Introduction to QTI
date: 2026-01-05
description: Explaining some of the basic concepts of the Question and Test Interoperability standard for exchanging assessment content between systems.
taxonomies:
  category:
    - Blog
extra: {}
---


QTI stands for **Question and Test Interoperability**, and is a standard for exchanging assessment content (and results) between systems. It has developed over the last few decades into one of the most complex, wonderful standards we have in education tech.

It's one of those standards though that is really awesome, but hard to get a basic understanding of, without spending lots of time reading all of the documents that make up the specification.

I've spent the last few months learning all about it as part of building QTI 3.0 import and export into our assessment platform [Examplary](https://examplary.ai/).

Let me give you a short introduction, going from the outside in, and highlighting some of the things I really love about how the specification is put together.

## Packaging
In most situations, you'll come across QTI content in the form of a QTI content package, which you would export from one system (e.g. Canvas or Examplary) to import into another system (e.g. Tao Testing or Cloud Assess).

<picture><source srcset="https://mirri.link/TKZls2nnX" media="(prefers-color-scheme: dark)"><img src="https://mirri.link/0KV_Ifo1b" alt="Drawing" /></picture>

These content packages are ZIP file, which contains XML files describing the test and questions, and any other resources required for those questions (images, videos, style sheets).

There's also always a file called `imsmanifest.xml`. This file acts as an [index card](https://www.1edtech.org/standards/content-packaging), telling the system reading the file what resources are in the zip file, what types they have, and where they are located.

It also can contain metadata about the educational content, using [Learning Object Metadata (LOM)](https://en.wikipedia.org/wiki/Learning_object_metadata).

### An example <code>imsmanifest.xml</code> (simplified) %% fold %% 
```xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest xmlns="http://www.imsglobal.org/xsd/qti/qtiv3p0/imscp_v1p1">
    <metadata>
        <schema>QTI Package</schema>
        <schemaversion>3.0.0</schemaversion>
    </metadata>
    <organizations/>
    <resources>
		 <!-- This is our main entry - the test -->
         <resource href="assessment.xml" type="imsqti_test_xmlv3p0" identifier="test1">
            <file href="assessment.xml"/>
            <dependency identifierref="question1"/>
            <dependency identifierref="question2"/>
        </resource>
        
        <!-- Resources for questions are referenced in assessment.xml 
        by idenfitier, and the lines below show the target app where
        to find the content for each question -->
        <resource identifier="question1" type="imsqti_item_xmlv3p0" href="question1.xml">
            <file href="question1.xml"/>
            <file href="images/sign.png"/>
        </resource>
        <resource identifier="question2" type="imsqti_item_xmlv3p0" href="question2.xml">
            <file href="question2.xml"/>
        </resource>
    </resources>
</manifest>
```

_❧ Misc fact: This format of packaging content is not specific to QTI. It's part of another standard that is also used for the SCORM and Common Cartridge standards, although they all have slightly different requirements for what should be contained in the manifest file._

## Assessment structure
One of those packages can contain multiple assessments, which in turn can contain parts, sections, and assessment items (the actual questions):

<picture><source srcset="https://mirri.link/tFSwtOixd" media="(prefers-color-scheme: dark)"><img src="https://mirri.link/dE_iH3YXG" alt="Drawing" /></picture>

Within a test part, you decide how you want the student to navigate through items, e.g. either one after the other, without allowing the student to jump back and forth (`linear`) or `nonlinear` to provide more freedom.

Most tests have a single part, and one or more sections about different topics.

## Adaptiveness
Sections, and individual items can have `preconditions` and branching rules, which determine the flow of the test. 

This means you can create adaptive structures, for example making sure that a student that scores poorly on a certain topic gets more follow-up questions about that topic. This is really powerful!

<picture><source srcset="https://mirri.link/4rG4Qeftd" media="(prefers-color-scheme: dark)"><img src="https://mirri.link/zZXGAHxUo" alt="Drawing" /></picture>

## Items and interactions
Let's dive into the items: the actual questions that make up the test.

The cool thing about QTI is that these can be fully self-contained documents. Each one can be its own file, contain any HTML you want, and then use some custom XML tags to allow interaction.

<picture><source srcset="https://mirri.link/_mXu8Pc3n" media="(prefers-color-scheme: dark)"><img src="https://mirri.link/XqBYOIfQ8" alt="Drawing" /></picture>

There's about two dozen built-in interaction types, which you can mix and match and use in combination with your content:

```html
<qti-assessment-item>
  ...
  <qti-item-body>
    <p>Look at the text in the picture.</p>
    <p><img src="images/sign.png" /></p>
    
    <qti-choice-interaction max-choices="1" response-identifier="RESPONSE">
      <qti-prompt>What does it say?</qti-prompt>
      <qti-simple-choice identifier="A">You must stay with your luggage at all times.</qti-simple-choice>
      <qti-simple-choice identifier="B">Do not let someone else look after your luggage.</qti-simple-choice>
      <qti-simple-choice identifier="C">Remember your luggage when you leave.</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>
```


## Portable custom interactions
If some combination of the built-in interaction types somehow doesn't fit your needs, QTI supports something called _Portable Custom Interactions_ (PCIs), which allow you to write scripts to display custom UIs to the user. 

They're not as easy to set up as [Examplary custom question types](https://developers.examplary.ai/question-types/), but the cool thing is they are completely portable - you usually include them in the ZIP file, so that they can be played even when you move over to a different LMS or assessment platform.

<picture><source srcset="https://mirri.link/YFT6nY0_o" media="(prefers-color-scheme: dark)"><img src="https://mirri.link/QZUuJ9qqQ" alt="Drawing" /></picture>

_❧ Random note: if you export custom question type content from Examplary as QTI, we automatically generate a PCI version of that Examplary question type and package it up in the ZIP. This was very fun to build!_

## Response mapping
The same flexibility is afforded in terms of how responses are marked. 

You can set up a simple matching system, where a specific answer leads to a specific score and a specific feedback text, but you can also be very complex with your scoring rules. 

There's almost an entire programming language embedded in the QTI markup to describe almost any desired outcome. 

Thankfully there are also some defaults built in, so that you don't need to define something like this for each question that simply has a "matches correct answer" scoring mechanism:

```xml
<qti-response-condition>
	<qti-response-if>
		<!-- If the variable 'RESPONSE' matches the correct answer -->
		<qti-match>
			<qti-variable identifier="RESPONSE"/>
			<qti-correct identifier="RESPONSE"/>
		</qti-match>
		<!-- Set 'SCORE' to 1 -->
		<qti-set-outcome-value identifier="SCORE">
			<qti-base-value base-type="float">1</qti-base-value>
		</qti-set-outcome-value>
	</qti-response-if>
	<qti-response-else>
		<!-- Otherwise set 'SCORE' to 0 -->
		<qti-set-outcome-value identifier="SCORE">
			<qti-base-value base-type="float">0</qti-base-value>
		</qti-set-outcome-value>
	</qti-response-else>
</qti-response-condition>
```

## Reviewer content
You can embed content into QTI items that are only visible for certain groups of users.

<picture><source srcset="https://mirri.link/y97N07xSO" media="(prefers-color-scheme: dark)"><img src="https://mirri.link/Fp5LOyNLp" alt="Drawing" /></picture>

'Rubric' blocks, which are meant to display things like instructions, scoring info and additional context, can be configured to be viewed only by a specific audience:
- `author`
- `candidate`
- `proctor`
- `scorer`
- `testConstructor`
- `tutor`

This is very useful for adding detailed scoring rubrics, which can live alongside the content of the question. It can also be used for private notes by the question writer, to denote references or resources.

## Further reading
There's so much more I could cover, including response-specific feedback, companion materials, test time limits, and accessibility features, but those are better understood in context of the original specification documents.

Official specification documents:

- 📄 [Question and Test Interoperability (QTI) Overview](https://www.imsglobal.org/spec/qti/v3p0/oview)
	- A quick overview of where QTI fits in the ecosystem, with links to all other relevant specification docs.
- 📄 [QTI 3 Beginner's Guide](https://www.imsglobal.org/spec/qti/v3p0/guide)
	- A very simple beginner's guide. I only started reading this way too late in the process. Essential reading.
- 📄 [QTI v3 Best Practices and Implementation Guide](https://www.imsglobal.org/spec/qti/v3p0/impl)
	- This is the core document you'd use to build any type of technical integration. It shows the full width and breadth of what's possible in QTI.
- 📄 [Assessment, Section and Item Information Model](https://www.imsglobal.org/sites/default/files/spec/qti/v3/info/index.html)
	- The actual technical specification of the information model. Not worth reading, unless you're implementing QTI importer/exporter yourself.

Useful tools:

- 🌍 [Citolab QTI Playground](https://qti.citolab.nl/landing)
	- A great tool by our friends at Citolab, makes it easy to test your QTI packages and convert them from QTI 2 to 3.
- 🌍 [ONYX Editor](https://www.onyx-editor.com/onyxeditor/editor?4)
	- Online assessment editor. Only supports QTI 2.1, but was useful in helping me understand how certain concepts mapped from the XML markup to UI.


<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>

<script>document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => { if (!heading.textContent.includes('%% fold %%')) return; const details = document.createElement('details'); const summary = document.createElement('summary'); summary.innerHTML = heading.innerHTML.replace('%% fold %%', '').trim(); details.appendChild(summary); const content = document.createElement('div'); details.appendChild(content); let sibling = heading.nextElementSibling; const headingLevel = parseInt(heading.tagName[1]); while (sibling) { const next = sibling.nextElementSibling; if (/^H[1-6]$/.test(sibling.tagName) && parseInt(sibling.tagName[1]) <= headingLevel) break; if (sibling.textContent.includes('%% endfold %%') || sibling.textContent.includes('%% fold %%') || sibling.textContent.includes('❧')) break; content.appendChild(sibling); sibling = next; } heading.replaceWith(details); });</script>