import {
  loadFixture,
  time,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers, upgrades } from "hardhat";
import { Contract } from "ethers";
import { LevelManager, SlotManager } from "../../typechain-types";

describe("ApexDeities", function () {
  async function deployFixture() {
    const [owner, upgrader, xpManipulator, slotManipulator] =
      await hre.ethers.getSigners();

    const ApexDeities = await hre.ethers.getContractFactory("ApexDeities");
    const apexDeities = await ApexDeities.deploy(await owner.getAddress());

    const HolyShit = await hre.ethers.getContractFactory("HolyShit");
    const holyShit = await HolyShit.deploy(
      await apexDeities.getAddress(),
      owner.address,
      "0x00008019f9b1002099d843a40461256a5eaed7830c7a2e86cabcb787eb2ead7d2e96601b8117d055697066733a2f2f516d547537524356734e51506a7a3252654a53544a32687a706569463847334e4c314672567878664832726e6f37"
    );

    const LevelManagerImplementation = await hre.ethers.getContractFactory(
      "LevelManager"
    );

    const initialLevelExperience = ethers.parseEther("10");

    const levelManager = (await upgrades.deployProxy(
      LevelManagerImplementation,
      [owner.address, xpManipulator.address, initialLevelExperience, 1000]
    )) as unknown as LevelManager & Contract;

    const SlotManagerImplementation = await hre.ethers.getContractFactory(
      "SlotManager"
    );

    const slotManager = (await upgrades.deployProxy(SlotManagerImplementation, [
      owner.address,
      await levelManager.getAddress(),
    ])) as unknown as SlotManager & Contract;

    await slotManager.grantRole(
      await slotManager.SLOT_MANIPULATOR(),
      await slotManipulator.getAddress()
    );

    return {
      apexDeities,
      owner,
      upgrader,
      xpManipulator,
      slotManipulator,
      holyShit,
      levelManager,
      initialLevelExperience,
      slotManager,
    };
  }

  describe("Deployment", function () {
    it("Should get the right properties", async function () {
      const { slotManager, owner, levelManager } = await loadFixture(
        deployFixture
      );
      expect(await slotManager.getAddress()).to.not.equal(ethers.ZeroAddress);

      const DEFAULT_ADMIN_ROLE = await slotManager.DEFAULT_ADMIN_ROLE();

      expect(
        await slotManager.hasRole(DEFAULT_ADMIN_ROLE, owner.address)
      ).to.equal(true);

      expect(await slotManager._levelManager()).to.equal(
        await levelManager.getAddress()
      );
    });
  });

  describe("Base Slots", function () {
    it("Should get the base slots properly", async function () {
      const { slotManager, owner, levelManager } = await loadFixture(
        deployFixture
      );

      const nonExistant = 100;
      const sTierDietyId = 0;
      const aTierDeityId = 25;
      const bTierDeityId = 50;
      const cTierDeityId = 99;

      await expect(
        slotManager.getBaseSlots(nonExistant)
      ).to.be.revertedWithCustomError(slotManager, "NonExistentDeity");

      expect(await slotManager.getBaseSlots(sTierDietyId)).to.equal(4);
      expect(await slotManager.getBaseSlots(aTierDeityId)).to.equal(3);
      expect(await slotManager.getBaseSlots(bTierDeityId)).to.equal(2);
      expect(await slotManager.getBaseSlots(cTierDeityId)).to.equal(1);
    });
  });

  describe("Total Slots", function () {
    it("Should get the total slots properly", async function () {
      const { slotManager, levelManager, xpManipulator } = await loadFixture(
        deployFixture
      );

      const XPAmount = ethers.parseEther("50");
      const desiredLevel = 4;

      const nonExistant = 100;
      const sTierDietyId = 0;
      const aTierDeityId = 25;
      const bTierDeityId = 50;
      const cTierDeityId = 99;

      await expect(
        slotManager.getTotalSlots(nonExistant)
      ).to.be.revertedWithCustomError(slotManager, "NonExistentDeity");

      expect(await slotManager.getTotalSlots(sTierDietyId)).to.equal(4);
      expect(await slotManager.getTotalSlots(aTierDeityId)).to.equal(3);
      expect(await slotManager.getTotalSlots(bTierDeityId)).to.equal(2);
      expect(await slotManager.getTotalSlots(cTierDeityId)).to.equal(1);

      await levelManager
        .connect(xpManipulator)
        .increaseXP(sTierDietyId, XPAmount);
      await levelManager
        .connect(xpManipulator)
        .increaseXP(aTierDeityId, XPAmount);
      await levelManager
        .connect(xpManipulator)
        .increaseXP(bTierDeityId, XPAmount);
      await levelManager
        .connect(xpManipulator)
        .increaseXP(cTierDeityId, XPAmount);

      expect(await slotManager.getTotalSlots(sTierDietyId)).to.equal(
        4 + desiredLevel
      );
      expect(await slotManager.getTotalSlots(aTierDeityId)).to.equal(
        3 + desiredLevel
      );
      expect(await slotManager.getTotalSlots(bTierDeityId)).to.equal(
        2 + desiredLevel
      );
      expect(await slotManager.getTotalSlots(cTierDeityId)).to.equal(
        1 + desiredLevel
      );
    });
  });

  describe("Use Slots", function () {
    it("Should not be able to use a slot which deity doesn't have", async () => {
      const { slotManager, slotManipulator } = await loadFixture(deployFixture);

      const sTierDietyId = 0;
      const nonExistantSlotNumber = 4;

      await expect(
        slotManager
          .connect(slotManipulator)
          .useSlot(sTierDietyId, nonExistantSlotNumber)
      ).to.be.revertedWithCustomError(slotManager, "NotAvailableSlot");
    });

    it("Non slot manager should not be able to use slot", async () => {
      const { slotManager } = await loadFixture(deployFixture);

      const sTierDietyId = 0;
      const nonExistantSlotNumber = 4;

      await expect(
        slotManager.useSlot(sTierDietyId, nonExistantSlotNumber)
      ).to.be.revertedWithCustomError(
        slotManager,
        "AccessControlUnauthorizedAccount"
      );
    });

    it("Slot manager should be able to use proper slot and not be able to use a cooldowned one", async () => {
      const { slotManager, levelManager, xpManipulator, slotManipulator } =
        await loadFixture(deployFixture);

      const XPAmount = ethers.parseEther("50");
      const sTierDietyId = 0;
      const slotId = 4;

      await levelManager
        .connect(xpManipulator)
        .increaseXP(sTierDietyId, XPAmount);

      await expect(
        slotManager.connect(slotManipulator).useSlot(sTierDietyId, slotId)
      ).to.emit(slotManager, "SlotUsed");

      expect(await slotManager.cooldowns(sTierDietyId, slotId)).to.be.not.equal(
        0
      );
      expect(await slotManager.cooldowns(sTierDietyId, 5)).to.be.equal(0);

      await expect(
        slotManager.connect(slotManipulator).useSlot(sTierDietyId, slotId)
      ).to.be.revertedWithCustomError(slotManager, "NotAvailableSlot");

      let unlockTime = (await time.latest()) + 7 * 24 * 60 * 60;
      await time.increaseTo(unlockTime);

      await expect(
        slotManager.connect(slotManipulator).useSlot(sTierDietyId, slotId)
      ).to.emit(slotManager, "SlotUsed");
    });
  });
});
