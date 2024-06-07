---
title: Conventional Commits and Comments Cheat Sheet
description: A quick overview of the Conventional Commits and Conventional
  Comments standards.
date: 2023-07-06T18:13:13.115Z
taxonomies:
  category:
    - Reference
extra: {}
---
## Conventional Commits
[Specification](https://www.conventionalcommits.org/)

Structure:

```
<type>[(optional scope)]: <description>
    
[optional body]
    
[optional footer(s)]
```

Example:

```
feat(api): allow provided config object to extend other configs
    
BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

Types:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

## Conventional Comments
[Specification](https://conventionalcomments.org/)

Structure:

```
<label> [optional decorations]: <subject>
    
[optional discussion]
```

Example:

```
**question (non-blocking):** At this point, does it matter which thread has won?

Maybe to prevent a race condition we should keep looping until they've all won?
```

Labels:

- **praise:** Praises highlight something positive. Try to leave at least one of these comments per review.
- **nitpick:** Nitpicks are trivial preference-based requests. These should be non-blocking.
- **suggestion:** Suggestions propose improvements to the current subject. It's important to be explicit and clear on _what_ is being suggested and _why_ it is an improvement. 
- **issue:** Issues highlight specific problems with the subject under review. These problems can be user-facing or behind the scenes.
- **todo:** Small, trivial, but necessary changes. Distinguishing todo comments helps direct the reader's attention to comments requiring more involvement.
- **question:** Questions are appropriate if you have a potential concern but are not quite sure if it's relevant or not.
- **thought:** Thoughts represent an idea that popped up from reviewing. 
- **chore:** Chores are simple tasks that must be done before the subject can be "officially" accepted. 
- **note:** Notes are always non-blocking and simply highlight to take note of.