---
title: Why the Same Test on Paper or Digitally Leads to Different Scores
date: 2026-08-04
description: "The Mode effect: the same test, taken by the same students, can produce different scores depending on whether it&apos;s sat on paper or on screen. What causes this, and what can you do about it?"
taxonomies:
  category:
    - Blog
extra: {}
---



If you give the exact same test to two comparable classes of students, once digitally and once on paper, it's likely you'll see measurably different results. This has nothing to do with what the students know. It's a property of the medium itself.

This phenomenon is called the **Mode effect**. The mode effect is the systematic difference in scores caused purely by _how_ a test is delivered - paper, screen, or spoken - rather than by what the student knows.

## A research-backed difference
This difference has been measured in a large body of research over the last four decades.

The easiest way to quantify the exact difference, is by looking at international standardised testing, like the [Programme for International Student Assessment](https://www.oecd.org/en/about/programmes/pisa.html) (PISA), which looks at various academic skills of 15-year-old students across around 90 countries.

In 2015, the PISA test moved from paper-based assessment to online assessment. Before making that switch, the OECD ran a field trial in which pupils in the same schools were randomly assigned to sit the test either on paper or on screen. In all three countries studied, every subject came out lower on screen:

<img src="https://mirri.link/1W_JfjexI" alt="Image" />

A similar thing can be seen in the research review from ACT for the years 2010-2020, which shows a leaning towards students scoring better on paper tests. Across 42 studies, 21 found paper easier, 17 found no meaningful difference, and only 4 found students doing better online:

<img src="https://mirri.link/x3ZyGMsGJ" alt="Image" />

## Why it happens
When we learn, we learn in a specific context: we remember something we've handwritten more easily when handwriting it a second time, versus using a different medium - speaking the text out loud, or typing it on a keyboard.

In addition, there are four specific mechanisms we see when comparing paper tests and digital tests:

1. A different spatial awareness. Our brains are better in remembering where something was located in a physical book with pages, rather than scrolling and clicking through screens.
2. Typing fluency is generally lower in students compared to handwriting.
3. Differential speededness: screens make some students slower, so a timed test penalises them twice.
4. Simple familiarity with the interface: most students only get to see a particular digital testing interface once they start taking the test.

Interestingly, there doesn't seem to be a difference here between "digital natives" and older generations of students; younger cohorts show no advantage when taking digital assessments, and the paper advantage measured in reading studies has actually grown between 2000 and 2017, not shrunk.

The penalty isn't constant, either. A meta-analysis covering more than 170,000 participants found it concentrated almost entirely in informational text (for narrative text it disappears altogether) and roughly three times larger when students are reading against a clock:

<img src="https://mirri.link/3kNMGAnSF" alt="Image" />

## What it means for you
Unlike the examples above from organisations like PISA, you're probably not comparing tests taken across different modes with each other. Everyone in your class sits the same test in the same mode, so the mode effect moves the whole group together, and a shift that applies to everyone equally is one you can absorb when you set your grade boundaries.

The catch is that it doesn't apply to everyone equally. The mechanisms above land harder on some students than on others: the slow typist, the student who finds reading on screen tiring, the one who has never seen the interface before. Grading relative to the class average corrects the group shift, but you might also want to minimize the spread of scores.

There's a few things you can do to compensate for it:

- Let students practise in the mode they'll be tested in: if you're assessing digitally, see if you can also let students practice digitally, like with Examplary's [Practice Spaces](https://examplary.ai/product/practicing).
- Vary modes across the term: combine digital and written assessments, so that any imbalance between students performing better in one mode than the other is cancelled out. If you're using Examplary, you'll review and grade answers the same way, no matter if a student took the assessment online or on paper.
- Be careful with time limits on the screen: this is exactly where the penalty is largest, so apply time limits in digital assessments carefully, and make sure students who work more slowly on screen aren't disadvantaged twice.
- Watch the reading load: long informational passages are where screens cost the most. If a question hangs off a page of text, consider shortening the stem.

## Conclusion
Does that mean we should avoid using digital assessment? No. There are real valid reasons to test online, including security, traceability, consistency and efficiency.

Moreover, all of the other modes also have an effect, there is no 'neutral' delivery method. On paper, digital, oral: all of these options are valid, as long as we are aware of the fact that the way we deliver tests has an effect on outcomes.


---
Sources:
- Jerrim, J., Micklewright, J., Heine, J.-H., Sälzer, C., & McKeown, C. (2018). _PISA 2015: how big is the "mode effect" and what has been done about it?_ Oxford Review of Education, 44(4), 476–493. https://discovery.ucl.ac.uk/10039757/
- ACT (2020). _Paper and Online Testing Mode Comparability._ ACT Research Report R1842. https://www.act.org/content/dam/act/unsecured/documents/R1842-paper-online-testing-modes-2020-12.pdf
- Delgado, P., Vargas, C., Ackerman, R., & Salmerón, L. (2018). _Don't throw away your printed books: A meta-analysis on the effects of reading media on reading comprehension._ Educational Research Review, 25, 23–38. https://doi.org/10.1016/j.edurev.2018.09.003


<style>a[href="#internal-link"] { color: #9b9b9b; text-decoration: none !important; }</style>

<script>document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => { if (!heading.textContent.includes('%% fold %%')) return; const details = document.createElement('details'); const summary = document.createElement('summary'); summary.innerHTML = heading.innerHTML.replace('%% fold %%', '').trim(); details.appendChild(summary); const content = document.createElement('div'); details.appendChild(content); let sibling = heading.nextElementSibling; const headingLevel = parseInt(heading.tagName[1]); while (sibling) { const next = sibling.nextElementSibling; if (/^H[1-6]$/.test(sibling.tagName) && parseInt(sibling.tagName[1]) <= headingLevel) break; if (sibling.textContent.includes('%% endfold %%') || sibling.textContent.includes('%% fold %%') || sibling.textContent.includes('❧')) break; content.appendChild(sibling); sibling = next; } heading.replaceWith(details); });</script>