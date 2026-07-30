# PitcherHomeLab

A compact, low-power homelab built around a Fujitsu FUTRO S940 thin client.

## Current hardware

| Component | Current configuration | Planned configuration |
| --- | --- | --- |
| System | Fujitsu FUTRO S940 | Retained |
| Mainboard | Expected D3543-A1; revision to be verified | Retained |
| Processor | Intel Pentium Silver J5005 | Retained |
| Memory | 4 GB DDR4 | 16 GB using 2 × 8 GB DDR4 SO-DIMMs |
| Storage | 32 GB M.2 SATA SSD | NVMe, subject to interface and boot validation |

See [ROADMAP.md](ROADMAP.md) for the upgrade plan, validation gates, and open decisions.

## Project principles

- Prefer reversible upgrades and documented test results.
- Verify the exact board revision before ordering adapters.
- Keep a known-good boot path during storage experiments.
- Measure stability, temperatures, power use, and storage performance after each phase.
