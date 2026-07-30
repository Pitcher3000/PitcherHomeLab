# Project roadmap

## Goal

Turn a Fujitsu FUTRO S940 into a reliable, low-power homelab host. The first milestone expands memory to 16 GB and establishes a safe, tested path for NVMe storage.

## Status legend

- [ ] Planned
- [~] In progress
- [x] Complete
- [!] Blocked or requires a decision

## Verified platform baseline

Fujitsu lists the FUTRO S940 with a D3543-A1 Mini-ITX board, a Pentium Silver J5005, up to 16 GB of DDR4-2400 SO-DIMM memory, and factory M.2 SATA storage. The D3543/D3544 mainboard documentation describes two DDR4 SO-DIMM sockets and an M.2 storage interface with SATA/PCIe capability.

The exact board identifier and connector keying in this machine must still be checked before buying an NVMe adapter.

## Phase 0 — Inventory and recovery baseline

- [ ] Photograph the mainboard, M.2 connector, standoffs, installed SSD, power supply label, and board revision label.
- [ ] Record the BIOS version and current BIOS settings.
- [ ] Record the existing SSD model, interface, partition layout, and health data.
- [ ] Back up the existing system or create recovery media.
- [ ] Run a short baseline test and record idle/load temperatures and power consumption if a meter is available.

### Exit criteria

- Exact board revision is known.
- Existing system can be restored if an upgrade fails.
- Physical space and mounting points for an adapter and NVMe drive are documented.

## Phase 1 — Upgrade memory to 16 GB

Target: reuse two matching 8 GB modules from the old laptop.

### Compatibility checklist

- [ ] Both modules are 260-pin DDR4 SO-DIMMs, not desktop DIMMs.
- [ ] Modules are unbuffered, non-ECC, and rated for 1.2 V.
- [ ] A matched pair is preferred; DDR4-2400 is native, while faster compatible modules may run at the board's supported speed.
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

## Phase 2 — Validate an NVMe path

### Important interface distinction

NVMe uses PCIe; it is not a faster SATA mode. A passive adapter cannot convert a SATA-only signal into NVMe. This project is viable only if the S940's M.2 connector exposes its documented PCIe mode, or if NVMe is connected through a separate PCIe adapter.

### Preferred path: onboard M.2 storage connector

- [ ] Verify that the installed board is D3543-A1 (including its full revision suffix).
- [ ] Confirm that the storage socket is M.2 Key B and exposes PCIe on this board revision.
- [ ] Identify a mechanically compatible **M.2 Key B host to M.2 Key M NVMe** adapter/extension that routes PCIe signals; reject products that only adapt SATA wiring.
- [ ] Check 2242/2260/2280 mounting, cable orientation, drive clearance, airflow, and electrical insulation.
- [ ] Keep the original SATA SSD unchanged for the first hardware-detection test.
- [ ] Test whether the NVMe device appears in firmware and in a live Linux environment.
- [ ] Test UEFI boot from NVMe. If firmware can detect the drive only after an OS loads, retain a small SATA or USB boot device and place the main system/data on NVMe.

### Fallback path: expansion-slot adapter

- [ ] Verify the physical PCIe slot and available chassis clearance on the D3543-A1 board.
- [ ] Test a PCIe-to-M.2 Key M NVMe adapter sized for the available slot/lanes.
- [ ] Repeat firmware detection, operating-system detection, boot, thermal, and stability tests.

### Validation

- [ ] Confirm the NVMe link width and speed in the operating system.
- [ ] Check drive health and temperatures at idle and during sustained writes.
- [ ] Run read/write benchmarks after health checks; record results without treating consumer-drive peak speed as the goal.
- [ ] Run a sustained storage test and reboot/power-cycle tests.
- [ ] Confirm that the original recovery path still works.

### Exit criteria

- NVMe is detected reliably after cold boots and restarts.
- The chosen boot arrangement is documented and reproducible.
- No thermal, power, or data-integrity errors appear under sustained load.

## Phase 3 — Base homelab platform

This phase will be finalized after the intended workloads are chosen.

- [ ] Select the host platform (for example, Proxmox VE or a minimal Linux server).
- [ ] Define storage roles: boot, virtual machines/containers, application data, and backups.
- [ ] Configure updates, time synchronization, remote administration, and SSH keys.
- [ ] Establish configuration backups before deploying services.
- [ ] Add basic monitoring for disk health, temperatures, memory pressure, and availability.

## Phase 4 — Services and networking

- [ ] Define the first workloads and their resource budgets.
- [ ] Decide whether additional network interfaces are required.
- [ ] Document VLANs, addressing, DNS, firewall rules, and remote-access boundaries.
- [ ] Deploy services one at a time with backup and restore tests.

## Open decisions

1. What is the exact D3543-A1 board revision and current BIOS version?
2. What are the manufacturer and part numbers of the two 8 GB laptop modules?
3. Should NVMe be the boot device, workload storage, or both?
4. Which homelab workloads are planned?
5. Is the PCIe expansion slot needed for networking, making the onboard M.2 route preferable?

## Known risks

| Risk | Mitigation |
| --- | --- |
| Adapter is mechanically compatible but carries only SATA | Verify host key, PCIe routing, and adapter schematic/listing before purchase |
| Firmware does not boot from NVMe | Keep a small SATA/USB boot device and use NVMe for the main system or data |
| Used laptop RAM is incompatible or unstable | Check labels/specifications and complete memory testing before deployment |
| NVMe throttles in the fanless chassis | Use a suitable low-power drive, monitor temperature, and add a heatsink/airflow only if measurements justify it |
| Added devices exceed the power or thermal margin | Measure load behavior and add one component at a time |
| Original installation becomes unbootable | Preserve the original SSD until the new path passes cold-boot and recovery tests |

## Reference documentation

- [Fujitsu FUTRO S940 specifications](https://www.fujitsu.com/vn/en/products/computing/pc/thin-clients/futro-s940/)
- [Fujitsu FUTRO S940 operating manual](https://support.ts.fujitsu.com/Search/SWP1219904.asp)
- [Fujitsu D3543/D3544 BIOS manual](https://support.ts.fujitsu.com/Search/SWP1214228.asp)
- [Fujitsu D3543/D3544 mainboard short description (archived copy)](https://manuals.plus/m/6b89cd729b95e73f1e79652dccd58ca2397b1bbe1c30029b320ac5da416020ee.pdf)
