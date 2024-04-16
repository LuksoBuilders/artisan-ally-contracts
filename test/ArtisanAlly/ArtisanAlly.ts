import {
  loadFixture,
  time,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers, upgrades } from "hardhat";
import {
  ArtisanAlly,
  LevelManager,
  SlotManager,
  FellowshipLogic,
  EndorsementTokenLogic,
  ContributionTokenLogic,
  FeeCollector,
} from "../../typechain-types";
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
      newArtisan,
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

    const fellowshipImplementation =
      (await FellowshipImplementation.deploy()) as unknown as FellowshipLogic &
        Contract;

    const Beacon = await hre.ethers.getContractFactory("Beacon");

    const fellowshipBeacon = await Beacon.deploy(
      await fellowshipImplementation.getAddress(),
      owner.address
    );

    const BeaconProxyFactory = await hre.ethers.getContractFactory(
      "BeaconProxyFactory"
    );

    const beaconProxyFactory = await BeaconProxyFactory.deploy();

    const ArtisanAllyImplementation = await hre.ethers.getContractFactory(
      "ArtisanAlly"
    );

    const FeeCollectorImplementation = await hre.ethers.getContractFactory(
      "FeeCollector"
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

    const EndorsementTokenLogicFactory = await hre.ethers.getContractFactory(
      "EndorsementTokenLogic"
    );

    const endorsementTokenLogic =
      (await EndorsementTokenLogicFactory.deploy()) as unknown as EndorsementTokenLogic &
        Contract;

    const endorsementBeacon = await Beacon.deploy(
      await endorsementTokenLogic.getAddress(),
      owner.address
    );

    const ContributionTokenLogicFactory = await hre.ethers.getContractFactory(
      "ContributionTokenLogic"
    );

    const contributionTokenLogic =
      (await ContributionTokenLogicFactory.deploy()) as unknown as ContributionTokenLogic &
        Contract;

    const contributionBeacon = await Beacon.deploy(
      await contributionTokenLogic.getAddress(),
      owner.address
    );

    const feeCollector = (await upgrades.deployProxy(
      FeeCollectorImplementation,
      [owner.address]
    )) as unknown as FeeCollector & Contract;

    const artisanAlly = (await upgrades.deployProxy(ArtisanAllyImplementation, [
      owner.address,
      await fellowshipBeacon.getAddress(),
      await beaconProxyFactory.getAddress(),
      await apexDeities.getAddress(),
      await slotManager.getAddress(),
      await feeCollector.getAddress(),
      await contributionBeacon.getAddress(),
      await endorsementBeacon.getAddress(),
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
      fellowshipImplementation,
      slotManager,
      feeCollector,
      artisan,
      newArtisan,
    };
  }

  async function deployAndCreateFellowship() {
    const fixture = await loadFixture(deployFixture);

    const {
      artisanAlly,
      apexDeities,
      deityOwner,
      fellowshipImplementation,
      artisan,
    } = fixture;

    await apexDeities.connect(deityOwner).mint(
      {
        sTierAmount: 2,
        aTierAmount: 0,
        bTierAmount: 0,
        cTierAmount: 0,
      },
      {
        value: ethers.parseEther("200"),
      }
    );

    const deityId = 1;
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

    const fellowship = fellowshipImplementation.attach(
      fellowshipContractAddress
    ) as unknown as FellowshipLogic & Contract;

    return {
      ...fixture,
      fellowshipContractAddress,
      fellowshipTokenId,
      fellowship,
      deityId,
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

      expect(await artisanAlly._backerbuckInitialPrice()).to.equal(
        ethers.parseEther("1")
      );

      expect(await artisanAlly._backerbuckPriceGrowth()).to.equal(150);
    });
  });

  describe("Change Backer Buck Price", function () {
    it("Should properly change backer buck price", async function () {
      const { artisanAlly, holyShit, owner, upgrader } = await loadFixture(
        deployFixture
      );

      await expect(
        artisanAlly
          .connect(upgrader)
          .changeBackerBuckPrice(ethers.parseEther("2"), 200)
      ).to.be.revertedWithCustomError(
        artisanAlly,
        "AccessControlUnauthorizedAccount"
      );

      await expect(
        artisanAlly
          .connect(owner)
          .changeBackerBuckPrice(ethers.parseEther("2"), 200)
      )
        .to.emit(artisanAlly, "BackerBuckPricesChange")
        .withArgs(ethers.parseEther("2"), 200);

      expect(await artisanAlly._backerbuckInitialPrice()).to.equal(
        ethers.parseEther("2")
      );

      expect(await artisanAlly._backerbuckPriceGrowth()).to.equal(200);
    });
  });

  describe("Change System Fee Share", function () {
    it("Should properly change backer buck price", async function () {
      const { artisanAlly, holyShit, owner, upgrader } = await loadFixture(
        deployFixture
      );

      await expect(
        artisanAlly.connect(upgrader).changeSystemFeeShare(500)
      ).to.be.revertedWithCustomError(
        artisanAlly,
        "AccessControlUnauthorizedAccount"
      );

      await expect(
        artisanAlly.connect(owner).changeSystemFeeShare(2001)
      ).to.be.revertedWithCustomError(artisanAlly, "SystemFeeShareOutOfBound");

      await expect(artisanAlly.connect(owner).changeSystemFeeShare(500))
        .to.emit(artisanAlly, "SystemFeeShareChange")
        .withArgs(500);

      expect(await artisanAlly._systemFeeShare()).to.equal(500);
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

  describe("Fellowship initialization", function () {
    it("Only the fellowship nft holder must be the owner of the fellowship", async function () {
      const {
        artisan,
        fellowship,
        fellowshipTokenId,
        artisanAlly,
        newArtisan,
        apexDeities,
      } = await loadFixture(deployAndCreateFellowship);

      expect(await fellowship.owner()).to.be.equal(
        await artisanAlly.tokenOwnerOf(fellowshipTokenId)
      );

      await artisanAlly
        .connect(artisan)
        .transfer(
          artisan.address,
          newArtisan.address,
          fellowshipTokenId,
          true,
          "0x"
        );

      expect(await fellowship._apexDeities()).to.be.equal(
        await apexDeities.getAddress()
      );

      expect(await artisanAlly.tokenOwnerOf(fellowshipTokenId)).to.be.equal(
        await newArtisan.getAddress()
      );

      expect(await fellowship.owner()).to.be.equal(
        await newArtisan.getAddress()
      );
    });

    it("Only the fellowship nft holder must be able to initialize the fellowship only once", async function () {
      const { artisan, fellowship, artisanAlly } = await loadFixture(
        deployAndCreateFellowship
      );

      const randomAddress = await artisanAlly.getAddress();
      await expect(
        fellowship.setup(
          randomAddress,
          randomAddress,
          randomAddress,
          24,
          randomAddress,
          randomAddress,
          randomAddress,
          1000,
          1000,
          100
        )
      ).to.be.revertedWithCustomError(fellowship, "AlreadySettedUp");

      await expect(
        fellowship.initialize("FLW", "FLW", "0x")
      ).to.be.revertedWithCustomError(fellowship, "OwnableCallerNotTheOwner");

      await expect(fellowship.connect(artisan).initialize("FLW", "FLW", "0x"))
        .to.emit(fellowship, "DataChanged")
        .to.emit(fellowship, "Initialized");

      await expect(
        fellowship.connect(artisan).initialize("FLW", "FLW", "0x")
      ).to.be.revertedWithCustomError(fellowship, "InvalidInitialization");
    });

    it("On initialization, the deity who founded the fellowship must be fixed", async function () {
      const { artisan, deityId, fellowship } = await loadFixture(
        deployAndCreateFellowship
      );

      expect(await fellowship.founder()).to.be.equal(deityId);
    });

    it("On initialization endorsement and contribution contract should be created", async function () {
      const { artisan, deityId, fellowship } = await loadFixture(
        deployAndCreateFellowship
      );

      expect(await fellowship._contributionTokenAddress()).to.equal(
        ethers.ZeroAddress
      );
      expect(await fellowship._endorsementTokenAddress()).to.equal(
        ethers.ZeroAddress
      );

      await fellowship.connect(artisan).initialize("FLW", "FLW", "0x");

      expect(await fellowship._contributionTokenAddress()).to.not.equal(
        ethers.ZeroAddress
      );

      expect(await fellowship._endorsementTokenAddress()).to.not.equal(
        ethers.ZeroAddress
      );
    });

    it("Should handle is early access properly", async function () {
      const { artisan, deityId, fellowship } = await loadFixture(
        deployAndCreateFellowship
      );

      expect(await fellowship.isEarlyAccess()).to.be.equal(true);

      let earlyAccessFinishTime = (await time.latest()) + 7 * 24 * 60 * 60;
      await time.increaseTo(earlyAccessFinishTime);

      expect(await fellowship.isEarlyAccess()).to.be.equal(false);
    });
  });

  describe("Backer buck miniting", function () {
    const bigIntMultiply = (target: bigint, times: number) => {
      let result: bigint = target;
      while (times > 0) {
        result = (result * BigInt(10150)) / BigInt(10000);
        times--;
      }
      return result;
    };
    it("Minting Price", async function () {
      const { artisan, fellowship, artisanAlly } = await loadFixture(
        deployAndCreateFellowship
      );

      expect(await fellowship.getMintPrice(0, 1)).to.eql([
        bigIntMultiply(ethers.parseEther("1"), 0),
        bigIntMultiply(ethers.parseEther("1"), 0),
      ]);

      expect(await fellowship.getMintPrice(1, 1)).to.eql([
        bigIntMultiply(ethers.parseEther("1"), 1),
        bigIntMultiply(ethers.parseEther("1"), 1),
      ]);

      expect(await fellowship.getMintPrice(5, 0)).to.eql([
        bigIntMultiply(ethers.parseEther("1"), 5),
        bigIntMultiply(ethers.parseEther("1"), 5),
      ]);

      expect(await fellowship.getMintPrice(10, 3)).to.eql([
        bigIntMultiply(ethers.parseEther("1"), 12),
        bigIntMultiply(ethers.parseEther("1"), 10) +
          bigIntMultiply(ethers.parseEther("1"), 11) +
          bigIntMultiply(ethers.parseEther("1"), 12),
      ]);
    });

    it("Must revert if early access and doesn't have deity", async function () {
      const { artisan, fellowship, deityOwner } = await loadFixture(
        deployAndCreateFellowship
      );

      await expect(fellowship.mint(5)).to.be.revertedWithCustomError(
        fellowship,
        "OnlyDeityOwnersHaveEarlyAccess"
      );

      await expect(
        fellowship.connect(deityOwner).mint(5)
      ).to.not.be.revertedWithCustomError(
        fellowship,
        "OnlyDeityOwnersHaveEarlyAccess"
      );

      let earlyAccessFinishTime = (await time.latest()) + 7 * 24 * 60 * 60;
      await time.increaseTo(earlyAccessFinishTime);

      await expect(fellowship.mint(5)).to.not.be.revertedWithCustomError(
        fellowship,
        "OnlyDeityOwnersHaveEarlyAccess"
      );
    });

    it("Must revert if the value is wrong", async function () {
      const { artisan, fellowship, deityOwner } = await loadFixture(
        deployAndCreateFellowship
      );

      await expect(
        fellowship.connect(deityOwner).mint(5)
      ).to.be.revertedWithCustomError(fellowship, "WrongValue");

      await expect(
        fellowship.connect(deityOwner).mint(5, {
          value: bigIntMultiply(ethers.parseEther("1"), 10),
        })
      ).to.be.revertedWithCustomError(fellowship, "WrongValue");

      await expect(
        fellowship.connect(deityOwner).mint(5, {
          value: (await fellowship.getMintPrice(0, 5))[1],
        })
      ).to.not.be.revertedWithCustomError(fellowship, "WrongValue");
    });

    it("Must mint enough backer buck", async function () {
      const { artisan, fellowship, deityOwner } = await loadFixture(
        deployAndCreateFellowship
      );

      const systemFee =
        ((await fellowship.getMintPrice(0, 5))[1] * BigInt(20)) / BigInt(100);

      const artisanShare =
        ((await fellowship.getMintPrice(0, 5))[1] * BigInt(80)) / BigInt(100);

      await expect(
        fellowship.connect(deityOwner).mint(5, {
          value: (await fellowship.getMintPrice(0, 5))[1],
        })
      )
        .to.emit(fellowship, "BackerBuckMinted")
        .withArgs(5, systemFee, artisanShare, artisan.address);

      expect(await fellowship.balanceOf(deityOwner.address)).to.equal(5);
    });

    it("Must transfer coins to the fee collector and the artisan", async function () {
      const { artisan, fellowship, feeCollector, deityOwner } =
        await loadFixture(deployAndCreateFellowship);

      const artisanBeforeBalance = await ethers.provider.getBalance(
        await artisan.getAddress()
      );

      await fellowship.connect(deityOwner).mint(5, {
        value: (await fellowship.getMintPrice(0, 5))[1],
      });

      const artisanAfterBalance = await ethers.provider.getBalance(
        await artisan.getAddress()
      );

      const feeCollectorBalanace = await ethers.provider.getBalance(
        await feeCollector.getAddress()
      );

      expect(feeCollectorBalanace).to.be.equal(
        ((await fellowship.getMintPrice(0, 5))[1] * BigInt(20)) / BigInt(100)
      );

      expect(artisanAfterBalance - artisanBeforeBalance).to.be.equal(
        ((await fellowship.getMintPrice(0, 5))[1] * BigInt(80)) / BigInt(100)
      );
    });
  });

  //describe("Fee management", function () {});

  //
  //describe("Endorsement", function () {});
  //
  //describe("Contribution", function () {});
  //
  //describe("Purification", function () {});
  //
});
