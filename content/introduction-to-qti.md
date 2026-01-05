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


          <picture>
            <source srcset="undefined" media="(prefers-color-scheme: dark)">
            <img src="undefined" alt="Drawing" />
          </picture>
          

This is a ZIP file, which at least contains at least a `imsmanifest.xml` file, and a bunch of other XML files describing the test and questions.

The `imsmanifest.xml` acts as an [index card](https://www.1edtech.org/standards/content-packaging), telling the system reading the file what resources are in the zip file, what types they have, and where they are located.

It also can contain metadata about the educational content, using [Learning Object Metadata (LOM)](https://en.wikipedia.org/wiki/Learning_object_metadata).

<details>
<summary>An example <code>imsmanifest.xml</code> (simplified)</summary>

<div>

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

</div>

</details>

## Assessment structure
One of those 


<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>