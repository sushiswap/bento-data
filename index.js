'use strict';

const pageResults = require('graph-results-pager')
const ethers = require('ethers')

const graphAPIEndpoints = {
  bento: 'https://api.thegraph.com/subgraphs/name/jiro-ono/bento-trial-staging',
}

module.exports = {
  pageResults,
  graphAPIEndpoints,
  bento: {
    info() {
      return pageResults({
        api: graphAPIEndpoints.bento,
        query: {
          entity: 'bentoBoxes',
          properties: [
            'id',
            'lendingPairsCount',
            'lendingPairs { id, asset { id, totalSupply, name, symbol, decimals }, borrowOpeningFee, closedCollaterizationRate, collateral { id, totalSupply, name, symbol, decimals }, decimals, dev, devFee, exchangeRate, feeTo, feesPendingAmount, interestElasticity, interestPerBlock, lastBlockAccrued, liquidationMultiplier, masterContract, maximumInterestPerBlock, maximumTargetUtilization, name, openCollaterizationRate, oracle, owner, pendingOwner, protocolFee, startingInterestPerBlock, symbol, totalAssetAmount, totalAssetFraction, totalBorrowFraction, totalBorrowAmount, totalCollateralAmount, utilization, block, timestamp }',
            'tokens { id, totalSupply, name, symbol, decimals, block, timestamp }',
            'withdrawals { id, from { id }, to { id }, token { id, totalSupply, name, symbol, decimals, block, timestamp }, amount, block, timestamp }',
            'deposits { id, from { id }, to { id }, token { id, totalSupply, name, symbol, decimals, block, timestamp }, amount, block, timestamp }',
          ]
        }
      })
        .then(results =>
          results.map(({ id, lendingPairsCount, lendingPairs, tokens, withdrawals, deposits }) => ({
            id: id,
            lendingPairsCount: ethers.BigNumber.from(lendingPairsCount),
            lendingPairs: lendingPairs.map(({ id, asset, borrowOpeningFee, closedCollaterizationRate, collateral, decimals, dev, devFee, exchangeRate, feeTo, feesPendingAmount, interestElasticity, interestPerBlock, lastBlockAccrued, liquidationMultiplier, masterContract, maximumInterestPerBlock, maximumTargetUtilization, name, openCollaterizationRate, oracle, owner, pendingOwner, protocolFee, startingInterestPerBlock, symbol, totalAssetAmount, totalAssetFraction, totalBorrowFraction, totalBorrowAmount, totalCollateralAmount, utilization, block, timestamp }) => ({
              id: id,
              asset: asset.id,
              assetTotalSupply: ethers.BigNumber.from(asset.totalSupply),
              assetName: asset.name,
              assetSymbol: asset.symbol,
              assetDecimals: ethers.BigNumber.from(asset.decimals),
              borrowOpeningFee: ethers.BigNumber.from(borrowOpeningFee),
              closedCollaterizationRate: ethers.BigNumber.from(closedCollaterizationRate),
              collateral: collateral.id,
              collateralTotalSupply: ethers.BigNumber.from(collateral.totalSupply),
              collateralName: collateral.name,
              collateralSymbol: collateral.symbol,
              collateralDecimals: ethers.BigNumber.from(collateral.decimals),
              decimals: ethers.BigNumber.from(decimals),
              dev: dev,
              devFee: ethers.BigNumber.from(devFee),
              exchangeRate: ethers.BigNumber.from(exchangeRate),
              feeTo: feeTo,
              feesPendingAmount: ethers.BigNumber.from(feesPendingAmount),
              interestElasticity: ethers.BigNumber.from(interestElasticity),
              interestPerBlock: ethers.BigNumber.from(interestPerBlock),
              lastBlockAccrued: ethers.BigNumber.from(lastBlockAccrued),
              liquidationMultiplier: ethers.BigNumber.from(liquidationMultiplier),
              masterContract: masterContract,
              maximumInterestPerBlock: ethers.BigNumber.from(maximumInterestPerBlock),
              maximumTargetUtilization: ethers.BigNumber.from(maximumTargetUtilization),
              name: name,
              openCollaterizationRate: ethers.BigNumber.from(openCollaterizationRate),
              oracle: oracle,
              owner: owner,
              pendingOwner: pendingOwner,
              protocolFee: ethers.BigNumber.from(protocolFee),
              startingInterestPerBlock: ethers.BigNumber.from(startingInterestPerBlock),
              symbol: symbol,
              totalAssetAmount: ethers.BigNumber.from(totalAssetAmount),
              totalAssetFraction: ethers.BigNumber.from(totalAssetFraction),
              totalBorrowFraction: ethers.BigNumber.from(totalBorrowFraction),
              totalBorrowAmount: ethers.BigNumber.from(totalBorrowAmount),
              totalCollateralAmount: ethers.BigNumber.from(totalCollateralAmount),
              utilization: ethers.BigNumber.from(utilization),
              block: ethers.BigNumber.from(block),
              timestamp: ethers.BigNumber.from(timestamp)
            })),
            tokens: tokens.map(({ id, totalSupply, name, symbol, decimals, block, timestamp }) => ({
              id: id,
              totalSupply: ethers.BigNumber.from(totalSupply),
              name: name,
              symbol: symbol,
              decimals: ethers.BigNumber.from(decimals),
              block: ethers.BigNumber.from(block),
              timestamp: ethers.BigNumber.from(timestamp)
            })),
            withdrawals: withdrawals.map(({ id, from, to, token, amount, block, timestamp }) => ({
              id: id,
              from: from.id,
              to: to.id,
              token: token.id,
              tokenTotalSupply: ethers.BigNumber.from(token.totalSupply),
              tokenName: token.name,
              tokenSymbol: token.symbol,
              tokenDecimals: ethers.BigNumber.from(token.decimals),
              tokenBlock: ethers.BigNumber.from(token.block),
              tokenTimestamp: ethers.BigNumber.from(token.timestamp),
              amount: ethers.BigNumber.from(amount),
              block: ethers.BigNumber.from(block),
              timestamp: ethers.BigNumber.from(timestamp)
            })),
            deposits: deposits.map(({ id, from, to, token, amount, block, timestamp }) => ({
              id: id,
              from: from.id,
              to: to.id,
              token: token.id,
              tokenTotalSupply: ethers.BigNumber.from(token.totalSupply),
              tokenName: token.name,
              tokenSymbol: token.symbol,
              tokenDecimals: ethers.BigNumber.from(token.decimals),
              tokenBlock: ethers.BigNumber.from(token.block),
              tokenTimestamp: ethers.BigNumber.from(token.timestamp),
              amount: ethers.BigNumber.from(amount),
              block: ethers.BigNumber.from(block),
              timestamp: ethers.BigNumber.from(timestamp)
            }))
          }))
        )
        .catch(err => console.error(err))
    },

    masterContractApproval() {
      return pageResults({
        api: graphAPIEndpoints.bento,
        query: {
          entity: 'masterContractApprovals',
          properties: [
            'id',
            'owner { id }',
            'approved'
          ]
        }
      })
        .then(results =>
          results.map(({ id, owner, approved }) => ({
            id: id,
            owner: owner.id,
            approved: approved
          }))
        )
        .catch(err => console.error(err))
    },

    lendingPairs() {
      // TODO: something may be wrong with this one, or it's just lack of data
      return pageResults({
        api: graphAPIEndpoints.bento,
        query: {
          entity: 'lendingPairs',
          properties: [
            'id',
            'asset { id, bentoBox { id }, totalSupply, name, symbol, decimals }',
            'borrowOpeningFee',
            'closedCollaterizationRate',
            'collateral { id, bentoBox { id }, totalSupply, name, symbol, decimals }',
            'decimals',
            'dev',
            'devFee',
            'exchangeRate',
            'feeTo',
            'feesPendingAmount',
            'interestElasticity',
            'interestPerBlock',
            'lastBlockAccrued',
            'liquidationMultiplier',
            'masterContract',
            'maximumInterestPerBlock',
            'maximumTargetUtilization',
            'minimumInterestPerBlock',
            'minimumTargetUtilization',
            'name',
            'openCollaterizationRate',
            'oracle',
            'owner',
            'pendingOwner',
            'protocolFee',
            'startingInterestPerBlock',
            'symbol',
            'totalAssetAmount',
            'totalAssetFraction',
            'totalBorrowFraction',
            'totalBorrowAmount',
            'totalCollateralAmount',
            'utilization',
            'block',
            'timestamp',
            // TODO: let's take this transaction away from here, and add a function for single pair fetches and then include tx data in that
            'transactions { id, type, token { id, totalSupply }, amount, fraction, poolPercentage, block, timestamp  }'
          ]
        }
      })
        .then(results =>
          results.map(({ id, asset, borrowOpeningFee, closedCollaterizationRate, collateral, decimals, dev, devFee, exchangeRate, feeTo, feesPendingAmount, interestElasticity, interestPerBlock, lastBlockAccrued, liquidationMultiplier, masterContract, maximumInterestPerBlock, maximumTargetUtilization, minimumInterestPerBlock, minimumTargetUtilization, name, openCollaterizationRate, oracle, owner, pendingOwner, protocolFee, startingInterestPerBlock, symbol, totalAssetAmount, totalAssetFraction, totalBorrowFraction, totalBorrowAmount, totalCollateralAmount, utilization, block, timestamp, transactions }) => ({
            id: id,
            asset: asset,
            borrowOpeningFee: ethers.BigNumber.from(borrowOpeningFee),
            closedCollaterizationRate: ethers.BigNumber.from(closedCollaterizationRate),
            collateral: collateral,
            decimals: ethers.BigNumber.from(decimals),
            dev: dev,
            devFee: ethers.BigNumber.from(devFee),
            exchangeRate: ethers.BigNumber.from(exchangeRate),
            feeTo: feeTo,
            feesPendingAmount: ethers.BigNumber.from(feesPendingAmount),
            interestElasticity: ethers.BigNumber.from(interestElasticity),
            interestPerBlock: ethers.BigNumber.from(interestPerBlock),
            lastBlockAccrued: ethers.BigNumber.from(lastBlockAccrued),
            liquidationMultiplier: ethers.BigNumber.from(liquidationMultiplier),
            masterContract: masterContract,
            maximumInterestPerBlock: ethers.BigNumber.from(maximumInterestPerBlock),
            maximumTargetUtilization: ethers.BigNumber.from(maximumTargetUtilization),
            name: name,
            openCollaterizationRate: ethers.BigNumber.from(openCollaterizationRate),
            oracle: oracle,
            owner: owner,
            pendingOwner: pendingOwner,
            protocolFee: ethers.BigNumber.from(protocolFee),
            startingInterestPerBlock: ethers.BigNumber.from(startingInterestPerBlock),
            symbol: symbol,
            totalAssetAmount: ethers.BigNumber.from(totalAssetAmount),
            totalAssetFraction: ethers.BigNumber.from(totalAssetFraction),
            totalBorowFraction: ethers.BigNumber.from(totalBorrowFraction),
            totalBorrowAmount: ethers.BigNumber.from(totalBorrowAmount),
            totalCollateralAmount: ethers.BigNumber.from(totalCollateralAmount),
            utilization: ethers.BigNumber.from(utilization),
            block: ethers.BigNumber.from(block),
            timestamp: ethers.BigNumber.from(timestamp),
            transactions: transactions.map(({ id, type, token, amount, fraction, poolPercentage, block, timestamp }) => ({
              id: id,
              type: type,
              token: token.id,
              tokenTotalSupply: ethers.BigNumber.from(tokenTotalSupply),
              amount: ethers.BigNumber.from(amount),
              fraction: ethers.BigNumber.from(fraction),
              poolPercentage: ethers.BigNumber.from(poolPercentage),
              block: ethers.BigNumber.from(block),
              timestamp: ethers.BigNumber.from(timestamp)
            }))
          }))
        )
        .catch(err => console.error(err))
    },

    deposits() {
      return pageResults({
        api: graphAPIEndpoints.bento,
        query: {
          entity: 'deposits',
          properties: [
            'id',
            'from { id }',
            'to { id }',
            'token { id, bentoBox { id }, totalSupply, name, symbol, decimals }',
            'amount',
            'block',
            'timestamp'
          ]
        }
      })
        .then(results =>
          results.map(({ id, from, to, token, amount, block, timestamp }) => ({
            id: id,
            from: from.id,
            to: to.id,
            token: token.id,
            tokenBentoBox: token.bentoBox.id,
            tokenTotalSupply: ethers.BigNumber.from(token.totalSupply),
            tokenName: token.name,
            tokenSymbol: token.symbol,
            tokenDecimals: token.decimals,
            amount: ethers.BigNumber.from(amount),
            block: ethers.BigNumber.from(block),
            timestamp: ethers.BigNumber.from(timestamp)
          }))
        )
        .catch(err => console.error(err))
    },

    withdrawals() {
      return pageResults({
        api: graphAPIEndpoints.bento,
        query: {
          entity: 'withdrawals',
          properties: [
            'id',
            'from { id }',
            'to',
            'token { id, bentoBox { id }, totalSupply, name, symbol, decimals }',
            'amount',
            'block',
            'timestamp'
          ]
        }
      })
        .then(results =>
          results.map(({ id, from, to, token, amount, block, timestamp }) => ({
            id: id,
            from: from.id,
            to: to,
            token: token.id,
            tokenBentoBox: token.bentoBox.id,
            tokenTotalSupply: ethers.BigNumber.from(token.totalSupply),
            tokenName: token.name,
            tokenSymbol: token.symbol,
            tokenDecimals: token.decimals,
            amount: ethers.BigNumber.from(amount),
            block: ethers.BigNumber.from(block),
            timestamp: ethers.BigNumber.from(timestamp)
          }))
        )
        .catch(err => console.error(err))
    },

    tokens() {
      return pageResults({
        api: graphAPIEndpoints.bento,
        query: {
          entity: 'tokens',
          properties: [
            'id',
            'bentoBox { id }',
            'totalSupply',
            'name',
            'symbol',
            'decimals',
            'block',
            'timestamp'
          ]
        }
      })
        .then(results =>
          results.map(({ id, bentoBox, totalSupply, name, symbol, decimals, block, timestamp }) => ({
            id: id,
            bentoBox: bentoBox.id,
            totalSupply: ethers.BigNumber.from(totalSupply),
            name: name,
            symbol: symbol,
            decimals: decimals,
            block: ethers.BigNumber.from(block),
            timestamp: ethers.BigNumber.from(timestamp)
          }))
        )
        .catch(err => console.error(err))
    },

    userInfo(user) {
      let where = user ? { id: `\\"${user.toLowerCase()}\\"` } : {}
      return pageResults({
        api: graphAPIEndpoints.bento,
        query: {
          entity: 'users',
          selection: {
            where
          },
          properties: [
            'id',
            'lendingPairs { id, lendingPair { id }, userCollateralAmount, balanceOf, userBorrowFraction, transactions { id, type, lendingPair { id }, token { id }, amount, fraction, poolPercentage, block, timestamp } }',
            'bentoData { id, token { id }, amount }',
            'withdrawals { id, from { id }, to { id }, token { id, bentoBox { id }, totalSupply, name, symbol, decimals }, amount, block, timestamp }',
            'deposits { id, from { id }, to { id }, token { id, bentoBox { id }, totalSupply, name, symbol, decimals }, amount, block, timestamp }',
            'block',
            'timestamp'
          ]
        }
      })
        .then(results =>
          results.map(({ id, lendingPairs, bentoData, withdrawals, deposits, block, timestamp }) => ({
            id: id,
            leandingPairs: lendingPairs.map(({ id, lendingPair, userCollateralAmount, balanceOf, userBorrowFraction, transactions }) => ({
              id: id,
              lendingPairId: lendingPair.id,
              userCollateralAmount: ethers.BigNumber.from(userCollateralAmount),
              balanceOf: Number(balanceOf),
              userBorrowFraction: ethers.BigNumber.from(userBorrowFraction),
              transactions: transactions.map(({ id, type, lendingPair, token, amount, fraction, poolPercentage, block, timestamp }) => ({
                id: id,
                type: type,
                lendingPairId: lendingPair.id,
                token: token.id,
                amount: ethers.BigNumber.from(amount),
                fraction: ethers.BigNumber.from(fraction),
                poolPercentage: ethers.BigNumber.from(poolPercentage),
                block: ethers.BigNumber.from(block),
                timestamp: ethers.BigNumber.from(timestamp)
              }))
            })),
            bentoData: bentoData.map(({ id, token, amount }) => ({
              id: id,
              tokenId: id,
              amount: ethers.BigNumber.from(amount)
            })),
            withdrawals: withdrawals.map(({ id, from, to, token, amount, block, timestamp }) => ({
              id: id,
              from: from.id,
              to: to.id,
              token: token.id,
              tokenBentoBox: token.bentoBox.id,
              tokenTotalSupply: ethers.BigNumber.from(token.totalSupply),
              tokenName: token.name,
              tokenSymbol: token.symbol,
              tokenDecimals: token.decimals,
              amount: ethers.BigNumber.from(amount),
              block: ethers.BigNumber.from(block),
              timestamp: ethers.BigNumber.from(timestamp)
            })),
            deposits: deposits.map(({ id, from, to, token, amount, block, timestamp }) => ({
              id: id,
              from: from.id,
              to: to.id,
              token: token.id,
              tokenBentoBox: token.bentoBox.id,
              tokenTotalSupply: ethers.BigNumber.from(token.totalSupply),
              tokenName: token.name,
              tokenSymbol: token.symbol,
              tokenDecimals: token.decimals,
              amount: ethers.BigNumber.from(amount),
              block: ethers.BigNumber.from(block),
              timestamp: ethers.BigNumber.from(timestamp)
            })),
            block: block,
            timestamp: timestamp
          }))
        )
        .catch(err => console.error(err))
    },

    userBentoTokenData({ user = undefined, token = undefined }) {
      // TODO: add where variable here
      return pageResults({
        api: graphAPIEndpoints.bento,
        query: {
          entity: 'userBentoTokenDatas',
          selection: {
            orderBy: 'amount',
            orderDirection: 'desc',
            where: {
              id: user && token ?  `\\"${user.toLowerCase()}-${token.toLowerCase()}\\"` : undefined,
            }
          },
          properties: [
            'id',
            'owner { id }',
            'token { id, bentoBox { id }, totalSupply, name, symbol, decimals, block, timestamp }',
            'amount'
          ]
        }
      })
        .then(results =>
          results.map(({ id, owner, token, amount }) => ({
            id: id,
            user: owner.id,
            token: token.id,
            tokenBentoBox: token.bentoBox.id,
            tokenTotalSupply: ethers.BigNumber.from(token.totalSupply),
            tokenName: token.name,
            tokenSymbol: token.symbol,
            tokenDecimals: token.decimals,
            tokenLastBlock: ethers.BigNumber.from(token.block),
            tokenLastTimestamp: ethers.BigNumber.from(token.timestamp),
            amount: ethers.BigNumber.from(amount)
          }))
        )
        .catch(err => console.error(err))
    },

    userLendingPairData() {
      // TODO: this might be a redundant function to have
    },

    pairTxs() {
      // TODO: will need to figure out what ids look like
      //       or we can return pairTxs for a specific pair
    },

  }
}
