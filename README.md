# PitcherHomeLab

A compact, low-power local media server built around a Fujitsu FUTRO S940 thin client.

## Current build

| Component | Installed configuration | Status |
| --- | --- | --- |
| System | Fujitsu FUTRO S940 | Installed |
| Mainboard | Expected D3543-A1; revision to be verified | In service |
| Processor | Intel Pentium Silver J5005 | In service |
| Operating system | Debian 13 `trixie` (stable), kept current through normal updates | In service |
| Memory | 16 GB using two Samsung 8 GB DDR4 SO-DIMMs | Fully operational at the CPU-supported DDR4-2400 rate |
| System storage | 256 GB Western Digital PC SA530 M.2 2280 SATA SSD | Passed, unlocked, and in service with an insulated custom standoff |
| Media storage | 8 TB HGST HUS728T8TALE6L4 3.5-inch 7,200 RPM SATA HDD | Fully operational local media library; SMART extended test passed and observed wear is minimal |
| Auxiliary storage | 1 TB Verbatim Vi550 S3 2.5-inch SATA SSD | Installed in a generic ICY BOX USB enclosure; initial SMART attributes healthy |
| Cooling | Passive factory cooling with Arctic MX-6 thermal compound | 41°C idle baseline |

The hardware installation was completed on 2026-10-02. The planned storage and local media-server transition was completed on 2026-10-20: the 8 TB library is in use for personally preserved media, Jellyfin provides local media access, and Radarr and Sonarr organize movie and TV-series libraries. All roadmap phases are now complete. The storage migration, thermal refresh, service architecture, and initial SMART audit are documented in [BUILD_LOG.md](BUILD_LOG.md). Future expansions are planned but intentionally unspecified.

## Media-service architecture

- The 8 TB HDD is the local library for personally preserved media.
- Jellyfin runs locally to provide access to that library.
- Radarr manages movie organization and Sonarr manages TV-series organization into their respective library categories.
- Intel Quick Sync hardware acceleration supports working transcoding and encoding with minimal integrated-GPU usage.
- A dedicated 10 m Cat6 Ethernet cable, rated for gigabit networking, replaces the former 100 Mbit/s 2.4 GHz repeater bridge.
- Media files remain separate from service configuration, metadata, and backup data; this repository deliberately does not publish service endpoints, network layout, library paths, credentials, or media inventory.

## Public site

The build is also published at [lewis.support](https://lewis.support), with the hardware table, roadmap timeline, and release notes. The [Lab page](https://lewis.support/lab) is an interactive, sanitized simulator of the control plane: telemetry gauges, a service-health grid, event simulators, and a runbook knowledge base. Every hostname and address on the site is a documentation placeholder. Site changes are recorded in [BUILD_LOG.md](BUILD_LOG.md).

## Project principles

- Prefer reversible upgrades and documented test results.
- Verify component identity and health before trusting them with data.
- Keep a known-good boot path during storage experiments.
- Measure stability, temperatures, power use, and storage performance after each phase.
- Treat a single 8 TB disk as capacity, not as a backup.
- Prefer reversible installation workarounds over permanent motherboard modification.
