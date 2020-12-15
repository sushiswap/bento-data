'use strict';

const pageResults = require('graph-results-pager')

const graphAPIEndpoints = {
  bento: 'https://api.thegraph.com/subgraphs/name/jiro-ono/bento-trial',
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
            'lendingPairs { id, asset, borrowOpeningFee, closedCollaterizationRate, collateral, decimals, dev, devFee, exchangeRate, feeTo, feesPendingAmount, interestElasticity, interestPerBlock, lastBlockAccrued, liquidationMultiplier, masterContract, maximumInterestPerBlock, maximumTargetUtilization, name, openCollaterizationRate, oracle, owner, pendingOwner, protocolFee, startingInterestPerBlock, symbol, totalAssetAmount, totalAssetFraction, totalBorrowFraction, totalBorrowAmount, totalCollateralAmount, utilization, block, timestamp }',
            'tokens { id, totalSupply, block, timestamp }',
            'withdrawals { id, from { id }, to, token { id, totalSupply, block, timestamp }, amount, block, timestamp }',
            'deposits { id, from { id }, to { id }, token { id, totalSupply, block, timestamp }, amount, block, timestamp }',
          ]
        }
      })
        .then(results =>
          results.map(({ id, lendingPairsCount, lendingPairs, tokens, withdrawals, deposits }) => ({
            id: id,
            lendingPairsCount: Number(lendingPairsCount),
            lendingPairs: lendingPairs.map(({ id, asset, borrowOpeningFee, closedCollaterizationRate, collateral, decimals, dev, devFee, exchangeRate, feeTo, feesPendingAmount, interestElasticity, interestPerBlock, lastBlockAccrued, liquidationMultiplier, masterContract, maximumInterestPerBlock, maximumTargetUtilization, name, openCollaterizationRate, oracle, owner, pendingOwner, protocolFee, startingInterestPerBlock, symbol, totalAssetAmount, totalAssetFraction, totalBorrowFraction, totalBorrowAmount, totalCollateralAmount, utilization, block, timestamp }) => ({
              id: id,
              asset: asset,
              borrowOpeningFee: Number(borrowOpeningFee),
              closedCollaterizationRate: Number(closedCollaterizationRate),
              collateral: Number(collateral),
              decimals: Number(decimals),
              dev: dev,
              devFee: Number(devFee),
              exchangeRate: Number(exchangeRate),
              feeTo: feeTo,
              feesPendingAmount: Number(feesPendingAmount),
              interestElasticity: Number(interestElasticity),
              interestPerBlock: Number(interestPerBlock),
              lastBlockAccrued: Number(lastBlockAccrued),
              liquidationMultiplier: Number(liquidationMultiplier),
              masterContract: masterContract,
              maximumInterestPerBlock: Number(maximumInterestPerBlock),
              maximumTargetUtilization: Number(maximumTargetUtilization),
              name: name,
              openCollaterizationRate: Number(openCollaterizationRate),
              oracle: oracle,
              owner: owner,
              pendingOwner: pendingOwner,
              protocolFee: Number(protocolFee),
              startingInterestPerBlock: Number(startingInterestPerBlock),
              symbol: symbol,
              totalAssetAmount: Number(totalAssetAmount),
              totalAssetFraction: Number(totalAssetFraction),
              totalBorrowFraction: Number(totalBorrowFraction),
              totalBorrowAmount: Number(totalBorrowAmount),
              totalCollateralAmount: Number(totalCollateralAmount),
              utilization: Number(utilization),
              block: Number(block),
              timestamp: Number(timestamp)
            })),
            tokens: tokens.map(({ id, totalSupply, block, timestamp }) => ({
              id: id,
              totalSupply: Number(totalSupply),
              block: Number(block),
              timestamp: Number(timestamp)
            })),
            withdrawals: withdrawals.map(({ id, from, to, token, amount, block, timestamp }) => ({
              id: id,
              from: from.id,
              to: to,
              token: token.id,
              tokenTotalSupply: Number(token.totalSupply),
              tokenBlock: Number(token.block),
              tokenTimestamp: Number(token.timestamp),
              amount: Number(amount),
              share: Number(share),
              block: Number(block),
              timestamp: Number(timestamp)
            })),
            deposits: deposits.map(({ id, from, to, token, amount, block, timestamp }) => ({
              id: id,
              from: from.id,
              to: to.id,
              token: token.id,
              amount: Number(amount),
              block: Number(block),
              timestamp: Number(timestamp)
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
            'asset',
            'borrowOpeningFee',
            'closedCollaterizationRate',
            'collateral',
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
            borrowOpeningFee: Number(borrowOpeningFee),
            closedCollaterizationRate: Number(closedCollaterizationRate),
            collateral: Number(collateral),
            decimals: Number(decimals),
            dev: dev,
            devFee: Number(devFee),
            exchangeRate: Number(exchangeRate),
            feeTo: feeTo,
            feesPendingAmount: Number(feesPendingAmount),
            interestElasticity: Number(interestElasticity),
            interestPerBlock: Number(interestPerBlock),
            lastBlockAccrued: Number(lastBlockAccrued),
            liquidationMultiplier: Number(liquidationMultiplier),
            masterContract: masterContract,
            maximumInterestPerBlock: Number(maximumInterestPerBlock),
            maximumTargetUtilization: Number(maximumTargetUtilization),
            name: name,
            openCollaterizationRate: Number(openCollaterizationRate),
            oracle: oracle,
            owner: owner,
            pendingOwner: pendingOwner,
            protocolFee: Number(protocolFee),
            startingInterestPerBlock: Number(startingInterestPerBlock),
            symbol: symbol,
            totalAssetAmount: Number(totalAssetAmount),
            totalAssetFraction: Number(totalAssetFraction),
            totalBorowFraction: Number(totalBorrowFraction),
            totalBorrowAmount: Number(totalBorrowAmount),
            totalCollateralAmount: Number(totalCollateralAmount),
            utilization: Number(utilization),
            block: Number(block),
            timestamp: Number(timestamp),
            transactions: transactions.map(({ id, type, token, amount, fraction, poolPercentage, block, timestamp }) => ({
              id: id,
              type: type,
              token: token.id,
              tokenTotalSupply: Number(tokenTotalSupply),
              amount: Number(amount),
              fraction: Number(fraction),
              poolPercentage: Number(poolPercentage),
              block: Number(block),
              timestamp: Number(timestamp)
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
            'token { id, totalSupply }',
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
            tokenTotalSupply: Number(token.totalSupply),
            amount: Number(amount),
            block: Number(block),
            timestamp: Number(timestamp)
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
            'token { id, totalSupply }',
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
            tokenTotalSupply: Number(token.totalSupply),
            amount: Number(amount),
            block: Number(block),
            timestamp: Number(timestamp)
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
            'totalSupply',
            'block',
            'timestamp'
          ]
        }
      })
        .then(results =>
          results.map(({ id, totalSupply, block, timestamp }) => ({
            id: id,
            totalSupply: Number(totalSupply),
            block: Number(block),
            timestamp: Number(timestamp)
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
            'lendingPairs { id, lendingPair { id, asset }, userCollateralAmount, balanceOf, userBorrowFraction, transactions { id, type, lendingPair { id, asset }, token { id, totalSupply }, amount, fraction, poolPercentage, block, timestamp } }',
            'bentoData { id, token { id, totalSupply }, amount }',
            'withdrawals { id, from { id }, to, token { id, totalSupply }, amount, block, timestamp }',
            'deposits { id, from { id }, to { id }, token { id, totalSupply }, amount, block, timestamp }',
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
              lendingPairAsset: lendingPair.asset,
              userCollateralAmount: Number(userCollateralAmount),
              balanceOf: Number(balanceOf),
              userBorrowFraction: Number(userBorrowFraction),
              transactions: transactions.map(({ id, type, lendingPair, token, amount, fraction, poolPercentage, block, timestamp }) => ({
                id: id,
                type: type,
                lendingPairId: lendingPair.id,
                lendingPairAsset: lendingPair.asset,
                token: token.id,
                tokenTotalSupply: Number(token.totalSupply),
                amount: Number(amount),
                fraction: Number(fraction),
                poolPercentage: Number(poolPercentage),
                block: Number(block),
                timestamp: Number(timestamp)
              }))
            })),
            bentoData: bentoData.map(({ id, token, amount }) => ({
              id: id,
              tokenId: id,
              tokenTotalSupply: Number(token.totalSupply),
              amount: Number(amount)
            })),
            withdrawals: withdrawals.map(({ id, from, to, token, amount, block, timestamp }) => ({
              id: id,
              from: from.id,
              to: to,
              token: token.id,
              tokenTotalSupply: Number(token.totalSupply),
              amount: Number(amount),
              block: Number(block),
              timestamp: Number(timestamp)
            })),
            deposits: deposits.map(({ id, from, to, token, amount, block, timestamp }) => ({
              id: id,
              from: from.id,
              to: to.id,
              token: token.id,
              tokenTotalSupply: Number(token.totalSupply),
              amount: Number(amount),
              block: Number(block),
              timestamp: Number(timestamp)
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
            'token { id, totalSupply, block, timestamp }',
            'amount'
          ]
        }
      })
        .then(results =>
          results.map(({ id, owner, token, amount }) => ({
            id: id,
            user: owner.id,
            token: token.id,
            tokenTotalSupply: Number(token.totalSupply),
            tokenLastBlock: Number(token.block),
            tokenLastTimestamp: Number(token.timestamp),
            amount: Number(amount)
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
