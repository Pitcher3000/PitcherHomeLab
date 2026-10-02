# PitcherHomeLab

A compact, low-power local media server built around a Fujitsu FUTRO S940 thin client.

## Current build

| Component | Installed configuration | Status |
| --- | --- | --- |
| System | Fujitsu FUTRO S940 | Installed |
| Mainboard | Expected D3543-A1; revision to be verified | In service |
| Processor | Intel Pentium Silver J5005 | In service |
| Operating system | Debian 13 `trixie` (stable), kept current through normal updates | In service |
| Memory | 16 GB using two Samsung 8 GB DDR4 SO-DIMMs | Installed; extended validation pending |
| System storage | 256 GB Western Digital PC SA530 M.2 2280 SATA SSD | Installed with an insulated custom standoff; SMART passed |
| Media storage | 8 TB HGST HUS728T8TALE6L4 3.5-inch 7,200 RPM SATA HDD | Installed through ICY BOX IB-1122-U3; SMART extended test passed |
| Auxiliary storage | 1 TB Verbatim Vi550 S3 2.5-inch SATA SSD | Installed in a generic ICY BOX USB enclosure; initial SMART attributes healthy |
| Cooling | Passive factory cooling with Arctic MX-6 thermal compound | 41°C idle baseline |

The hardware installation was completed on 2026-10-02. The storage migration, thermal refresh, and initial SMART audit are documented in [BUILD_LOG.md](BUILD_LOG.md). Remaining burn-in and long-term stability checks are tracked in [ROADMAP.md](ROADMAP.md).

## Project principles

- Prefer reversible upgrades and documented test results.
- Verify component identity and health before trusting them with data.
- Keep a known-good boot path during storage experiments.
- Measure stability, temperatures, power use, and storage performance after each phase.
- Treat a single 8 TB disk as capacity, not as a backup.
- Prefer reversible installation workarounds over permanent motherboard modification.
