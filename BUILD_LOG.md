# Build log

## 2026-10-02 — Hardware & OS Update: Futro S940 Storage Expansion & Thermal Refresh

### Hardware and thermals

- **Thermal refresh:** Removed the factory thermal interface material and applied Arctic MX-6. The passive, fanless system stabilized at a 41°C idle baseline.
- **M.2 mounting:** Installed an insulated custom M.2 standoff. The SSD sits flat and firmly seated, with no mechanical flex at the connector pins.

### Storage and OS migration

- **Disk expansion:** Cloned the installation block-for-block to the replacement 256 GB SSD with `dd`.
- **Partition repair and expansion:** Repaired the backup GPT headers at the new disk boundary and expanded the `ext4` root filesystem to the full 237.6 GiB usable capacity.
- **Swap architecture:** Removed the legacy `sda3` disk swap partition and created a persistent 4 GB `/swapfile` with the following `/etc/fstab` entry: `/swapfile none swap sw 0 0`.
- **Boot optimization:** Removed the orphaned swap-partition UUID from `/etc/fstab`, resolving a 90-second systemd dependency timeout during boot.
- **Headless access:** Enabled the SSH daemon and verified that it remains enabled across boot targets with `systemctl enable --now ssh`.

### Initial storage health audit

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

This is the initial post-migration baseline. The remaining extended self-tests, cold-boot checks, sustained-load tests, and periodic monitoring tasks are tracked in [ROADMAP.md](ROADMAP.md).
