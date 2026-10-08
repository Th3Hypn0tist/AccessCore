# AccessCore

Domain-neutral authorization decision authority.

## Canonical responsibility split

```text
IAM        = who
AccessCore = authority / may
DWH        = where / what relates to what
WebEngine  = execute the declared web structure
WebGUI     = generic UI primitives
S3D        = spatial / 3D primitives
```

AccessCore answers one canonical question:

```text
(subject, action, resource, context) -> allow | deny
```

It is an authorization component, not an identity system, resolver, browser runtime or presentation framework.

## Boundary

- IAM establishes identity and authentication context.
- AccessCore decides authorization.
- DWH resolves canonical structural/resource declarations and relations.
- WebEngine executes declared browser behavior.
- Domain services define and execute business semantics.
- WebGUI and S3D provide presentation primitives.

These responsibilities do not transfer between components.

## Security invariants

```text
identity       != authority
resolvability  != authority
visibility     != authority
runtime state  != authority
```

A DWH symbol being resolvable does not grant access. A WebEngine projector being visible does not grant access. A hidden control does not revoke access.

The service that performs a protected operation must enforce authorization at the actual action/resource boundary.

## Input

Required:

```text
subject
action
resource
```

Optional:

```text
context
```

## Output

```text
allow | deny
```

AccessCore returns the decision only. It does not authenticate, resolve DWH symbols, execute the requested action, fetch the protected resource or render presentation.

See `Contracts/` for the machine-readable decision and authority boundaries.
