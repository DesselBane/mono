|  Status  |    Date    |
| :------: | :--------: |
| Accepted | 2026-08-28 |

<!-- Possible Status Values: Proposed, Accepted, Partially Superseded, Superseded, Revoked -->

# ADR-002: Setup steps converge, never assume a virgin host

## Context

The setup package was written for virgin hosts: the dot-config step clones unconditionally, overwrites `~/.gitconfig` and `local.gitconfig` blindly, and force-checks-out the work tree.
Existing hosts on the old layout (pre-[ADR-001](./ADR-001-windows-dotcfg-checkout-as-single-source-of-truth.md) config layering) must be brought up to date, and already-migrated hosts must survive re-runs (e.g. after a manifest change).
Machine-local files like `local.gitconfig` are hand-tunable by definition, and real hosts diverge (e.g. the 1Password `op-ssh-sign` binary lives in `%LOCALAPPDATA%/1Password/app/8/` on some machines and under WindowsApps on others), so blind regeneration destroys valid machine state.
A force checkout on a dirty work tree silently discards uncommitted local changes to tracked config files.

## Decision

Every setup step converges the host from its current state to the desired state — it detects divergence, surfaces it, and prompts before destructive changes — instead of assuming a virgin host; there is no dedicated migration step or layout-version marker.
Operational detail lives in [Convergence rules](#convergence-rules) below.

| Aspect              | Rule                                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| Entry point         | Migration is an ordinary re-run of setup; each prompted step performs its own detection.                  |
| Repo acquisition    | Clone the dot-config repo only if absent, otherwise fetch.                                                |
| Dirty work tree     | Detect dirty tracked files, print the diff, prompt; on confirm `git stash` then force checkout, else abort. |
| Generated local config | Probe the machine for actual values; on differing existing file, diff and prompt overwrite/keep.        |
| Kept local config   | On "keep", print the full generated content so the user can hand-merge selectively.                        |
| Probe failures      | Fail hard when a probed prerequisite is absent (e.g. no `op-ssh-sign` binary found); never write placeholders. |

## Convergence rules

- The dirty-file check runs in the bare-repo context (`git --work-tree ~ --git-dir ~/.dotCfg status --porcelain` on tracked files); the stash keeps discarded state recoverable through git rather than an ad-hoc backup folder.
- The `op-ssh-sign` probe checks the known install locations (`%LOCALAPPDATA%/1Password/app/8/` and the WindowsApps store path) and generates `local.gitconfig` with the found path.
- The Linux dot-config step applies the same diff-and-prompt behavior to its generated `local.gitconfig` and existing symlinks.
- Promoting old machine-local values into tracked layers (`windows.gitconfig`, shared `.gitconfig`) stays manual, informed by the printed diffs; no inspect/absorb tooling.

## Consequences

### Positive

- **POS-001**: One code path serves first-time setup, migration, and repair; migration-only code never rots.
- **POS-002**: No silent data loss — every destructive action shows a diff and requires confirmation, and stashed state is recoverable.
- **POS-003**: Hand-tuned machine-local values survive re-runs instead of being regenerated away.

### Negative

- **NEG-001**: Every step carries detection logic, making steps more complex than one-shot scripts.
- **NEG-002**: Re-runs are interactive; prompts prevent fully unattended execution on diverged hosts.

## Alternatives Considered

### Dedicated migrate step

- **Description**: A one-off `migrate` step encoding the old-layout → new-layout transition.
- **Rejection Reason**: Dead code after the ~2 existing machines migrate; does not help already-new hosts on re-runs.

### Layout-version marker

- **Description**: A marker file or version field letting setup detect "old layout" and self-migrate, possibly auto-answering prompts.
- **Rejection Reason**: State to maintain for exactly one transition on a two-machine fleet; the diff prompts already surface exactly what changes.

### Unconditional force overwrite (status quo)

- **Description**: Keep overwriting `~/.gitconfig`/`local.gitconfig` and force-checking-out without inspection.
- **Rejection Reason**: Silently destroys machine-local divergence such as a corrected `gpg.ssh.program` path.

## References

- **REF-001**: [ADR-001: Windows dot-config checkout as single source of truth](./ADR-001-windows-dotcfg-checkout-as-single-source-of-truth.md)
