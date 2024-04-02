import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
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

describe("ApexDeities", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const HelperContract = await hre.ethers.getContractFactory(
      "HelperContract"
    );
    const helperContract = await HelperContract.deploy();

    const ApexDeities = await hre.ethers.getContractFactory("ApexDeities");
    const apexDeities = await ApexDeities.deploy(await owner.getAddress());

    return { helperContract, apexDeities, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should get deployed with the right props", async function () {
      const { apexDeities, owner, otherAccount } = await loadFixture(
        deployFixture
      );

      expect(await apexDeities.owner()).to.equal(owner.address);
      expect(await apexDeities.owner()).to.not.equal(otherAccount.address);

      expect(await apexDeities.MAX_SUPPLY()).to.equal(100);
      expect(await apexDeities.S_TIER_SUPPLY()).to.equal(25);
      expect(await apexDeities.A_TIER_SUPPLY()).to.equal(25);
      expect(await apexDeities.B_TIER_SUPPLY()).to.equal(25);
      expect(await apexDeities.C_TIER_SUPPLY()).to.equal(25);

      expect(await apexDeities.S_TIER_START()).to.equal(0);
      expect(await apexDeities.A_TIER_START()).to.equal(25);
      expect(await apexDeities.B_TIER_START()).to.equal(50);
      expect(await apexDeities.C_TIER_START()).to.equal(75);

      expect(await apexDeities.S_TIER_PRICE()).to.equal(
        ethers.parseEther("100")
      );
      expect(await apexDeities.A_TIER_PRICE()).to.equal(
        ethers.parseEther("75")
      );
      expect(await apexDeities.B_TIER_PRICE()).to.equal(
        ethers.parseEther("50")
      );
      expect(await apexDeities.C_TIER_PRICE()).to.equal(
        ethers.parseEther("25")
      );
    });
  });

  describe("Tier Identifier", function () {
    it("Expect to get proper token tier", async function () {
      const { apexDeities } = await loadFixture(deployFixture);

      for (let i = 0; i < 25; i++) {
        expect(await apexDeities.tokenTier(i)).to.equal(0);
      }

      for (let i = 25; i < 50; i++) {
        expect(await apexDeities.tokenTier(i)).to.equal(1);
      }

      for (let i = 50; i < 75; i++) {
        expect(await apexDeities.tokenTier(i)).to.equal(2);
      }

      for (let i = 75; i < 100; i++) {
        expect(await apexDeities.tokenTier(i)).to.equal(3);
      }

      await expect(apexDeities.tokenTier(100)).to.be.revertedWithCustomError(
        apexDeities,
        "OutofBoundTokenId"
      );
    });
  });

  describe("Order Price", function () {
    it("Expect to get proper price for an order", async function () {
      const { apexDeities } = await loadFixture(deployFixture);

      expect(
        await apexDeities.getOrderPrice({
          sTierAmount: 0,
          aTierAmount: 0,
          bTierAmount: 0,
          cTierAmount: 0,
        })
      ).to.equal(ethers.parseEther("0"));

      expect(
        await apexDeities.getOrderPrice({
          sTierAmount: 1,
          aTierAmount: 0,
          bTierAmount: 0,
          cTierAmount: 0,
        })
      ).to.equal(ethers.parseEther("100"));

      expect(
        await apexDeities.getOrderPrice({
          sTierAmount: 2,
          aTierAmount: 0,
          bTierAmount: 0,
          cTierAmount: 0,
        })
      ).to.equal(ethers.parseEther("200"));

      expect(
        await apexDeities.getOrderPrice({
          sTierAmount: 0,
          aTierAmount: 1,
          bTierAmount: 0,
          cTierAmount: 0,
        })
      ).to.equal(ethers.parseEther("75"));

      expect(
        await apexDeities.getOrderPrice({
          sTierAmount: 0,
          aTierAmount: 2,
          bTierAmount: 0,
          cTierAmount: 0,
        })
      ).to.equal(ethers.parseEther("150"));

      expect(
        await apexDeities.getOrderPrice({
          sTierAmount: 0,
          aTierAmount: 0,
          bTierAmount: 1,
          cTierAmount: 0,
        })
      ).to.equal(ethers.parseEther("50"));

      expect(
        await apexDeities.getOrderPrice({
          sTierAmount: 0,
          aTierAmount: 0,
          bTierAmount: 2,
          cTierAmount: 0,
        })
      ).to.equal(ethers.parseEther("100"));

      expect(
        await apexDeities.getOrderPrice({
          sTierAmount: 0,
          aTierAmount: 0,
          bTierAmount: 0,
          cTierAmount: 1,
        })
      ).to.equal(ethers.parseEther("25"));

      expect(
        await apexDeities.getOrderPrice({
          sTierAmount: 0,
          aTierAmount: 0,
          bTierAmount: 0,
          cTierAmount: 2,
        })
      ).to.equal(ethers.parseEther("50"));

      expect(
        await apexDeities.getOrderPrice({
          sTierAmount: 1,
          aTierAmount: 2,
          bTierAmount: 3,
          cTierAmount: 1,
        })
      ).to.equal(ethers.parseEther("425"));
    });
  });

  describe("Minting", function () {
    describe("Minting S tiers", function () {
      it("Should not be able to mint S tier without enough money", async function () {
        const { apexDeities } = await loadFixture(deployFixture);

        await expect(
          apexDeities.mint({
            sTierAmount: 1,
            aTierAmount: 0,
            bTierAmount: 0,
            cTierAmount: 0,
          })
        ).to.be.revertedWithCustomError(apexDeities, "WrongValue");

        await expect(
          apexDeities.mint(
            {
              sTierAmount: 1,
              aTierAmount: 0,
              bTierAmount: 0,
              cTierAmount: 0,
            },
            {
              value: ethers.parseEther("200"),
            }
          )
        ).to.be.revertedWithCustomError(apexDeities, "WrongValue");
      });

      it("Should be able to mint S tier with enough money", async function () {
        const { helperContract, apexDeities, otherAccount } = await loadFixture(
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
        const targetMintedId = await numberToBytes32(0);

        expect(await apexDeities.tokenOwnerOf(targetMintedId)).to.equal(
          otherAccount
        );
        expect(await apexDeities.sTierMinted()).to.equal(1);
      });

      it("Should be able to mint multiple S tier with enough money", async function () {
        const { helperContract, apexDeities, otherAccount } = await loadFixture(
          deployFixture
        );
        await apexDeities.connect(otherAccount).mint(
          {
            sTierAmount: 25,
            aTierAmount: 0,
            bTierAmount: 0,
            cTierAmount: 0,
          },
          {
            value: ethers.parseEther("2500"),
          }
        );

        const targetMintedIds = await Promise.all(
          Array(10)
            .fill(0)
            .map((_, i) => numberToBytes32(i))
        );

        for (const id of targetMintedIds) {
          expect(await apexDeities.tokenOwnerOf(id)).to.equal(otherAccount);
        }
        expect(await apexDeities.sTierMinted()).to.equal(25);

        expect(
          await ethers.provider.getBalance(await apexDeities.getAddress())
        ).to.equal(ethers.parseEther("2500"));
      });

      it("Should not be able to mint S tier with enough money but without enough supply", async function () {
        const { helperContract, apexDeities, otherAccount } = await loadFixture(
          deployFixture
        );

        await apexDeities.connect(otherAccount).mint(
          {
            sTierAmount: 25,
            aTierAmount: 0,
            bTierAmount: 0,
            cTierAmount: 0,
          },
          {
            value: ethers.parseEther("2500"),
          }
        );

        await expect(
          apexDeities.mint(
            {
              sTierAmount: 1,
              aTierAmount: 0,
              bTierAmount: 0,
              cTierAmount: 0,
            },
            {
              value: ethers.parseEther("100"),
            }
          )
        ).to.be.revertedWithCustomError(apexDeities, "MaxedOutSupply");
      });
    });

    describe("Minting A tiers", function () {
      it("Should not be able to mint A tier without enough money", async function () {
        const { apexDeities } = await loadFixture(deployFixture);

        await expect(
          apexDeities.mint({
            sTierAmount: 0,
            aTierAmount: 1,
            bTierAmount: 0,
            cTierAmount: 0,
          })
        ).to.be.revertedWithCustomError(apexDeities, "WrongValue");

        await expect(
          apexDeities.mint(
            {
              sTierAmount: 0,
              aTierAmount: 1,
              bTierAmount: 0,
              cTierAmount: 0,
            },
            {
              value: ethers.parseEther("150"),
            }
          )
        ).to.be.revertedWithCustomError(apexDeities, "WrongValue");
      });

      it("Should be able to mint A tier with enough money", async function () {
        const { helperContract, apexDeities, otherAccount } = await loadFixture(
          deployFixture
        );
        await apexDeities.connect(otherAccount).mint(
          {
            sTierAmount: 0,
            aTierAmount: 1,
            bTierAmount: 0,
            cTierAmount: 0,
          },
          {
            value: ethers.parseEther("75"),
          }
        );
        const targetMintedId = await numberToBytes32(25);

        expect(await apexDeities.tokenOwnerOf(targetMintedId)).to.equal(
          otherAccount
        );
        expect(await apexDeities.aTierMinted()).to.equal(1);
      });

      it("Should be able to mint multiple A tier with enough money", async function () {
        const { helperContract, apexDeities, otherAccount } = await loadFixture(
          deployFixture
        );
        await apexDeities.connect(otherAccount).mint(
          {
            sTierAmount: 0,
            aTierAmount: 25,
            bTierAmount: 0,
            cTierAmount: 0,
          },
          {
            value: ethers.parseEther("1875"),
          }
        );

        const targetMintedIds = await Promise.all(
          Array(10)
            .fill(0)
            .map((_, i) => numberToBytes32(i + 25))
        );

        for (const id of targetMintedIds) {
          expect(await apexDeities.tokenOwnerOf(id)).to.equal(otherAccount);
        }
        expect(await apexDeities.aTierMinted()).to.equal(25);

        expect(
          await ethers.provider.getBalance(await apexDeities.getAddress())
        ).to.equal(ethers.parseEther("1875"));
      });

      it("Should not be able to mint A tier with enough money but without enough supply", async function () {
        const { helperContract, apexDeities, otherAccount } = await loadFixture(
          deployFixture
        );

        await apexDeities.connect(otherAccount).mint(
          {
            sTierAmount: 0,
            aTierAmount: 25,
            bTierAmount: 0,
            cTierAmount: 0,
          },
          {
            value: ethers.parseEther("1875"),
          }
        );

        await expect(
          apexDeities.mint(
            {
              sTierAmount: 0,
              aTierAmount: 1,
              bTierAmount: 0,
              cTierAmount: 0,
            },
            {
              value: ethers.parseEther("75"),
            }
          )
        ).to.be.revertedWithCustomError(apexDeities, "MaxedOutSupply");
      });
    });

    describe("Minting B tiers", function () {
      it("Should not be able to mint B tier without enough money", async function () {
        const { apexDeities } = await loadFixture(deployFixture);

        await expect(
          apexDeities.mint({
            sTierAmount: 0,
            aTierAmount: 0,
            bTierAmount: 1,
            cTierAmount: 0,
          })
        ).to.be.revertedWithCustomError(apexDeities, "WrongValue");

        await expect(
          apexDeities.mint(
            {
              sTierAmount: 0,
              aTierAmount: 0,
              bTierAmount: 1,
              cTierAmount: 0,
            },
            {
              value: ethers.parseEther("100"),
            }
          )
        ).to.be.revertedWithCustomError(apexDeities, "WrongValue");
      });

      it("Should be able to mint B tier with enough money", async function () {
        const { helperContract, apexDeities, otherAccount } = await loadFixture(
          deployFixture
        );
        await apexDeities.connect(otherAccount).mint(
          {
            sTierAmount: 0,
            aTierAmount: 0,
            bTierAmount: 1,
            cTierAmount: 0,
          },
          {
            value: ethers.parseEther("50"),
          }
        );

        const targetMintedId = await numberToBytes32(50);

        expect(await apexDeities.tokenOwnerOf(targetMintedId)).to.equal(
          otherAccount
        );
        expect(await apexDeities.bTierMinted()).to.equal(1);
      });

      it("Should be able to mint multiple B tier with enough money", async function () {
        const { helperContract, apexDeities, otherAccount } = await loadFixture(
          deployFixture
        );
        await apexDeities.connect(otherAccount).mint(
          {
            sTierAmount: 0,
            aTierAmount: 0,
            bTierAmount: 25,
            cTierAmount: 0,
          },
          {
            value: ethers.parseEther("1250"),
          }
        );

        const targetMintedIds = await Promise.all(
          Array(10)
            .fill(0)
            .map((_, i) => numberToBytes32(i + 50))
        );

        for (const id of targetMintedIds) {
          expect(await apexDeities.tokenOwnerOf(id)).to.equal(otherAccount);
        }
        expect(await apexDeities.bTierMinted()).to.equal(25);

        expect(
          await ethers.provider.getBalance(await apexDeities.getAddress())
        ).to.equal(ethers.parseEther("1250"));
      });

      it("Should not be able to mint B tier with enough money but without enough supply", async function () {
        const { helperContract, apexDeities, otherAccount } = await loadFixture(
          deployFixture
        );

        await apexDeities.connect(otherAccount).mint(
          {
            sTierAmount: 0,
            aTierAmount: 0,
            bTierAmount: 25,
            cTierAmount: 0,
          },
          {
            value: ethers.parseEther("1250"),
          }
        );

        await expect(
          apexDeities.mint(
            {
              sTierAmount: 0,
              aTierAmount: 0,
              bTierAmount: 1,
              cTierAmount: 0,
            },
            {
              value: ethers.parseEther("50"),
            }
          )
        ).to.be.revertedWithCustomError(apexDeities, "MaxedOutSupply");
      });
    });

    describe("Minting C tiers", function () {
      it("Should not be able to mint B tier without enough money", async function () {
        const { apexDeities } = await loadFixture(deployFixture);

        await expect(
          apexDeities.mint({
            sTierAmount: 0,
            aTierAmount: 0,
            bTierAmount: 0,
            cTierAmount: 1,
          })
        ).to.be.revertedWithCustomError(apexDeities, "WrongValue");

        await expect(
          apexDeities.mint(
            {
              sTierAmount: 0,
              aTierAmount: 0,
              bTierAmount: 0,
              cTierAmount: 1,
            },
            {
              value: ethers.parseEther("50"),
            }
          )
        ).to.be.revertedWithCustomError(apexDeities, "WrongValue");
      });

      it("Should be able to mint B tier with enough money", async function () {
        const { helperContract, apexDeities, otherAccount } = await loadFixture(
          deployFixture
        );
        await apexDeities.connect(otherAccount).mint(
          {
            sTierAmount: 0,
            aTierAmount: 0,
            bTierAmount: 0,
            cTierAmount: 1,
          },
          {
            value: ethers.parseEther("25"),
          }
        );
        const targetMintedId = await numberToBytes32(75);

        expect(await apexDeities.tokenOwnerOf(targetMintedId)).to.equal(
          otherAccount
        );
        expect(await apexDeities.cTierMinted()).to.equal(1);
      });

      it("Should be able to mint multiple B tier with enough money", async function () {
        const { helperContract, apexDeities, otherAccount } = await loadFixture(
          deployFixture
        );
        await apexDeities.connect(otherAccount).mint(
          {
            sTierAmount: 0,
            aTierAmount: 0,
            bTierAmount: 0,
            cTierAmount: 25,
          },
          {
            value: ethers.parseEther("625"),
          }
        );

        const targetMintedIds = await Promise.all(
          Array(10)
            .fill(0)
            .map((_, i) => numberToBytes32(i + 75))
        );

        for (const id of targetMintedIds) {
          expect(await apexDeities.tokenOwnerOf(id)).to.equal(otherAccount);
        }
        expect(await apexDeities.cTierMinted()).to.equal(25);

        expect(
          await ethers.provider.getBalance(await apexDeities.getAddress())
        ).to.equal(ethers.parseEther("625"));
      });

      it("Should not be able to mint B tier with enough money but without enough supply", async function () {
        const { helperContract, apexDeities, otherAccount } = await loadFixture(
          deployFixture
        );

        await apexDeities.connect(otherAccount).mint(
          {
            sTierAmount: 0,
            aTierAmount: 0,
            bTierAmount: 0,
            cTierAmount: 25,
          },
          {
            value: ethers.parseEther("625"),
          }
        );

        await expect(
          apexDeities.mint(
            {
              sTierAmount: 0,
              aTierAmount: 0,
              bTierAmount: 0,
              cTierAmount: 1,
            },
            {
              value: ethers.parseEther("25"),
            }
          )
        ).to.be.revertedWithCustomError(apexDeities, "MaxedOutSupply");
      });
    });

    describe("Minting Mix tiers", function () {
      it("Should be able to mint mix tier with enough money", async function () {
        const { helperContract, apexDeities, otherAccount } = await loadFixture(
          deployFixture
        );
        await apexDeities.connect(otherAccount).mint(
          {
            sTierAmount: 1,
            aTierAmount: 2,
            bTierAmount: 3,
            cTierAmount: 4,
          },
          {
            value: ethers.parseEther("500"),
          }
        );

        const targetMintedIds = await Promise.all(
          [0, 25, 26, 50, 51, 52, 75, 76, 77, 78].map((v) => numberToBytes32(v))
        );

        for (const id of targetMintedIds) {
          expect(await apexDeities.tokenOwnerOf(id)).to.equal(otherAccount);
        }
        expect(await apexDeities.sTierMinted()).to.equal(1);
        expect(await apexDeities.aTierMinted()).to.equal(2);
        expect(await apexDeities.bTierMinted()).to.equal(3);
        expect(await apexDeities.cTierMinted()).to.equal(4);

        expect(
          await ethers.provider.getBalance(await apexDeities.getAddress())
        ).to.equal(ethers.parseEther("500"));
      });

      it("Should be able to mint all tokens with enough money", async function () {
        const { helperContract, apexDeities, otherAccount } = await loadFixture(
          deployFixture
        );
        await apexDeities.connect(otherAccount).mint(
          {
            sTierAmount: 1,
            aTierAmount: 2,
            bTierAmount: 3,
            cTierAmount: 4,
          },
          {
            value: ethers.parseEther("500"),
          }
        );

        const targetMintedIds = await Promise.all(
          [0, 25, 26, 50, 51, 52, 75, 76, 77, 78].map((v) => numberToBytes32(v))
        );

        for (const id of targetMintedIds) {
          expect(await apexDeities.tokenOwnerOf(id)).to.equal(otherAccount);
        }
        expect(await apexDeities.sTierMinted()).to.equal(1);
        expect(await apexDeities.aTierMinted()).to.equal(2);
        expect(await apexDeities.bTierMinted()).to.equal(3);
        expect(await apexDeities.cTierMinted()).to.equal(4);

        expect(
          await ethers.provider.getBalance(await apexDeities.getAddress())
        ).to.equal(ethers.parseEther("500"));
      });
    });
  });

  describe("Withdraw", function () {
    it("Owner should be able to withdraw", async function () {
      const { helperContract, owner, apexDeities, otherAccount } =
        await loadFixture(deployFixture);
      await apexDeities.connect(otherAccount).mint(
        {
          sTierAmount: 25,
          aTierAmount: 25,
          bTierAmount: 25,
          cTierAmount: 25,
        },
        {
          value: ethers.parseEther("6250"),
        }
      );

      await expect(
        apexDeities.connect(owner).withdraw(ethers.parseEther("6250"))
      )
        .to.emit(apexDeities, "Withdrawal")
        .withArgs(owner.address, ethers.parseEther("6250"));
    });

    it("should fail in more than balance withdrawal", async function () {
      const { owner, apexDeities, otherAccount } = await loadFixture(
        deployFixture
      );
      await apexDeities.connect(otherAccount).mint(
        {
          sTierAmount: 25,
          aTierAmount: 25,
          bTierAmount: 25,
          cTierAmount: 25,
        },
        {
          value: ethers.parseEther("6250"),
        }
      );

      await expect(
        apexDeities.connect(owner).withdraw(ethers.parseEther("6251"))
      ).to.be.revertedWithCustomError(apexDeities, "FailedWithdrawal");
    });

    it("Not owner should not be able to withdraw", async function () {
      const { apexDeities, otherAccount } = await loadFixture(deployFixture);
      await apexDeities.connect(otherAccount).mint(
        {
          sTierAmount: 25,
          aTierAmount: 25,
          bTierAmount: 25,
          cTierAmount: 25,
        },
        {
          value: ethers.parseEther("6250"),
        }
      );

      await expect(
        apexDeities.connect(otherAccount).withdraw(ethers.parseEther("6250"))
      ).to.be.revertedWithCustomError(apexDeities, "UnAuthorized");
    });
  });
});
