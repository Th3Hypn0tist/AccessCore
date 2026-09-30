# AccessCore

Domain-neutral authorization decision contract.

AccessCore answers one question:

```text
(subject, action, resource, context) -> allow | deny
```

It is an **authorization** component, not an authentication or identity system.

## Authority boundaries

| Component | Authority |
| --- | --- |
| **IAM** | Establishes subject identity and owns authentication/session concerns |
| **AccessCore** | Decides whether a subject may perform an action on a resource |
| **Owning domain service** | Defines action/resource semantics and executes the protected behavior |
| **Projector / UI** | Presents an allowed surface; presentation state is not authorization |

This separation is canonical.

AccessCore does **not** authenticate users, validate passwords, issue or refresh login sessions, store authentication tokens, or own IAM identity data.

Password hashing, brute-force protection, login/logout, session TTL, refresh, revoke, credential storage, and other authentication lifecycle concerns belong to **IAM**, not AccessCore.

## Canonical decision contract

### Input

Required:

- `subject`
- `action`
- `resource`

Optional:

- `context`

Example:

```json
{
  "subject": "user:123",
  "action": "lmts.report.read",
  "resource": "lmts.report:abc",
  "context": {}
}
```

### Output

```text
allow | deny
```

AccessCore returns an authorization decision only.

It does not execute the requested action, fetch or transform the protected resource, or replace enforcement in the owning service.

The service that performs the action must enforce authorization at the actual action boundary.

## Security boundary

AccessCore assumes that `subject` has already been established by an external identity authority.

For the AIGM.fi architecture, that authority is IAM.

Consequences:

- authentication state is validated before AccessCore is invoked;
- AccessCore does not derive identity from UI state or presentation data;
- hidden or unavailable UI is never treated as an authorization mechanism;
- action semantics and resource semantics remain owned by the domain that defines them;
- the protected service remains responsible for enforcing the returned decision.

In short:

```text
IAM         -> who is this?
AccessCore  -> may this subject do this to that?
Domain      -> what does the action mean, and execute it
Projector   -> what should be shown
```

## Explicit non-goals

AccessCore must not:

- authenticate users;
- own login sessions;
- own IAM identity data;
- hash or verify passwords;
- manage session TTL, refresh, revoke, or authentication-token storage;
- own domain business logic;
- execute protected actions;
- fetch or transform protected resources;
- render projectors or UI;
- infer authorization from hidden, disabled, or otherwise absent UI.

## Repository contents

```text
Contracts/
  00-engine-contract.json
  01-decision-contract.json
  02-authority-boundary.json
  manifest.json

accesscore.js
tests/
  request.test.js
package.json
```

### Canonical contracts

`Contracts/` defines the current canonical boundaries:

- **00-engine-contract.json** — engine purpose, principles, and prohibited responsibilities
- **01-decision-contract.json** — decision input/output contract and enforcement rules
- **02-authority-boundary.json** — IAM / AccessCore / domain / projector authority split
- **manifest.json** — contract package metadata

The contracts are the source of truth for the component boundary.

## Current implementation status

Current contract version:

```text
0.1.0
```

The repository currently includes a small JavaScript module that validates and normalizes the authorization request shape.

It does **not yet represent a complete policy-evaluation implementation**.

There is currently no HTTP authentication API, login endpoint, session service, or password-handling surface in this repository because those responsibilities are outside AccessCore.

## Tests

The repository includes Node.js tests for the current request-normalization surface.

Run them with:

```bash
npm test
```

The current tests are implementation tests, not yet a full cross-runtime conformance suite.

## Runtime neutrality

The **canonical contract is runtime-neutral**.

The JavaScript code in this repository is one implementation surface and should not be interpreted as the contract being JavaScript-specific.

Runtime portability should be demonstrated by independent implementations passing the same canonical contract/conformance tests rather than inferred from the existence of one implementation.

## Design principle

Authorization is a decision, not presentation behavior.

Identity belongs to IAM.  
Authorization belongs to AccessCore.  
Business semantics belong to the owning domain.  
UI belongs to the projector.

Keep those boundaries separate.
