import {
  loadFixture,
  time,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers, upgrades } from "hardhat";
import { ArtisanAlly, LevelManager, SlotManager } from "../../typechain-types";
import { Contract } from "ethers";

describe("Artisan Ally", function () {
  async function deployFixture() {
    const [
      owner,
      upgrader,
      xpManipulator,
      slotManipulator,
      artisan,
      deityOwner,
    ] = await hre.ethers.getSigners();

    const ApexDeities = await hre.ethers.getContractFactory("ApexDeities");
    const apexDeities = await ApexDeities.deploy(await owner.getAddress());

    const HolyShit = await hre.ethers.getContractFactory("HolyShit");
    const holyShit = await HolyShit.deploy(
      await apexDeities.getAddress(),
      owner.address,
      "0x00008019f9b1002099d843a40461256a5eaed7830c7a2e86cabcb787eb2ead7d2e96601b8117d055697066733a2f2f516d547537524356734e51506a7a3252654a53544a32687a706569463847334e4c314672567878664832726e6f37"
    );

    const FellowshipImplementation = await hre.ethers.getContractFactory(
      "FellowshipLogic"
    );

    const fellowshipImplementation = await FellowshipImplementation.deploy();

    const FellowshipBeacon = await hre.ethers.getContractFactory(
      "FellowshipBeacon"
    );

    const fellowshipBeacon = await FellowshipBeacon.deploy(
      await fellowshipImplementation.getAddress(),
      owner.address
    );

    const FellowshipFactory = await hre.ethers.getContractFactory(
      "FellowshipFactory"
    );

    const fellowshipFactory = await FellowshipFactory.deploy();

    const ArtisanAllyImplementation = await hre.ethers.getContractFactory(
      "ArtisanAlly"
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

    const artisanAlly = (await upgrades.deployProxy(ArtisanAllyImplementation, [
      owner.address,
      await fellowshipBeacon.getAddress(),
      await fellowshipFactory.getAddress(),
      await apexDeities.getAddress(),
      await slotManager.getAddress(),
    ])) as unknown as ArtisanAlly & Contract;

    await slotManager.grantRole(
      await slotManager.SLOT_MANIPULATOR(),
      await artisanAlly.getAddress()
    );

    return {
      apexDeities,
      owner,
      upgrader,
      xpManipulator,
      slotManipulator,
      deityOwner,
      holyShit,
      artisanAlly,
      levelManager,
      initialLevelExperience,
      slotManager,
      artisan,
    };
  }

  describe("Deployment", function () {
    it("Should get the right proper", async function () {
      const { artisanAlly, holyShit, owner, upgrader } = await loadFixture(
        deployFixture
      );
      expect(await artisanAlly.getAddress()).to.not.equal(ethers.ZeroAddress);

      expect(await artisanAlly.owner()).to.equal(await owner.getAddress());

      const DefaultAdminRole = await artisanAlly.DEFAULT_ADMIN_ROLE();

      expect(
        await artisanAlly.hasRole(DefaultAdminRole, owner.address)
      ).to.equal(true);
    });
  });

  describe("Fellowship founding", function () {
    it("Should not be able to found a fellowship if don't own the deity", async function () {
      const { artisanAlly, apexDeities, deityOwner, upgrader, artisan } =
        await loadFixture(deployFixture);

      await apexDeities.connect(deityOwner).mint(
        {
          sTierAmount: 1,
          aTierAmount: 0,
          bTierAmount: 0,
          cTierAmount: 0,
        },
        {
          value: ethers.parseEther("100"),
        }
      );

      const deityId = 0;
      const slot = 0;

      await expect(
        artisanAlly.foundFellowship(deityId, slot, await artisan.getAddress())
      ).to.be.revertedWithCustomError(artisanAlly, "NotDeityOwner");
    });
  });

  it("Should properly found a fellowship", async function () {
    const { artisanAlly, apexDeities, deityOwner, slotManager, artisan } =
      await loadFixture(deployFixture);

    await apexDeities.connect(deityOwner).mint(
      {
        sTierAmount: 1,
        aTierAmount: 0,
        bTierAmount: 0,
        cTierAmount: 0,
      },
      {
        value: ethers.parseEther("100"),
      }
    );

    const deityId = 0;
    const slot = 0;

    await expect(
      artisanAlly
        .connect(deityOwner)
        .foundFellowship(deityId, slot, await artisan.getAddress())
    ).to.emit(artisanAlly, "FellowshipFounded");

    expect(await slotManager.cooldowns(deityId, slot)).to.not.equal(0);

    // Should create an nft for the artisan
    // Should emit the event
    // Should use the slot
  });

  it("Should mint a fellowship nft for the artisan", async function () {
    const { artisanAlly, apexDeities, deityOwner, upgrader, artisan } =
      await loadFixture(deployFixture);

    await apexDeities.connect(deityOwner).mint(
      {
        sTierAmount: 1,
        aTierAmount: 0,
        bTierAmount: 0,
        cTierAmount: 0,
      },
      {
        value: ethers.parseEther("100"),
      }
    );

    const deityId = 0;
    const slot = 0;
    const tx = await artisanAlly
      .connect(deityOwner)
      .foundFellowship(deityId, slot, await artisan.getAddress());
    const result = await tx.wait();

    // @ts-ignore
    function findEventArgs(logs, eventName) {
      let _event = null;

      for (const event of logs) {
        if (event.fragment && event.fragment.name === eventName) {
          _event = event.args;
        }
      }
      return _event;
    }

    const fellowshipContractAddress = findEventArgs(
      // @ts-ignore
      result.logs,
      "FellowshipFounded"
    )[0];

    const fellowshipTokenId = await artisanAlly.getFellowshipTokenId(
      fellowshipContractAddress
    );

    expect(await artisanAlly.tokenOwnerOf(fellowshipTokenId)).to.be.equal(
      await artisan.getAddress()
    );
  });

  it("Should not be able to found a fellowship if slot is not existant or cooldowned.", async function () {});
});
