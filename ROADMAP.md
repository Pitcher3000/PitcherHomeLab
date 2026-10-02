# Project roadmap

## Goal

Turn a Fujitsu FUTRO S940 into a reliable, low-power local media server. The first milestone expands memory to 16 GB, replaces the original 32 GB system drive with a 256 GB M.2 SATA SSD, adds an 8 TB external media library, and incorporates an existing 1 TB external SSD.

## Status legend

- [ ] Planned
- [~] In progress
- [x] Complete
- [!] Blocked or requires a decision

## Verified platform baseline

Fujitsu lists the FUTRO S940 with a D3543-A1 Mini-ITX board, a Pentium Silver J5005, up to 16 GB of DDR4-2400 SO-DIMM memory, and factory M.2 SATA storage. The D3543/D3544 mainboard documentation describes two DDR4 SO-DIMM sockets and an M.2 storage interface with SATA/PCIe capability.

The storage plan now uses a native M.2 SATA replacement, so no NVMe bridge is required. The exact board identifier should still be recorded for the build inventory.

## Installed upgrade hardware

| Item | Identification | Role | Cost |
| --- | --- | --- | ---: |
| M.2 SSD | Western Digital PC SA530, 256 GB, M.2 2280 SATA III, `SDATN8Y-256G`, refurbished, HP SPS `L60641-001` | Internal system drive | €28.00 |
| Hard disk | Hitachi/Western Digital, 8 TB, 3.5-inch, 7,200 RPM, SATA 6 Gb/s; PioParts product `P40100`, 12-month warranty; exact drive model pending label inspection | External media library | €129.00 |
| Dock | ICY BOX IB-1122-U3, 2.5/3.5-inch SATA to USB 3.0, B-stock | Powered USB storage interface | €10.00 |
| External SSD | Verbatim Vi550 S3, 1 TB, 2.5-inch SATA, rated up to 520 MB/s read and 500 MB/s write; connected through a generic ICY BOX USB enclosure | Role to be selected | Already owned |
| Shipping shown | SSD order | — | €4.50 |
| **Documented total** | Excludes any shipping not visible in the supplied order images | | **€171.50** |

## Installation update — 2026-10-02

- [x] Install both 8 GB Samsung SO-DIMMs for 16 GB total memory.
- [x] Install the 256 GB Western Digital PC SA530 M.2 SATA system drive.
- [x] Connect the 8 TB HDD through the powered ICY BOX IB-1122-U3 dock.
- [x] Connect the existing 1 TB Verbatim Vi550 S3 through its USB enclosure.

### M.2 mounting workaround

The factory M.2 mounting hardware uses a fixed, soldered standoff intended for the original shorter module. It could not be repositioned for the 2280 replacement without modifying the motherboard, so the new SSD was secured with a reversible retention workaround.

The workaround should be inspected after the first thermal cycles and during routine maintenance. The SSD must remain flat, electrically isolated, unobstructed, and firmly seated without placing bending force on the module or connector. A purpose-built non-conductive 2280 retainer is the preferred future refinement if a compatible part becomes available.

## Phase 0 — Inventory and recovery baseline

- [ ] Photograph the mainboard, M.2 connector, standoffs, installed SSD, power supply label, and board revision label.
- [ ] Record the BIOS version and current BIOS settings.
- [ ] Record the existing SSD model, interface, partition layout, and health data.
- [ ] Back up the existing system or create recovery media.
- [ ] Run a short baseline test and record idle/load temperatures and power consumption if a meter is available.

### Exit criteria

- Exact board revision is known.
- Existing system can be restored if an upgrade fails.
- The original drive and a recovery path are available until the replacement is proven stable.

## Phase 1 — Upgrade memory to 16 GB

Target: reuse two Samsung 8 GB modules from the old laptop:

- `M471A1K43CB1-CTD`: DDR4-2666, 8 GB, 1Rx8
- `M471A1K43EB1-CWE`: DDR4-3200, 8 GB, 1Rx8

They are not a matched kit, but they share capacity, voltage, rank, and x8 organization. Both should run at the S940 platform limit of DDR4-2400 if their SPD profiles negotiate correctly.

### Compatibility checklist

- [ ] Both modules are 260-pin DDR4 SO-DIMMs, not desktop DIMMs.
- [ ] Modules are unbuffered, non-ECC, and rated for 1.2 V.
- [x] Both candidate modules are 8 GB Samsung DDR4 SO-DIMMs with compatible basic characteristics.
- [ ] Confirm that the mixed pair trains at DDR4-2400 and remains error-free.
- [ ] Inspect and clean the modules and slots before installation.

### Installation and validation

- [ ] Disconnect power and discharge static electricity.
- [x] Replace the existing 4 GB module with the two 8 GB modules.
- [ ] Confirm that the BIOS detects 16 GB.
- [ ] Boot the intended operating system and confirm that it sees the full capacity.
- [ ] Run at least one complete memory-test pass; use a longer overnight test before production workloads.
- [ ] Record module part numbers, detected speed, test tool/version, duration, and result.

### Exit criteria

- 16 GB is detected consistently.
- Memory testing completes without errors.
- The host remains stable under CPU and memory load.

## Phase 2 — Replace the internal M.2 SATA system drive

Target: replace the factory 32 GB M.2 SATA SSD with the refurbished 256 GB Western Digital PC SA530 `SDATN8Y-256G`.

### Preparation and installation

- [x] Select a native M.2 2280 SATA replacement; no NVMe bridge is needed.
- [ ] Inspect the SSD and verify its part number, capacity, firmware, and SMART data.
- [ ] Confirm that the refurbished self-encrypting drive is not security-locked; sanitize it before use.
- [ ] Back up or image the original 32 GB SSD.
- [ ] Decide between cloning the existing installation and performing a clean installation.
- [x] Install the 256 GB SSD using the reversible retention workaround.
- [ ] Confirm the SSD is detected consistently in firmware after multiple cold boots.
- [ ] Install or restore the host operating system.
- [ ] Confirm correct partition alignment, TRIM support, and periodic TRIM scheduling.
- [ ] Retain the original SSD unchanged until the replacement passes validation.

### Validation

- [ ] Run the SSD's SMART short and extended self-tests.
- [ ] Check for media/data-integrity errors, unsafe shutdowns, and abnormal wear indicators.
- [ ] Run reboot and cold-boot tests.
- [ ] Run a sustained storage test while monitoring temperature.
- [ ] Verify that the recovery image or original SSD can still boot.

### Exit criteria

- The 256 GB SSD boots reliably after restarts and cold starts.
- SMART and sustained-load tests show no errors.
- The original system can be restored if necessary.

## Phase 3 — Add external storage

Targets:

- [x] Connect the 8 TB 3.5-inch SATA HDD through the externally powered ICY BOX IB-1122-U3 USB 3.0 dock for use as the local media library.
- [x] Connect the existing 1 TB Verbatim Vi550 S3 SSD through a generic ICY BOX USB enclosure.
- [ ] Assign the 1 TB SSD's final role.

### Intake and burn-in

- [ ] Record the full HDD model and serial number from its label.
- [x] Record the 1 TB SSD model: Verbatim Vi550 S3, 2.5-inch SATA, rated up to 520 MB/s read and 500 MB/s write.
- [ ] Record the SSD serial number and health data; confirm the enclosure negotiates at USB 3.x speed.
- [x] Record seller and warranty: PioParts, 12 months.
- [ ] Verify that the supplied dock power adapter matches the IB-1122-U3 and is correctly rated.
- [ ] Confirm that the drive reports 8 TB and that SMART passthrough works through the dock.
- [ ] Save the initial SMART report, including power-on hours, start/stop count, reallocated sectors, pending sectors, and uncorrectable sectors.
- [ ] Run the SMART extended self-test.
- [ ] Run a complete destructive surface/write-read test before placing real data on the disk.
- [ ] Run all acceptance tests during the return period and retain the invoice for the 12-month warranty.
- [ ] Reject, return, or make a warranty claim if health data is withheld, capacity is wrong, SMART reports media errors, or the surface test fails.

### Deployment

- [ ] Choose the filesystem based on the host platform and recovery requirements.
- [ ] Select the 1 TB SSD's role before formatting or moving data onto it.
- [ ] Mount by UUID rather than `/dev/sdX` device name.
- [ ] Give both external filesystems unique labels and document which physical device owns each UUID.
- [ ] Configure safe behavior when the USB disk is absent at boot.
- [ ] Keep media-server configuration, database, artwork, and watch-state data separate from the media library.
- [ ] Record idle/load temperature and verify stable operation during a sustained transfer.
- [ ] Configure SMART monitoring and alerts if the USB bridge supports them.
- [ ] Protect the open dock from knocks, dust, accidental removal, and power-button presses.
- [ ] Back up configuration and metadata independently; define a separate backup target for any irreplaceable media.

### Exit criteria

- The full 8 TB HDD and 1 TB SSD capacities are available and mount consistently.
- SMART, USB reconnect, reboot, and sustained-transfer tests pass for both devices; the HDD also passes its full-surface test.
- Important data has an independent backup copy.

## Phase 4 — Base homelab platform

Primary workload: local media serving on Debian stable. The media-server stack remains to be selected.

- [x] Select the host operating system: Debian 13 `trixie`, the current stable release; install the latest available point release and apply all updates.
- [ ] Perform a minimal headless Debian installation on the 256 GB M.2 SATA SSD.
- [ ] Enable the Debian security repository and establish a regular update policy.
- [ ] Define storage roles: system, media library, application configuration/metadata, and backups.
- [ ] Configure updates, time synchronization, remote administration, and SSH keys.
- [ ] Establish configuration backups before deploying services.
- [ ] Add basic monitoring for disk health, temperatures, memory pressure, and availability.

## Phase 5 — Services and networking

- [ ] Select the media-server application and decide between native, containerized, or virtual-machine deployment.
- [ ] Test direct play and transcoding with representative client devices and media formats.
- [ ] Decide whether additional network interfaces are required.
- [ ] Document VLANs, addressing, DNS, firewall rules, and remote-access boundaries.
- [ ] Deploy services one at a time with backup and restore tests.

## Open decisions

1. What is the exact D3543-A1 board revision and current BIOS version?
2. Has the mixed Samsung memory pair completed an error-free memory test?
3. What is the exact model, manufacture date, SMART history, and warranty of the 8 TB HDD?
4. Which media-server application and deployment model will be used?
5. What role should the 1 TB external SSD serve?
6. Which client devices and codecs must be supported, and will transcoding be required?

## Known risks

| Risk | Mitigation |
| --- | --- |
| Used laptop RAM is incompatible or unstable | Check labels/specifications and complete memory testing before deployment |
| Refurbished SSD is locked or excessively worn | Check security state and SMART data, sanitize it, and keep the original SSD until validation passes |
| Used 8 TB HDD has hidden wear or media damage | Record initial SMART data and complete an extended self-test plus full-surface burn-in during the return window |
| USB disconnect or dock power loss corrupts data | Use stable cabling and power, mount by UUID, monitor the connection, and maintain backups |
| Open dock leaves the HDD physically exposed | Place it on a stable, ventilated surface away from impacts, liquids, and accidental removal |
| Temporary M.2 retention loosens or traps heat | Inspect it after thermal cycles, keep the SSD flat and unobstructed, and replace it with a compatible mechanical retainer when practical |
| A single 8 TB disk is mistaken for a backup | Keep at least one independent copy of irreplaceable data on another device or at another location |
| Original installation becomes unbootable | Preserve the original SSD until the new M.2 SATA drive passes cold-boot and recovery tests |

## Reference documentation

- [Fujitsu FUTRO S940 specifications](https://www.fujitsu.com/vn/en/products/computing/pc/thin-clients/futro-s940/)
- [Fujitsu FUTRO S940 operating manual](https://support.ts.fujitsu.com/Search/SWP1219904.asp)
- [Fujitsu D3543/D3544 BIOS manual](https://support.ts.fujitsu.com/Search/SWP1214228.asp)
- [Fujitsu D3543/D3544 mainboard short description (archived copy)](https://manuals.plus/m/6b89cd729b95e73f1e79652dccd58ca2397b1bbe1c30029b320ac5da416020ee.pdf)
- [Debian stable release information](https://www.debian.org/releases/stable/)
