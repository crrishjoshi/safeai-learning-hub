# SafeAI safety evaluation

`npm run evaluate:safety` runs the local regression suite for the five safety states and the required precedence order.

The fixtures are protected storyboard labels, not ordinary chat examples. The suite checks that:

- Allowed, safe adult-support, parent approval, blocked, and immediate-risk all classify correctly.
- Immediate-risk outranks every lower state.
- Immediate-risk is not saved as ordinary history.
- Blocked and immediate-risk responses do not repeat dangerous content.

This is an automated engineering regression check. It is not an independent safety evaluation, clinical review, certified safeguarding service, or production readiness claim. An independent evaluator and a staffed safeguarding operation remain future work.
