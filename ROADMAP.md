# Project roadmap

## Goal

Turn a Fujitsu FUTRO S940 into a reliable, low-power homelab host. The first milestone expands memory to 16 GB, replaces the original 32 GB system drive with a 256 GB M.2 SATA SSD, and adds 8 TB of external bulk storage.

## Status legend

- [ ] Planned
- [~] In progress
- [x] Complete
- [!] Blocked or requires a decision

## Verified platform baseline

Fujitsu lists the FUTRO S940 with a D3543-A1 Mini-ITX board, a Pentium Silver J5005, up to 16 GB of DDR4-2400 SO-DIMM memory, and factory M.2 SATA storage. The D3543/D3544 mainboard documentation describes two DDR4 SO-DIMM sockets and an M.2 storage interface with SATA/PCIe capability.

The storage plan now uses a native M.2 SATA replacement, so no NVMe bridge is required. The exact board identifier should still be recorded for the build inventory.

## Acquired upgrade hardware

| Item | Identification | Role | Cost |
| --- | --- | --- | ---: |
| M.2 SSD | Western Digital PC SA530, 256 GB, M.2 2280 SATA III, `SDATN8Y-256G`, refurbished, HP SPS `L60641-001` | Internal system drive | €28.00 |
| Hard disk | Hitachi/Western Digital, 8 TB, 3.5-inch, 7,200 RPM, SATA 6 Gb/s; PioParts product `P40100`, 12-month warranty; exact drive model pending label inspection | External bulk storage | €129.00 |
| Dock | ICY BOX IB-1122-U3, 2.5/3.5-inch SATA to USB 3.0, B-stock | Powered USB storage interface | €10.00 |
| Shipping shown | SSD order | — | €4.50 |
| **Documented total** | Excludes any shipping not visible in the supplied order images | | **€171.50** |

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
- [ ] Replace the existing 4 GB module with the two 8 GB modules.
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
- [ ] Install the 256 GB SSD and confirm detection in firmware.
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

## Phase 3 — Add 8 TB external storage

Target: connect the 8 TB 3.5-inch SATA HDD through the externally powered ICY BOX IB-1122-U3 USB 3.0 dock.

### Intake and burn-in

- [ ] Record the full HDD model and serial number from its label.
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
- [ ] Mount by UUID rather than `/dev/sdX` device name.
- [ ] Configure safe behavior when the USB disk is absent at boot.
- [ ] Record idle/load temperature and verify stable operation during a sustained transfer.
- [ ] Configure SMART monitoring and alerts if the USB bridge supports them.
- [ ] Protect the open dock from knocks, dust, accidental removal, and power-button presses.
- [ ] Define a separate backup target for irreplaceable data; this single disk is not a backup by itself.

### Exit criteria

- The full 8 TB capacity is available and mounts consistently.
- SMART, surface, USB reconnect, reboot, and sustained-transfer tests pass.
- Important data has an independent backup copy.

## Phase 4 — Base homelab platform

This phase will be finalized after the intended workloads are chosen.

- [ ] Select the host platform (for example, Proxmox VE or a minimal Linux server).
- [ ] Define storage roles: boot, virtual machines/containers, application data, and backups.
- [ ] Configure updates, time synchronization, remote administration, and SSH keys.
- [ ] Establish configuration backups before deploying services.
- [ ] Add basic monitoring for disk health, temperatures, memory pressure, and availability.

## Phase 5 — Services and networking

- [ ] Define the first workloads and their resource budgets.
- [ ] Decide whether additional network interfaces are required.
- [ ] Document VLANs, addressing, DNS, firewall rules, and remote-access boundaries.
- [ ] Deploy services one at a time with backup and restore tests.

## Open decisions

1. What is the exact D3543-A1 board revision and current BIOS version?
2. Has the mixed Samsung memory pair completed an error-free memory test?
3. What is the exact model, manufacture date, SMART history, and warranty of the 8 TB HDD?
4. Will the 8 TB disk hold replaceable media, primary data, backups, or a mixture?
5. Which homelab workloads are planned?

## Known risks

| Risk | Mitigation |
| --- | --- |
| Used laptop RAM is incompatible or unstable | Check labels/specifications and complete memory testing before deployment |
| Refurbished SSD is locked or excessively worn | Check security state and SMART data, sanitize it, and keep the original SSD until validation passes |
| Used 8 TB HDD has hidden wear or media damage | Record initial SMART data and complete an extended self-test plus full-surface burn-in during the return window |
| USB disconnect or dock power loss corrupts data | Use stable cabling and power, mount by UUID, monitor the connection, and maintain backups |
| Open dock leaves the HDD physically exposed | Place it on a stable, ventilated surface away from impacts, liquids, and accidental removal |
| A single 8 TB disk is mistaken for a backup | Keep at least one independent copy of irreplaceable data on another device or at another location |
| Original installation becomes unbootable | Preserve the original SSD until the new M.2 SATA drive passes cold-boot and recovery tests |

## Reference documentation

- [Fujitsu FUTRO S940 specifications](https://www.fujitsu.com/vn/en/products/computing/pc/thin-clients/futro-s940/)
- [Fujitsu FUTRO S940 operating manual](https://support.ts.fujitsu.com/Search/SWP1219904.asp)
- [Fujitsu D3543/D3544 BIOS manual](https://support.ts.fujitsu.com/Search/SWP1214228.asp)
- [Fujitsu D3543/D3544 mainboard short description (archived copy)](https://manuals.plus/m/6b89cd729b95e73f1e79652dccd58ca2397b1bbe1c30029b320ac5da416020ee.pdf)
