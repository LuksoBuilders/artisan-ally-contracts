import {
  loadFixture,
  time,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers, upgrades } from "hardhat";
import { ArtisanAlly, LevelManager } from "../../typechain-types";

describe("ApexDeities", function () {
  async function deployFixture() {
    const [owner, upgrader, xpManipulator] = await hre.ethers.getSigners();

    const ApexDeities = await hre.ethers.getContractFactory("ApexDeities");
    const apexDeities = await ApexDeities.deploy(await owner.getAddress());

    const HolyShit = await hre.ethers.getContractFactory("HolyShit");
    const holyShit = await HolyShit.deploy(
      await apexDeities.getAddress(),
      owner.address,
      "0x00008019f9b1002099d843a40461256a5eaed7830c7a2e86cabcb787eb2ead7d2e96601b8117d055697066733a2f2f516d547537524356734e51506a7a3252654a53544a32687a706569463847334e4c314672567878664832726e6f37"
    );

    const ArtisanAllyImplementation = await hre.ethers.getContractFactory(
      "ArtisanAlly"
    );

    const artisanAlly = await upgrades.deployProxy(ArtisanAllyImplementation, [
      owner.address,
      upgrader.address,
    ]);

    const LevelManagerImplementation = await hre.ethers.getContractFactory(
      "LevelManager"
    );

    const initialLevelExperience = ethers.parseEther("10");

    const levelManager = (await upgrades.deployProxy(
      LevelManagerImplementation,
      [owner.address, xpManipulator.address, initialLevelExperience, 1000]
    )) as unknown as LevelManager;

    return {
      apexDeities,
      owner,
      upgrader,
      xpManipulator,
      holyShit,
      artisanAlly,
      levelManager,
      initialLevelExperience,
    };
  }

  describe("Deployment", function () {
    it("Should get the right proper", async function () {
      const { levelManager, owner, upgrader, xpManipulator } =
        await loadFixture(deployFixture);
      expect(await levelManager.getAddress()).to.not.equal(ethers.ZeroAddress);

      const DEFAULT_ADMIN_ROLE = await levelManager.DEFAULT_ADMIN_ROLE();
      const EXPERIENCE_MANIPULATOR =
        await levelManager.EXPERIENCE_MANIPULATOR();

      expect(
        await levelManager.hasRole(DEFAULT_ADMIN_ROLE, owner.address)
      ).to.equal(true);

      expect(
        await levelManager.hasRole(
          EXPERIENCE_MANIPULATOR,
          xpManipulator.address
        )
      ).to.equal(true);

      expect(await levelManager.experienceLevels(0)).to.equal(
        ethers.parseEther("10")
      );
    });
  });

  describe("Experience Levels", function () {
    it("Prices must increase 10% each time", async function () {
      const { levelManager } = await loadFixture(deployFixture);

      const experienceLevels = [];
      const formattedExperienceLevels = [];
      const totalExperienceLevels = [];
      const totalFormattedExperienceLevels = [];
      totalExperienceLevels.push(BigInt(0));
      totalFormattedExperienceLevels.push(0);

      for (let i = 0; i < 10; i++) {
        const xpLevel = await levelManager.experienceLevels(i);
        const totalExpLevel = await levelManager.totalExperienceLevels(i + 1);

        experienceLevels.push(xpLevel);
        totalExperienceLevels.push(totalExpLevel);

        formattedExperienceLevels.push(Number(ethers.formatEther(xpLevel)));
        totalFormattedExperienceLevels.push(
          Number(ethers.formatEther(totalExpLevel))
        );
        await levelManager.setNextExperienceLevel();
      }

      for (let i = 9; i > 0; i--) {
        expect(
          formattedExperienceLevels[i] / formattedExperienceLevels[i - 1]
        ).to.be.greaterThan(1.09999999);
        expect(
          formattedExperienceLevels[i] / formattedExperienceLevels[i - 1]
        ).to.be.lessThan(1.10000001);

        expect(
          (totalFormattedExperienceLevels[i + 1] -
            totalFormattedExperienceLevels[i]) /
            (totalFormattedExperienceLevels[i] -
              totalFormattedExperienceLevels[i - 1])
        ).to.be.greaterThan(1.09999999);
        expect(
          (totalFormattedExperienceLevels[i + 1] -
            totalFormattedExperienceLevels[i]) /
            (totalFormattedExperienceLevels[i] -
              totalFormattedExperienceLevels[i - 1])
        ).to.be.lessThan(1.10000001);
      }
    });
  });

  describe("Increase XP", function () {
    it("Only experience manipulator should be able to increase XP", async function () {
      const { levelManager } = await loadFixture(deployFixture);

      await expect(
        levelManager.increaseXP(0, ethers.parseEther("10"))
      ).to.be.revertedWithCustomError(
        levelManager,
        "AccessControlUnauthorizedAccount"
      );
    });

    it("XP manipulator should be able to increase XP", async function () {
      const { levelManager, xpManipulator } = await loadFixture(deployFixture);

      await levelManager
        .connect(xpManipulator)
        .increaseXP(0, ethers.parseEther("10"));
    });

    it("Increasing the 5 xp should increase deity exp but not level", async function () {
      const { levelManager, xpManipulator } = await loadFixture(deployFixture);

      const deityId = 0;

      const XPAmount = ethers.parseEther("5");

      await expect(
        levelManager.connect(xpManipulator).increaseXP(deityId, XPAmount)
      )
        .to.emit(levelManager, "XPIncreased")
        .withArgs(deityId, XPAmount)
        .to.not.emit(levelManager, "LevelIncreased");

      expect(await levelManager.deityXPs(deityId)).to.equal(XPAmount);
      expect(await levelManager.deityLevels(deityId)).to.equal(0);
    });

    it("Increasing the 10 xp should increase deity exp and level", async function () {
      const { levelManager, xpManipulator } = await loadFixture(deployFixture);

      const deityId = 0;

      const XPAmount = ethers.parseEther("10");

      await expect(
        levelManager.connect(xpManipulator).increaseXP(deityId, XPAmount)
      )
        .to.emit(levelManager, "XPIncreased")
        .withArgs(deityId, XPAmount)
        .to.emit(levelManager, "LevelIncreased")
        .withArgs(deityId, 1, 1);

      expect(await levelManager.deityXPs(deityId)).to.equal(XPAmount);
      expect(await levelManager.deityLevels(deityId)).to.equal(1);
    });

    it("Increasing the 100 xp should increase deity exp and level by 7", async function () {
      const { levelManager, xpManipulator } = await loadFixture(deployFixture);

      const deityId = 0;

      const XPAmount = ethers.parseEther("105");

      await expect(
        levelManager.connect(xpManipulator).increaseXP(deityId, XPAmount)
      )
        .to.emit(levelManager, "XPIncreased")
        .withArgs(deityId, XPAmount)
        .to.emit(levelManager, "LevelIncreased")
        .withArgs(deityId, 7, 7);

      expect(await levelManager.deityXPs(deityId)).to.equal(XPAmount);
      expect(await levelManager.deityLevels(deityId)).to.equal(7);
    });

    it("Increasing the 50 xp times should increase deity exp and level by 2 times", async function () {
      const { levelManager, xpManipulator } = await loadFixture(deployFixture);

      const deityId = 0;

      const XPAmount = ethers.parseEther("50");

      await expect(
        levelManager.connect(xpManipulator).increaseXP(deityId, XPAmount)
      )
        .to.emit(levelManager, "XPIncreased")
        .withArgs(deityId, XPAmount)
        .to.emit(levelManager, "LevelIncreased")
        .withArgs(deityId, 5, 5);

      expect(await levelManager.deityXPs(deityId)).to.equal(XPAmount);
      expect(await levelManager.deityLevels(deityId)).to.equal(7);
    });
  });
});

/*
[
             0,          10,
            21,        33.1,
         46.41,      61.051,
       77.1561,    94.87171,
    114.358881, 135.7947691,
  159.37424601
]

*/
