# Build log

## 2026-10-02 — Hardware & Storage Update: Futro S940 Storage Expansion, Thermal Refresh & Health Audit

### System and thermals

- **Host:** `doniserver`, a fanless Fujitsu FUTRO S940.
- **Thermal refresh:** Removed the factory thermal interface material and applied Arctic MX-6. The passive, fanless system stabilized at a 41°C idle baseline.
- **M.2 mounting:** Installed an insulated custom M.2 standoff. The SSD sits flat and firmly seated, with no mechanical flex at the connector pins.

### OS and storage architecture

- **Disk expansion:** Cloned the installation block-for-block to the replacement 256 GB SSD with `dd`.
- **Partition repair and expansion:** Repaired the backup GPT headers at the new disk boundary with `sgdisk` and expanded the `ext4` root filesystem to the full 237.6 GiB usable capacity.
- **Swap architecture:** Removed the legacy `sda3` disk swap partition and created a persistent 4 GB `/swapfile` with the following `/etc/fstab` entry: `/swapfile none swap sw 0 0`.
- **Boot optimization:** Removed the orphaned swap-partition UUID from `/etc/fstab`, resolving a 90-second systemd dependency timeout during boot.
- **Headless access:** Enabled the SSH daemon and verified that it remains enabled across boot targets with `systemctl enable --now ssh`.

### Storage health audit

The USB enclosures did not return complete ATA output registers, so their overall `PASSED` results are attribute-based assessments. The individual attributes and self-test logs below remain available through SMART passthrough.

#### Primary boot SSD — 256 GB Western Digital PC SA530 (`/dev/sda`)

Source: `smartctl /dev/sda`

| Check | Result |
| --- | --- |
| Overall SMART assessment | `PASSED` |
| Reported remaining life | Approximately 96%–97%, based on vendor attributes 173 and 201 |
| Reallocated sectors (ID 5) | `0` |
| Runtime bad blocks (ID 183) | `0` |
| Reported uncorrectable errors (ID 187) | `0` |
| Interface CRC errors (ID 199) | `0` |
| Drive temperature (ID 194) | 29°C idle; 61°C recorded lifetime maximum |
| Power-on time (ID 9) | 9,468 hours, approximately 1.08 years |
| Power cycles (ID 12) | 2,339 |

#### Auxiliary SSD — 1 TB Verbatim Vi550 S3 (`/dev/sdb`)

| Check | Result |
| --- | --- |
| Attribute-based SMART assessment | `PASSED` |
| SMART self-test history | No self-tests logged |
| Available reserved space (ID 232) | Normalized value `100` |
| Wear-leveling count (ID 177) | Raw value `0` |
| Reallocated sectors (ID 5) | `0` |
| Current pending sectors (ID 197) | `0` |
| Offline uncorrectable sectors (ID 198) | `0` |
| Program/erase failures (IDs 175, 176, 181, and 182) | `0` |
| Interface CRC errors (ID 199) | `0` |
| Drive temperature (ID 194) | 25°C |
| Power-on time (ID 9) | 135 hours |
| Power cycles (ID 12) | 125 |

#### Media HDD — 8 TB HGST HUS728T8TALE6L4 (`/dev/sdc`)

| Check | Result |
| --- | --- |
| Attribute-based SMART assessment | `PASSED` |
| Extended offline self-test | Completed without error at 55,931 lifetime hours |
| Reallocated sectors (ID 5) | `0` |
| Reallocated events (ID 196) | `0` |
| Current pending sectors (ID 197) | `0` |
| Offline uncorrectable sectors (ID 198) | `0` |
| Interface CRC errors (ID 199) | `0` |
| Drive temperature (ID 194) | 38°C; recorded range 18°C–48°C |
| Power-on time (ID 9) | 55,942 hours, approximately 6.38 years |
| Power cycles (ID 12) | 15 |

These readings form the post-migration baseline. Remaining cold-boot, sustained-load, SSD self-test, and periodic monitoring tasks are tracked in [ROADMAP.md](ROADMAP.md).

## 2026-10-20 — Local media-library transition complete

The 8 TB HDD is fully operational as the local media library for personally preserved media, completing the planned storage and media-server transition.

### Service architecture

- Jellyfin runs locally to provide media access.
- Tiered storage orchestration organizes library content across the scratch and archive tiers.
- The media library is kept separate from service configuration, metadata, and backup data by design.

This public build log intentionally excludes service URLs, network configuration, filesystem paths, credentials, media inventory, and personally identifying media details. The historical validation and acceptance notes retained in the roadmap are not outstanding phase gates.

## 2026-10-20 — Current scope complete

All roadmap phases (0–5) are complete for the current homelab scope. Jellyfin transcoding and encoding have been verified with Intel Quick Sync hardware acceleration, using minimal integrated-GPU resources. Future expansion is planned but intentionally unspecified.

### Memory validation

The two installed 8 GB DDR4 SO-DIMMs are compatible and fully operational at the CPU-supported DDR4-2400 rate. The prior mixed-memory compatibility and stability risk is resolved and has been removed from the active risk register.

### Storage validation

The refurbished 256 GB SATA system SSD has passed validation and is not security-locked. The 8 TB media HDD is operational; its observed wear is minimal, and its previously recorded SMART extended self-test completed without error. The resolved SSD-lock and HDD-wear risks have been removed from the active risk register.

### Network uplink

The former 100 Mbit/s 2.4 GHz repeater bridge has been replaced with a dedicated 10 m Cat6 Ethernet cable rated for gigabit networking. This improves the physical uplink without disclosing local addressing, service endpoints, or network topology.

## 2026-10-25 — Public site update: v1.1 case study, Lab simulator, and content sanitization

The public project site was updated through the Onepage beta MCP. This entry records what changed on the site; it does not change the hardware or service baseline above.

### Published content

- **v1.1 case study:** "Engineering a resilient, frontier-model-governed homelab", published as a Releases entry (Phase 6 — Hardening and AI operations). It covers four design areas:
  - zero-trust remote access: outbound-only tunnels, OIDC identity, and FIDO2 passkeys instead of forwarded router ports
  - three-tier storage: an M.2 SATA system tier, a 1 TB SSD scratch tier for transcode and staging writes, and the 8 TB HDD archive tier
  - Intel Quick Sync transcoding on the J5005's UHD Graphics 605
  - out-of-band AI operations: tool-less conversational models, kept apart from an allow-listed FastMCP operations server
- **Lab page (`/lab`):** an interactive, sanitized replica of the control plane with:
  - simulated telemetry gauges (CPU load, core temperature, memory, scratch-SSD endurance) seeded from real host baselines
  - a service-health grid in seven groups: edge access, media engine, transcode acceleration, storage orchestration, SMART health monitoring, AI operations, and control plane
  - event simulators for a transcode burst, SMART diagnostics, and a FIDO2 sign-in, each streaming console output
  - a knowledge base with three runbooks: KB-01 relying-party alignment behind reverse proxies, KB-02 scratch-buffer wear-leveling, and KB-03 sandboxed agent architecture
- **Navigation:** the shared header now links Hardware, Roadmap, Releases, and Lab. Anchor links use `/#…` so they work from every page.

### Sanitization rules applied

- Service groupings were derived from the running container list and host telemetry, read through the homelab MCP in read-only mode. Configuration reads through that MCP return only redacted summaries.
- Download, indexing, scraping, and personal side-project services are omitted from all public pages.
- Third-party library-organization tool names were removed from the home-page specs table, the home-page SEO description, and the v1.0 release entry. They were replaced with the same abstracted descriptions the Lab page uses: local streaming media server, tiered storage orchestration, and archive tier.
- Every hostname, address, and identifier on the site is a documentation placeholder: `example.com`, `idp.example.com`, `auth.internal.corp`, RFC 5737 `192.0.2.x`, and `client_id=<redacted>`.
- After publishing, the live HTML of every page was scanned for restricted terms; none were found.

### Site template fixes

- Release pages now show the release date as `YYYY-MM-DD` instead of a raw ISO timestamp.
- The Lab page's above-the-fold content renders before JavaScript loads. The sandbox status pill now wraps at phone widths.
- Shared site components: the button component can act as a click button, and the status pill gained an optional wrapping mode. Existing uses are unchanged.

Open item: the v1.1 entry has no cover image yet, so the site shows a placeholder.
