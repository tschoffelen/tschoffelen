---
title: Introduction to QTI
date: 2026-01-05
description: QTI stands for **Question and Test Interoperability**, and is a standard for exchanging assessment content (and results) between systems.   It's one...
taxonomies:
  category:
    - Blog
extra:
  unlisted: true
---


QTI stands for **Question and Test Interoperability**, and is a standard for exchanging assessment content (and results) between systems. 

It's one of those standards that is really awesome, but hard to get a basic understanding of, without spending lots of time reading all of the documents that make up the specification. Let me give you a short introduction, going from the outside in, and highlighting some of the things I really love about how the specification is put together.

## Packaging
In most situations, you'll come across QTI content in the form of a QTI content package.

<picture><source srcset="https://mirri.link/TKZls2nnX" media="(prefers-color-scheme: dark)"><img src="https://mirri.link/0KV_Ifo1b" alt="Drawing" /></picture>

This is a ZIP file, which at least contains at least a `imsmanifest.xml` file, and a bunch of other XML files describing the test and questions.

The `imsmanifest.xml` acts as an [index card](https://www.1edtech.org/standards/content-packaging), telling the system reading the file what resources are in the zip file, what types they have, and where they are located.

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
         <resource href="assessment.xml" type="imsqti_test_xmlv3p0" identifier="test1">
            <file href="assessment.xml"/>
            <dependency identifierref="question1"/>
            <dependency identifierref="question2"/>
        </resource>
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


## Assessment structure
One of those packages can contain multiple assessments, which in turn can contain parts, sections, and assessment items (the actual questions):

<picture><source srcset="https://mirri.link/tFSwtOixd" media="(prefers-color-scheme: dark)"><img src="https://mirri.link/dE_iH3YXG" alt="Drawing" /></picture>

Within a test part, you decide how you want the student to navigate through items, e.g. either one after the other, without allowing the student to jump back and forth (`linear`) or `nonlinear` to provide more freedom.

Most tests have a single part, and one or more sections about different topics.

## Adaptiveness
Sections, and individual items can have `preconditions` and branching rules, which determine the flow of the test. 

This means you can create adaptive structures, for example making sure that a student that scores poorly on a certain topic gets more follow-up questions about that topic. This is really powerful!

<picture><source srcset="https://mirri.link/4rG4Qeftd" media="(prefers-color-scheme: dark)"><img src="https://mirri.link/zZXGAHxUo" alt="Drawing" /></picture>



<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>

<script>document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {   if (!heading.textContent.includes('%% fold %%')) return;      const details = document.createElement('details');   const summary = document.createElement('summary');   summary.innerHTML = heading.innerHTML.replace('%% fold %%', '').trim();   details.appendChild(summary);   const content = document.createElement('div');   details.appendChild(content);      let sibling = heading.nextElementSibling;   const headingLevel = parseInt(heading.tagName[1]);      while (sibling) {     const next = sibling.nextElementSibling;     if (/^H[1-6]$/.test(sibling.tagName) && parseInt(sibling.tagName[1]) <= headingLevel) break;     content.appendChild(sibling);     sibling = next;   }      heading.replaceWith(details); });</script>