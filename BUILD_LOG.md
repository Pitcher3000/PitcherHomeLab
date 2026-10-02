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
