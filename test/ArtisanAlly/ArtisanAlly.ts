import {
  loadFixture,
  time,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers, upgrades } from "hardhat";

describe("ApexDeities", function () {
  async function deployFixture() {
    const [owner, upgrader] = await hre.ethers.getSigners();

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

    return {
      apexDeities,
      owner,
      upgrader,
      holyShit,
      artisanAlly,
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
      const UpgraderRole = await artisanAlly.UPGRADER_ROLE();

      expect(
        await artisanAlly.hasRole(UpgraderRole, upgrader.address)
      ).to.equal(true);

      expect(
        await artisanAlly.hasRole(DefaultAdminRole, owner.address)
      ).to.equal(true);
    });
  });
});
