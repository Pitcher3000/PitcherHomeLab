# PitcherHomeLab

A compact, low-power local media server built around a Fujitsu FUTRO S940 thin client.

## Hardware plan

| Component | Existing | Upgrade |
| --- | --- | --- |
| System | Fujitsu FUTRO S940 | Retained |
| Mainboard | Expected D3543-A1; revision to be verified | Retained |
| Processor | Intel Pentium Silver J5005 | Retained |
| Operating system | Existing installation | Debian 13 `trixie` (stable), kept current through normal updates |
| Memory | 4 GB DDR4-2666 SO-DIMM | 16 GB using two Samsung 8 GB DDR4 SO-DIMMs |
| System storage | 32 GB M.2 SATA SSD | 256 GB Western Digital PC SA530 M.2 SATA SSD |
| Media storage | None | 8 TB 3.5-inch Hitachi/Western Digital SATA HDD |
| Auxiliary storage | None | 1 TB Verbatim Vi550 S3 2.5-inch SATA SSD in a generic ICY BOX USB enclosure |
| External storage interfaces | None | ICY BOX IB-1122-U3 HDD dock plus a generic ICY BOX USB SSD enclosure |

See [ROADMAP.md](ROADMAP.md) for the upgrade plan, validation gates, and open decisions.

## Project principles

- Prefer reversible upgrades and documented test results.
- Verify component identity and health before trusting them with data.
- Keep a known-good boot path during storage experiments.
- Measure stability, temperatures, power use, and storage performance after each phase.
- Treat a single 8 TB disk as capacity, not as a backup.
