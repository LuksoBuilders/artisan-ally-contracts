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

const bigIntMultiply = (target: bigint, times: number) => {
  let result: bigint = target;
  while (times > 0) {
    result = (result * BigInt(10150)) / BigInt(10000);
    times--;
  }
  return result;
};

function numberToBytes32(num: number): string {
  // Convert the number to hexadecimal string
  const hex = num.toString(16);

  // Pad the hexadecimal string with leading zeros to ensure it has an even length
  const paddedHex = hex.length % 2 === 0 ? hex : "0" + hex;

  // Convert the padded hexadecimal string to bytes32
  const bytes32 = "0x" + paddedHex.padStart(64, "0");

  return bytes32;
}

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
      builderTeam,
      marketingTeam,
      newTeam,
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
      [
        owner.address,
        await apexDeities.getAddress(),
        await levelManager.getAddress(),
        builderTeam.address,
        marketingTeam.address,
      ]
    )) as unknown as FeeCollector & Contract;

    await levelManager.grantRole(
      await levelManager.EXPERIENCE_MANIPULATOR(),
      await feeCollector.getAddress()
    );

    const artisanAlly = (await upgrades.deployProxy(ArtisanAllyImplementation, [
      owner.address,
      await fellowshipBeacon.getAddress(),
      await beaconProxyFactory.getAddress(),
      await apexDeities.getAddress(),
      await slotManager.getAddress(),
      await feeCollector.getAddress(),
      await holyShit.getAddress(),
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
      builderTeam,
      marketingTeam,
      newTeam,
      holyShit,
      artisanAlly,
      levelManager,
      initialLevelExperience,
      fellowshipImplementation,
      slotManager,
      feeCollector,
      artisan,
      newArtisan,
      endorsementTokenLogic,
      contributionTokenLogic,
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
      endorsementTokenLogic,
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

  async function deployAndCreateAndInitializeFellowship() {
    const fixture = await loadFixture(deployAndCreateFellowship);

    const {
      artisan,
      fellowship,
      endorsementTokenLogic,
      contributionTokenLogic,
    } = fixture;

    await fellowship.connect(artisan).initialize("FLW", "FLW", "0x");

    const endorsementToken = endorsementTokenLogic.attach(
      await fellowship._endorsementTokenAddress()
    ) as unknown as EndorsementTokenLogic & Contract;

    const contributionToken = contributionTokenLogic.attach(
      await fellowship._contributionTokenAddress()
    ) as unknown as ContributionTokenLogic & Contract;

    return {
      ...fixture,
      endorsementToken,
      contributionToken,
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

  describe("Fee management", function () {
    it("Initialize", async function () {
      const {
        owner,
        feeCollector,
        apexDeities,
        levelManager,
        builderTeam,
        marketingTeam,
      } = await loadFixture(deployAndCreateFellowship);

      expect(await feeCollector._apexDeities()).to.be.equal(
        await apexDeities.getAddress()
      );

      expect(
        await feeCollector.hasRole(
          await feeCollector.DEFAULT_ADMIN_ROLE(),
          owner
        )
      ).to.be.equal(true);

      expect(await feeCollector._levelManager()).to.be.equal(
        await levelManager.getAddress()
      );

      expect(await feeCollector._builderTeam()).to.be.equal(
        await builderTeam.getAddress()
      );

      expect(await feeCollector._marketingTeam()).to.be.equal(
        await marketingTeam.getAddress()
      );
    });

    it("Builder team change", async function () {
      const {
        owner,
        feeCollector,
        apexDeities,
        levelManager,
        artisan,
        builderTeam,
        marketingTeam,
        newTeam,
      } = await loadFixture(deployAndCreateFellowship);

      await expect(
        feeCollector.connect(artisan).changeBuilderTeam(newTeam.address)
      ).to.be.revertedWithCustomError(feeCollector, "NotAuthorized");

      await expect(
        feeCollector.connect(builderTeam).changeBuilderTeam(newTeam.address)
      ).to.not.be.revertedWithCustomError(feeCollector, "NotAuthorized");

      await expect(
        feeCollector.connect(owner).changeBuilderTeam(builderTeam.address)
      ).to.not.be.revertedWithCustomError(feeCollector, "NotAuthorized");

      await expect(
        feeCollector.connect(builderTeam).changeBuilderTeam(newTeam.address)
      )
        .to.emit(feeCollector, "BuilderTeamChanged")
        .withArgs(newTeam.address);

      expect(await feeCollector._builderTeam()).to.be.equal(
        await newTeam.getAddress()
      );
    });

    it("Marketing team change", async function () {
      const {
        owner,
        feeCollector,
        apexDeities,
        levelManager,
        artisan,
        builderTeam,
        marketingTeam,
        newTeam,
      } = await loadFixture(deployAndCreateFellowship);

      await expect(
        feeCollector.connect(artisan).changeMarketingTeam(newTeam.address)
      ).to.be.revertedWithCustomError(feeCollector, "NotAuthorized");

      await expect(
        feeCollector.connect(marketingTeam).changeMarketingTeam(newTeam.address)
      ).to.not.be.revertedWithCustomError(feeCollector, "NotAuthorized");

      await expect(
        feeCollector.connect(owner).changeMarketingTeam(marketingTeam.address)
      ).to.not.be.revertedWithCustomError(feeCollector, "NotAuthorized");

      await expect(
        feeCollector.connect(marketingTeam).changeMarketingTeam(newTeam.address)
      )
        .to.emit(feeCollector, "MarketingTeamChanged")
        .withArgs(newTeam.address);

      expect(await feeCollector._marketingTeam()).to.be.equal(
        await newTeam.getAddress()
      );
    });

    it("getDirectFeePercent", async function () {
      const { artisan, fellowship, feeCollector, deityOwner } =
        await loadFixture(deployAndCreateFellowship);

      await expect(
        feeCollector.getDirectFeePercent(100)
      ).to.be.revertedWithCustomError(feeCollector, "NonExistentDeity");

      const sTiers = Array(25)
        .fill(0)
        .map((v, i) => i);
      const aTiers = Array(25)
        .fill(0)
        .map((v, i) => i + 25);
      const bTiers = Array(25)
        .fill(0)
        .map((v, i) => i + 50);
      const cTiers = Array(25)
        .fill(0)
        .map((v, i) => i + 75);

      for (const tokenId of sTiers) {
        expect(await feeCollector.getDirectFeePercent(tokenId)).to.be.equal(
          1000
        );
      }

      for (const tokenId of aTiers) {
        expect(await feeCollector.getDirectFeePercent(tokenId)).to.be.equal(
          750
        );
      }

      for (const tokenId of bTiers) {
        expect(await feeCollector.getDirectFeePercent(tokenId)).to.be.equal(
          500
        );
      }

      for (const tokenId of cTiers) {
        expect(await feeCollector.getDirectFeePercent(tokenId)).to.be.equal(
          250
        );
      }
    });

    it("getSystemFeePercent", async function () {
      const { feeCollector } = await loadFixture(deployAndCreateFellowship);

      const sTiers = Array(25)
        .fill(0)
        .map((v, i) => i);
      const aTiers = Array(25)
        .fill(0)
        .map((v, i) => i + 25);
      const bTiers = Array(25)
        .fill(0)
        .map((v, i) => i + 50);
      const cTiers = Array(25)
        .fill(0)
        .map((v, i) => i + 75);

      await expect(
        feeCollector.getSystemFeePercent(100)
      ).to.be.revertedWithCustomError(feeCollector, "NonExistentDeity");

      for (const tokenId of sTiers) {
        expect(await feeCollector.getSystemFeePercent(tokenId)).to.be.equal(
          100
        );
      }

      for (const tokenId of aTiers) {
        expect(await feeCollector.getSystemFeePercent(tokenId)).to.be.equal(75);
      }

      for (const tokenId of bTiers) {
        expect(await feeCollector.getSystemFeePercent(tokenId)).to.be.equal(50);
      }

      for (const tokenId of cTiers) {
        expect(await feeCollector.getSystemFeePercent(tokenId)).to.be.equal(25);
      }
    });

    it("Insert Mint Fee", async function () {
      const { artisan, fellowship, feeCollector, deityOwner } =
        await loadFixture(deployAndCreateFellowship);

      const value = (await fellowship.getMintPrice(0, 5))[1];
      const feeCollectorShare = (value * BigInt(20)) / BigInt(100);

      const sTierDeityShare = (feeCollectorShare * BigInt(10)) / BigInt(100);

      await expect(
        fellowship.connect(deityOwner).mint(5, {
          value: value,
        })
      )
        .to.emit(feeCollector, "DirectFeeInserted")
        .withArgs(1, sTierDeityShare);

      expect(await feeCollector._directFees(1)).to.be.equal(sTierDeityShare);
    });

    it("Insert Fee", async function () {
      const { artisan, fellowship, feeCollector, deityOwner } =
        await loadFixture(deployAndCreateFellowship);

      const value = (await fellowship.getMintPrice(0, 5))[1];
      const feeCollectorShare = (value * BigInt(20)) / BigInt(100);

      const sTierDeityShare = (feeCollectorShare * BigInt(10)) / BigInt(100);
      const systemFeeCollectedAtom =
        (feeCollectorShare - sTierDeityShare) / BigInt(10000);

      await expect(
        fellowship.connect(deityOwner).mint(5, {
          value: value,
        })
      )
        .to.emit(feeCollector, "FeeInserted")
        .withArgs(systemFeeCollectedAtom);

      expect(await feeCollector._directFees(1)).to.be.equal(sTierDeityShare);
    });

    it("Deity Harvestable Balance", async function () {
      const { artisan, fellowship, feeCollector, deityOwner } =
        await loadFixture(deployAndCreateFellowship);

      const value = (await fellowship.getMintPrice(0, 5))[1];
      const feeCollectorShare = (value * BigInt(20)) / BigInt(100);

      const sTierDeityShare = (feeCollectorShare * BigInt(10)) / BigInt(100);
      const systemFeeCollectedAtom =
        (feeCollectorShare - sTierDeityShare) / BigInt(10000);

      await expect(
        fellowship.connect(deityOwner).mint(5, {
          value: value,
        })
      )
        .to.emit(feeCollector, "FeeInserted")
        .withArgs(systemFeeCollectedAtom);

      expect(await feeCollector.deityHarvestableBalance(1)).to.be.equal(
        sTierDeityShare + systemFeeCollectedAtom * BigInt(100)
      );
      expect(await feeCollector.deityHarvestableBalance(4)).to.be.equal(
        systemFeeCollectedAtom * BigInt(100)
      );
      expect(await feeCollector.deityHarvestableBalance(25)).to.be.equal(
        systemFeeCollectedAtom * BigInt(75)
      );
      expect(await feeCollector.deityHarvestableBalance(50)).to.be.equal(
        systemFeeCollectedAtom * BigInt(50)
      );
      expect(await feeCollector.deityHarvestableBalance(75)).to.be.equal(
        systemFeeCollectedAtom * BigInt(25)
      );
    });

    it("Should not be able to harvest if doesn't own the deity", async function () {
      const { artisan, fellowship, feeCollector, deityOwner } =
        await loadFixture(deployAndCreateFellowship);

      const value = (await fellowship.getMintPrice(0, 5))[1];
      const feeCollectorShare = (value * BigInt(20)) / BigInt(100);

      const sTierDeityShare = (feeCollectorShare * BigInt(10)) / BigInt(100);
      const systemFeeCollectedAtom =
        (feeCollectorShare - sTierDeityShare) / BigInt(10000);

      await fellowship.connect(deityOwner).mint(5, {
        value: value,
      });

      await expect(feeCollector.harvestDeity(1)).to.be.revertedWithCustomError(
        feeCollector,
        "NotAuthorized"
      );
    });

    it("Should not be able to harvest if does own the deity", async function () {
      const { levelManager, fellowship, feeCollector, deityOwner } =
        await loadFixture(deployAndCreateFellowship);

      const value = (await fellowship.getMintPrice(0, 5))[1];
      const feeCollectorShare = (value * BigInt(20)) / BigInt(100);

      const sTierDeityShare = (feeCollectorShare * BigInt(10)) / BigInt(100);
      const systemFeeCollectedAtom =
        (feeCollectorShare - sTierDeityShare) / BigInt(10000);

      await fellowship.connect(deityOwner).mint(5, {
        value: value,
      });

      const harvestableBalance = await feeCollector.deityHarvestableBalance(1);

      const beforeHarvestBalance = await ethers.provider.getBalance(
        await deityOwner.getAddress()
      );
      const beforeHarvestFeeCollectorBalance = await ethers.provider.getBalance(
        await feeCollector.getAddress()
      );

      expect(await feeCollector.deityHarvestableBalance(1)).to.not.be.equal(0);

      await expect(feeCollector.connect(deityOwner).harvestDeity(1))
        .to.emit(feeCollector, "DeityHarvested")
        .withArgs(1, harvestableBalance)
        .to.emit(levelManager, "XPIncreased")
        .withArgs(1, harvestableBalance);

      const afterHarvestBalance = await ethers.provider.getBalance(
        await deityOwner.getAddress()
      );
      const afterHarvestFeeCollectorBalance = await ethers.provider.getBalance(
        await feeCollector.getAddress()
      );

      expect(await feeCollector.deityHarvestableBalance(1)).to.be.equal(0);
      expect(afterHarvestBalance).to.be.gt(beforeHarvestBalance);
      expect(
        beforeHarvestFeeCollectorBalance - afterHarvestFeeCollectorBalance
      ).to.be.equal(harvestableBalance);
    });

    it("Should be able to withdraw builders", async function () {
      const { builderTeam, fellowship, feeCollector, deityOwner } =
        await loadFixture(deployAndCreateFellowship);

      const value = (await fellowship.getMintPrice(0, 5))[1];
      const feeCollectorShare = (value * BigInt(20)) / BigInt(100);

      const sTierDeityShare = (feeCollectorShare * BigInt(10)) / BigInt(100);
      const systemFeeCollectedAtom =
        (feeCollectorShare - sTierDeityShare) / BigInt(10000);

      await fellowship.connect(deityOwner).mint(5, {
        value: value,
      });

      const buildersShare = systemFeeCollectedAtom * BigInt(1875);

      expect(await feeCollector.buildersWithdrawableBalance()).to.be.equal(
        buildersShare
      );

      await expect(
        feeCollector.connect(deityOwner).withdrawBuilders()
      ).to.be.revertedWithCustomError(feeCollector, "NotAuthorized");

      const beforeWithdrawBalance = await ethers.provider.getBalance(
        await builderTeam.getAddress()
      );

      await expect(feeCollector.connect(builderTeam).withdrawBuilders())
        .to.emit(feeCollector, "BuilderWithdrawal")
        .withArgs(builderTeam.address, buildersShare);

      const afterWithdrawBalance = await ethers.provider.getBalance(
        await builderTeam.getAddress()
      );

      expect(await feeCollector.buildersWithdrawableBalance()).to.be.equal(0);

      expect(afterWithdrawBalance).to.be.gt(beforeWithdrawBalance);
    });

    it("Should be able to withdraw marketing", async function () {
      const {
        builderTeam,
        fellowship,
        feeCollector,
        deityOwner,
        marketingTeam,
      } = await loadFixture(deployAndCreateFellowship);

      const value = (await fellowship.getMintPrice(0, 5))[1];
      const feeCollectorShare = (value * BigInt(20)) / BigInt(100);

      const sTierDeityShare = (feeCollectorShare * BigInt(10)) / BigInt(100);
      const systemFeeCollectedAtom =
        (feeCollectorShare - sTierDeityShare) / BigInt(10000);

      await fellowship.connect(deityOwner).mint(5, {
        value: value,
      });

      const marketingShare = systemFeeCollectedAtom * BigInt(1875);

      expect(await feeCollector.marketingWithdrawableBalance()).to.be.equal(
        marketingShare
      );

      await expect(
        feeCollector.connect(deityOwner).withdrawMarketing()
      ).to.be.revertedWithCustomError(feeCollector, "NotAuthorized");

      const beforeWithdrawBalance = await ethers.provider.getBalance(
        await marketingTeam.getAddress()
      );

      await expect(feeCollector.connect(marketingTeam).withdrawMarketing())
        .to.emit(feeCollector, "MarketingWithdrawal")
        .withArgs(marketingTeam.address, marketingShare);

      const afterWithdrawBalance = await ethers.provider.getBalance(
        await marketingTeam.getAddress()
      );

      expect(await feeCollector.marketingWithdrawableBalance()).to.be.equal(0);

      expect(afterWithdrawBalance).to.be.gt(beforeWithdrawBalance);
    });
  });

  //
  describe("Endorsement", function () {
    it("Should be initialized properly", async function () {
      const { fellowship, fellowshipTokenId, artisanAlly, endorsementToken } =
        await loadFixture(deployAndCreateAndInitializeFellowship);

      expect(await endorsementToken._artisanAlly()).to.be.equal(
        await artisanAlly.getAddress()
      );

      expect(await endorsementToken._fellowship()).to.be.equal(
        await fellowship.getAddress()
      );

      expect(await endorsementToken.owner()).to.be.equal(
        await artisanAlly.tokenOwnerOf(fellowshipTokenId)
      );
    });

    it("Should not able to endorse if doesn't have backerbuck", async function () {
      const { builderTeam, deityOwner, endorsementToken } = await loadFixture(
        deployAndCreateAndInitializeFellowship
      );

      await expect(
        endorsementToken.connect(deityOwner).endorse(5, builderTeam.address)
      ).to.be.revertedWithCustomError(
        endorsementToken,
        "NotOwnEnoughBackerBuck"
      );
    });

    it("Should be able to endorse if does have backerbuck", async function () {
      const { builderTeam, fellowship, deityOwner, endorsementToken } =
        await loadFixture(deployAndCreateAndInitializeFellowship);

      await fellowship.connect(deityOwner).mint(5, {
        value: (await fellowship.getMintPrice(0, 5))[1],
      });

      const endorser = builderTeam;

      await fellowship
        .connect(deityOwner)
        .authorizeOperator(await endorsementToken.getAddress(), 5, "0x");

      expect(await fellowship.balanceOf(deityOwner)).to.equal(5);
      expect(await fellowship.balanceOf(endorsementToken)).to.equal(0);

      await expect(
        endorsementToken.connect(deityOwner).endorse(5, endorser.address)
      )
        .to.emit(endorsementToken, "Endorsed")
        .withArgs(5, endorser.address);

      expect(await fellowship.balanceOf(deityOwner)).to.equal(0);
      expect(await fellowship.balanceOf(endorsementToken)).to.equal(5);

      expect(
        await endorsementToken._endorsementHistory(
          deityOwner.address,
          endorser.address
        )
      ).to.equal(5);

      expect(await endorsementToken.balanceOf(endorser.address)).to.equal(5);

      await expect(
        endorsementToken
          .connect(endorser)
          .transfer(endorser.address, deityOwner.address, 1, true, "0x")
      ).to.be.revertedWithCustomError(endorsementToken, "NotTransferable");
    });

    it("Should not be able to revoke endorsement if haven't endorsed", async function () {
      const { builderTeam, fellowship, deityOwner, endorsementToken } =
        await loadFixture(deployAndCreateAndInitializeFellowship);

      const endorser = builderTeam;

      await fellowship.connect(deityOwner).mint(5, {
        value: (await fellowship.getMintPrice(0, 5))[1],
      });

      await expect(
        endorsementToken
          .connect(deityOwner)
          .revokeEndorsement(5, builderTeam.address)
      ).to.be.revertedWithCustomError(endorsementToken, "NotEnoughEndorsed");
    });

    it("Should be able to to revoke endorsement if have endorsed", async function () {
      const { builderTeam, fellowship, deityOwner, endorsementToken } =
        await loadFixture(deployAndCreateAndInitializeFellowship);

      await fellowship.connect(deityOwner).mint(5, {
        value: (await fellowship.getMintPrice(0, 5))[1],
      });

      const endorser = builderTeam;

      await fellowship
        .connect(deityOwner)
        .authorizeOperator(await endorsementToken.getAddress(), 5, "0x");

      await endorsementToken.connect(deityOwner).endorse(5, endorser.address);

      expect(
        await endorsementToken._endorsementHistory(
          deityOwner.address,
          endorser.address
        )
      ).to.equal(5);

      expect(await fellowship.balanceOf(deityOwner)).to.equal(0);

      expect(await endorsementToken.balanceOf(endorser.address)).to.equal(5);

      await expect(
        endorsementToken
          .connect(deityOwner)
          .revokeEndorsement(5, endorser.address)
      )
        .to.emit(endorsementToken, "RevokedEndorsement")
        .withArgs(5, endorser.address);

      expect(
        await endorsementToken._endorsementHistory(
          deityOwner.address,
          endorser.address
        )
      ).to.equal(0);

      expect(await fellowship.balanceOf(deityOwner)).to.equal(5);

      expect(await endorsementToken.balanceOf(endorser.address)).to.equal(0);
    });
  });
  //
  describe("Contribution", function () {
    it("Should be initialized properly", async function () {
      const {
        fellowship,
        fellowshipTokenId,
        artisanAlly,
        contributionToken,
        holyShit,
      } = await loadFixture(deployAndCreateAndInitializeFellowship);

      expect(await contributionToken._artisanAlly()).to.be.equal(
        await artisanAlly.getAddress()
      );

      expect(await contributionToken._fellowship()).to.be.equal(
        await fellowship.getAddress()
      );

      expect(await contributionToken._holyShit()).to.be.equal(
        await holyShit.getAddress()
      );

      expect(await contributionToken.owner()).to.be.equal(
        await artisanAlly.tokenOwnerOf(fellowshipTokenId)
      );
    });

    it("Should not able to contribute if doesn't have backerbuck", async function () {
      const { builderTeam, deityOwner, contributionToken } = await loadFixture(
        deployAndCreateAndInitializeFellowship
      );

      await expect(
        contributionToken.connect(deityOwner).contribute(5, builderTeam.address)
      ).to.be.revertedWithCustomError(
        contributionToken,
        "NotOwnEnoughBackerBuck"
      );
    });

    it("Should be able to contribute if does have backerbuck", async function () {
      const { builderTeam, fellowship, deityOwner, contributionToken } =
        await loadFixture(deployAndCreateAndInitializeFellowship);

      await fellowship.connect(deityOwner).mint(5, {
        value: (await fellowship.getMintPrice(0, 5))[1],
      });

      const contribuer = builderTeam;

      await fellowship
        .connect(deityOwner)
        .authorizeOperator(await contributionToken.getAddress(), 5, "0x");

      expect(await fellowship.balanceOf(deityOwner)).to.equal(5);
      expect(await fellowship.balanceOf(contributionToken)).to.equal(0);

      await expect(
        contributionToken.connect(deityOwner).contribute(5, contribuer.address)
      )
        .to.emit(contributionToken, "Contributed")
        .withArgs(5, contribuer.address);

      expect(await fellowship.balanceOf(deityOwner)).to.equal(0);
      expect(await fellowship.balanceOf(contributionToken)).to.equal(5);

      expect(
        await contributionToken._contributionHistory(contribuer.address)
      ).to.equal(5);

      expect(await contributionToken.balanceOf(contribuer.address)).to.equal(5);

      await expect(
        contributionToken
          .connect(contribuer)
          .transfer(contribuer.address, deityOwner.address, 1, true, "0x")
      ).to.be.revertedWithCustomError(contributionToken, "NotTransferable");
    });

    it("Should not be able to purify if haven't contributed or have enough holyshit", async function () {
      const { builderTeam, fellowship, deityOwner, contributionToken } =
        await loadFixture(deployAndCreateAndInitializeFellowship);

      const endorser = builderTeam;

      await fellowship.connect(deityOwner).mint(5, {
        value: (await fellowship.getMintPrice(0, 5))[1],
      });

      await expect(
        contributionToken.connect(deityOwner).purify(5)
      ).to.be.revertedWithCustomError(
        contributionToken,
        "NotEnoughContributed"
      );
    });

    it("Should be able to to purify contribution if have enough contribution and holy shit", async function () {
      const {
        builderTeam,
        fellowship,
        deityOwner,
        contributionToken,
        holyShit,
      } = await loadFixture(deployAndCreateAndInitializeFellowship);

      await fellowship.connect(deityOwner).mint(5, {
        value: (await fellowship.getMintPrice(0, 5))[1],
      });

      const contributor = deityOwner;

      const divineDungDepot = "0x4242424242424242424242424242424242424242";

      await holyShit.connect(deityOwner).shit(numberToBytes32(0));
      await holyShit.connect(deityOwner).shit(numberToBytes32(1));

      expect(await holyShit.balanceOf(deityOwner.address)).to.equal(
        ethers.parseEther("800")
      );

      await holyShit
        .connect(deityOwner)
        .authorizeOperator(
          await contributionToken.getAddress(),
          ethers.parseEther("500"),
          "0x"
        );

      await fellowship
        .connect(deityOwner)
        .authorizeOperator(await contributionToken.getAddress(), 5, "0x");

      // contributing
      await contributionToken
        .connect(deityOwner)
        .contribute(5, contributor.address);

      expect(await contributionToken.balanceOf(contributor.address)).to.equal(
        5
      );

      expect(await fellowship.balanceOf(deityOwner.address)).to.equal(0);

      expect(
        await contributionToken._contributionHistory(contributor.address)
      ).to.equal(5);

      expect(await fellowship.balanceOf(deityOwner)).to.equal(0);

      expect(await contributionToken.balanceOf(contributor.address)).to.equal(
        5
      );

      // purifing
      await expect(contributionToken.connect(deityOwner).purify(5))
        .to.emit(contributionToken, "Purified")
        .withArgs(5);

      expect(await holyShit.balanceOf(deityOwner.address)).to.equal(
        ethers.parseEther("300")
      );

      expect(await holyShit.balanceOf(divineDungDepot)).to.equal(
        ethers.parseEther("500")
      );

      expect(await contributionToken.balanceOf(contributor.address)).to.equal(
        5
      );

      expect(await fellowship.balanceOf(contributor.address)).to.equal(5);

      expect(
        await contributionToken._contributionHistory(deityOwner.address)
      ).to.equal(0);
    });
  });
});
