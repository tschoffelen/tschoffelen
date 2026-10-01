---
title: "Can Jev AI improve grading and marking accuracy?"
date: 2026-09-29
description: A deep dive into how the new AI model Jev performs in grading tests compared to existing models.
taxonomies:
  category:
    - Blog
extra:
  canonical: https://examplary.ai/blog/jev-for-grading
---

For the last two weeks, everyone has been talking about a new AI model from a company called [TypeSafe AI](https://typesafe.ai), which spent two years building what it markets as a new type of AI model: a "System One model" called [Jev](https://docs.typesafe.ai).

You send text like with any LLM, but Jev doesn't return text or images in response. Instead, it returns decisions and probabilities. It's also very fast (TypeSafe claims 40 to 200 times faster than frontier LLMs) and a lot cheaper as well.

This makes it a perfect choice for anything that needs a yes/no response, or a selection out of multiple choices. Companies are already using it for things like tagging support tickets, detecting spam, and, of course, [playing Doom](https://www.theregister.com/ai-and-ml/2026/09/16/typesafe-ai-debuts-model-for-machines-that-plays-doom/5296711).

I, naturally, decided to try out how well it worked for grading tests.

## Some numbers first

I tried running Jev, as well as some open-source alternatives, on our internal evaluation set of representative questions and student answers. These are answers that have been graded by our AI models, and also reviewed and scored by a teacher.

### Comparing against teacher scores (14,659 items)

| Model | Description | Exact agreement | QWK |
| :-- | :-- | --: | --: |
| `baseline` | our current model | 81.5% | 0.83 |
| `jev` | comparison model | 62.0% | 0.65 |
| `jev-noul` | comparison model without multiple choices | 61.7% | 0.65 |
| `laya-finetuned-v1` | fine-tuned open-source model | 37.4% | 0.19 |
| `laya-typed-decisions` | open-source model with typed decisions | 38.1% | 0.10 |
| `laya-multilingual` | open-source multilingual model | 49.7% | 0.01 |
| `laya-multilingual-noul` | open-source multilingual model without multiple choices | 52.6% | 0.01 |

Our current model agrees exactly with a teacher's score 81.5% of the time. That percentage doesn't say much about how big the disagreement was when the scores didn't match. For that I calculate the [QWK (Quadratic Weighted Kappa)](https://en.wikipedia.org/wiki/Cohen%27s_kappa#Weighted_kappa). This value penalises big disagreements more than small ones, giving a fairer view of how the model performs. A QWK of 1 would mean exact agreement all the time, and 0 would mean no better than pure chance.

Jev scores relatively well, with a QWK of 0.65 compared to 0.83 for our current model. That's still a noticeable drop in accuracy, though.

I also experimented with some open-source models that take the same approach as Jev, such as [Laya](https://huggingface.co/convaiinnovations/laya). These models run locally and are much smaller, which made us excited about the possibility of hosting them on our own servers, so we'd send even less data to external services.

Sadly, even with some basic fine-tuning, these models perform much worse. The main reason is likely their size: Laya's checkpoints have only around 320 to 420 million parameters, which makes them less able to deal with edge cases like less common languages, jargon and formulas.

## Other obstacles

There are some other things that prevent us from using Jev in our grading flow:

- As of now, there doesn't seem to be an option to choose which region Jev runs in. That by itself is a bit of a dealbreaker for our use case: [Examplary](https://examplary.ai) can be fully hosted in the EU, and we'd like to keep it that way.
- No multimodal capabilities: Jev accepts only text, whereas Examplary increasingly supports other content types, like images, documents, audio and video. For questions or answers that include any of these, we wouldn't be able to use Jev at all.
- Limited context: the amount of text you can feed Jev is less than we tend to feed into our current model. Since our grading is always grounded in the source materials our teachers upload, we send a lot of relevant "fact" data from those materials to the grading model. For complex questions, this means we often cross Jev's 32k-token input limit. Open-source alternatives have an even lower limit: Laya's checkpoints are capped at 512 to 1,024 tokens.
- No reasoning or feedback: Jev's whole concept is that it only returns a decision and a probability. This makes it hard for teachers to know why the model assigned a certain grade, and doesn't allow for feedback generation in the same grading session. Some of this could be solved by running an LLM alongside it to generate those texts, but that wouldn't necessarily reflect the actual "reasoning" of the grading model.

## Not all bad

Of course, Jev has many advantages as well: it's a lot faster (up to 10x faster than our current grading model, from about 3,000 ms to 300 ms), a lot cheaper, and it provides more consistent confidence scores.

For this use case, those advantages don't currently outweigh the disadvantages. It is interesting for other use cases, though, like flagging safeguarding issues that teachers should be notified about.

We'll keep experimenting with new ways of using these models, and we're always working on making our auto-grading even more reliable, fast and consistent.
