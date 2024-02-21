import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SwapToken", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploySwapTokenFixture() {
   
    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();

    const SwapToken = await ethers.getContractFactory("SwapToken");
    const swapToken = await SwapToken.deploy();

    return { swapToken, owner };
  }

  describe("Deployment", function () {
    
    it("Should set the right owner", async function () {
      const { swapToken, owner } = await loadFixture(deploySwapTokenFixture);

      expect(await swapToken.owner()).to.equal(owner.address);
    });
  });

 /*  describe("depositAmount", function () {
    
      it("Should deposit or receive and store the funds to swapToken", async function () {
      const { swapToken } = await loadFixture(deploySwapTokenFixture
      );
      const deposit = ethers.parseEther("1"); // testing with deposit of 1 ETH

      await expect(() => swapToken.depositAmount({ value: deposit }))
      .to.changeEtherBalance(swapToken, deposit);



      // expect(await ethers.provider.getBalance(swapToken.target)).to.equal(_amount);
    });

  }); */


  describe("tokenSwap", function () {   
      it("to swap tokens successfully", async function () {
        const { swapToken, owner } = await loadFixture(deploySwapTokenFixture);
        await swapToken.depositAmount(100, true);
        await swapToken.depositAmount(100, false);

        const balanceA = await swapToken.tokenBalanceA(owner.address)
        const balanceB = await swapToken.tokenBalanceB(owner.address)

        expect(balanceA).to.equal(0);
        expect(balanceB).to.equal(100);        
      });

      });

      
    describe("withdrawToken", function () {
          
        it('Should withdraw tokens correctly', async function () {
          const { swapToken, owner} = await loadFixture(
            deploySwapTokenFixture
          );
          await swapToken.depositAmount(100, true);
          await swapToken.withdrawToken(50, true);
          const balanceA = await swapToken.tokenBalanceA(owner.address);
          expect(balanceA).to.equal(50);
        });
    });

    /* describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { lock, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw())
          .to.emit(lock, "Withdrawal")
          .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
      });
    });

    describe("Transfers", function () {
      it("Should transfer the funds to the owner", async function () {
        const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).to.changeEtherBalances(
          [owner, lock],
          [lockedAmount, -lockedAmount]
        );
      });
    }); */    
  
  });


   

