import {
  loadFixture,
  time,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

function numberToBytes32(num: number): string {
  // Convert the number to hexadecimal string
  const hex = num.toString(16);

  // Pad the hexadecimal string with leading zeros to ensure it has an even length
  const paddedHex = hex.length % 2 === 0 ? hex : "0" + hex;

  // Convert the padded hexadecimal string to bytes32
  const bytes32 = "0x" + paddedHex.padStart(64, "0");

  return bytes32;
}

describe("HolyShit", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const ApexDeities = await hre.ethers.getContractFactory("ApexDeities");
    const apexDeities = await ApexDeities.deploy(await owner.getAddress());

    const HolyShit = await hre.ethers.getContractFactory("HolyShit");
    const holyShit = await HolyShit.deploy(
      await apexDeities.getAddress(),
      owner.address
    );

    return { apexDeities, owner, otherAccount, holyShit };
  }

  describe("Deployment", function () {
    it("Should get the right proper", async function () {
      const { apexDeities, holyShit, owner, otherAccount } = await loadFixture(
        deployFixture
      );

      expect(await holyShit.apexDeities()).to.equal(
        await apexDeities.getAddress()
      );

      expect(await holyShit.owner()).to.equal(owner.address);

      expect(await holyShit.SHIT_COOLDOWN()).to.equal(24 * 60 * 60);
      expect(await holyShit.LAST_POSSIBLE_MINT_BEFORE()).to.equal(1000 * 1000);
    });
  });

  describe("Shit Per Cycle", function () {
    it("Shit per cycle should be right amount", async function () {
      const { holyShit, owner, otherAccount } = await loadFixture(
        deployFixture
      );

      expect(await holyShit.shitPerCyclePerTier(0)).to.equal(400);
      expect(await holyShit.shitPerCyclePerTier(1)).to.equal(300);
      expect(await holyShit.shitPerCyclePerTier(2)).to.equal(200);
      expect(await holyShit.shitPerCyclePerTier(3)).to.equal(100);
    });
  });

  describe("Shitting", function () {
    it("A not owner of a deity should not be able to shit", async function () {
      const { apexDeities, holyShit, owner, otherAccount } = await loadFixture(
        deployFixture
      );

      await apexDeities.connect(otherAccount).mint(
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

      await expect(
        holyShit.shit(numberToBytes32(0))
      ).to.be.revertedWithCustomError(holyShit, "NotOwner");
    });

    it("Should be able to properly shit 400 coins with an S tier deity", async function () {
      const { apexDeities, holyShit, owner, otherAccount } = await loadFixture(
        deployFixture
      );

      await apexDeities.connect(otherAccount).mint(
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

      await holyShit.connect(otherAccount).shit(numberToBytes32(0));

      expect(await holyShit.balanceOf(otherAccount)).to.equal(400);

      expect(await holyShit.lastShitTime(numberToBytes32(0))).to.not.equal(0);
      expect(await holyShit.lastShitTime(numberToBytes32(1))).to.equal(0);

      await expect(
        holyShit.connect(otherAccount).shit(numberToBytes32(0))
      ).to.be.revertedWithCustomError(holyShit, "NotShittableYet");

      let unlockTime = (await time.latest()) + 24 * 60 * 60;
      await time.increaseTo(unlockTime);

      await holyShit.connect(otherAccount).shit(numberToBytes32(0));

      expect(await holyShit.balanceOf(otherAccount)).to.equal(800);

      let totalMinted = 800;
      for (let i = 0; i < 2498; i++) {
        unlockTime = (await time.latest()) + 24 * 60 * 60;
        await time.increaseTo(unlockTime);

        await holyShit.connect(otherAccount).shit(numberToBytes32(0));

        totalMinted += 400;
        expect(await holyShit.balanceOf(otherAccount)).to.equal(totalMinted);
      }
      expect(await holyShit.totalSupply()).to.equal(1000000);

      unlockTime = (await time.latest()) + 24 * 60 * 60;
      await time.increaseTo(unlockTime);

      await expect(
        holyShit.connect(otherAccount).shit(numberToBytes32(0))
      ).to.be.revertedWithCustomError(holyShit, "NoMoreShitToGive");
    });

    it("Should be able to batch shit", async function () {
      const { apexDeities, holyShit, owner, otherAccount } = await loadFixture(
        deployFixture
      );

      await apexDeities.connect(otherAccount).mint(
        {
          sTierAmount: 1,
          aTierAmount: 1,
          bTierAmount: 1,
          cTierAmount: 1,
        },
        {
          value: ethers.parseEther("250"),
        }
      );

      const tokenIds = [
        numberToBytes32(0),
        numberToBytes32(25),
        numberToBytes32(50),
        numberToBytes32(75),
      ];

      await holyShit.connect(otherAccount).batchShit(tokenIds);

      expect(await holyShit.balanceOf(otherAccount)).to.equal(1000);
    });
  });
});
