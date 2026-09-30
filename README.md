# AccessCore

Authorization decision engine.

AccessCore answers one question:

```text
(subject, action, resource, context) -> allow | deny
```

It does not authenticate users, own sessions, render UI, own domain behavior, or infer permissions from presentation state.

IAM is the identity authority. Domain services define action and resource semantics. AccessCore evaluates authorization policy and returns a decision.

See `Contracts/` for canonical boundaries.
