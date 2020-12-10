'use strict';

const pageResults = require('graph-results-pager')

const graphAPIEndpoints = {
  bento: 'https://api.thegraph.com/subgraphs/name/clearwood/bento',
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
            'tokens { id, totalShare, totalAmount, block, timestamp }',
            'withdrawals { id, from { id }, to, token { id }, amount, share, block, timestamp }',
            'deposits { id, from { id }, to { id }, token { id }, amount, share, block, timestamp }',
            'flashloans { id, user { id }, token { id }, amount, feeAmount, block, timestamp }'
          ]
        }
      })
        .then(([{ id, lendingPairsCount, tokens, withdrawals, deposits, flashloans }]) =>
          ({
            id: id,
            lendingPairsCount: Number(lendingPairsCount),
            tokens: tokens.map(({ id, totalShare, totalAmount, block, timestamp }) => ({
              id: id,
              totalShare: Number(totalShare),
              totalAmount: Number(totalAmount),
              block: Number(block),
              timestamp: Number(timestamp)
            })),
            withdrawals: withdrawals.map(({ id, from, to, token, amount, share, block, timestamp }) => ({
              id: id,
              from: from.id,
              to: to,
              token: token.id,
              amount: Number(amount),
              share: Number(share),
              block: Number(block),
              timestamp: Number(timestamp)
            })),
            deposits: deposits.map(({ id, from, to, token, amount, share, block, timestamp }) => ({
              id: id,
              from: from.id,
              to: to.id,
              token: token.id,
              amount: Number(amount),
              share: Number(share),
              block: Number(block),
              timestamp: Number(timestamp)
            })),
            flashloans: flashloans.map(({ id, user, token, amount, feeAmount, block, timestamp }) => ({
              id: id,
              user: user.id,
              token: token.id,
              amount: Number(amount),
              feeAmount: Number(feeAmount),
              block: Number(block),
              timestamp: Number(timestamp)
            }))
          })
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
            'feesPendingShare',
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
            'totalAssetShare',
            'totalBorrowFraction',
            'totalBorrowShare',
            'totalCollateralShare',
            'totalSupply',
            'utilization',
            'block',
            'timestamp',
            'transactions { id, type, lendingPair, token { id }, amount, share, fraction, poolPercentage, block, timestamp  }'
          ]
        }
      })
        .then(results =>
          results.map(({ id, asset, borrowOpeningFee, closedCollaterizationRate, collateral, decimals, dev, devFee, exchangeRate, feeTo, feesPendingShare, interestElasticity, interestPerBlock, lastBlockAccrued, liquidationMultiplier, masterContract, maximumInterestPerBlock, maximumTargetUtilization, minimumInterestPerBlock, minimumTargetUtilization, name, openCollaterizationRate, oracle, owner, pendingOwner, protocolFee, startingInterestPerBlock, symbol, totalAssetShare, totalBorrowFraction,    totalBorrowShare, totalCollateralShare, totalSupply, utilization, block, timestamp, transactions }) => ({
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
            feesPendingShare: Number(feesPendingShare),
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
            totalAssetShare: Number(totalAssetShare),
            totalBorrowFraction: Number(totalBorrowFraction),
            totalCollateralShare: Number(totalCollateralShare),
            totalSupply: Number(totalSupply),
            utilization: Number(utilization),
            block: Number(block),
            timestamp: Number(timestamp),
            transactions: transactions.map(({ id, type, amount, share, fraction, poolPercentage, block, timestamp }) => ({
              id: id,
              type: type,
              amount: Number(amount),
              share: Number(share),
              fraction: Number(fraction),
              poolPercentage: Number(poolPercentage),
              block: Number(block),
              timestamp: Number(timestamp)
            }))
          }))
        )
        .catch(err => console.error(err))
    },

    flashLoans() {
      return pageResults({
        api: graphAPIEndpoints.bento,
        query: {
          entity: 'flashLoans',
          properties: [
            'id',
            'user { id }',
            'token { id }',
            'amount',
            'feeAmount',
            'block',
            'timestamp'
          ]
        }
      })
        .then(results =>
          results.map(({ id, user, token, amount, feeAmount, block, timestamp }) => ({
            id: id,
            user: user.id,
            token: token.id,
            amount: Number(amount),
            feeAmount: Number(feeAmount),
            block: Number(block),
            timestamp: Number(timestamp)
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
            'token { id }',
            'amount',
            'share',
            'block',
            'timestamp'
          ]
        }
      })
        .then(results =>
          results.map(({ id, from, to, token, amount, share, block, timestamp }) => ({
            id: id,
            from: from.id,
            to: to.id,
            token: token.id,
            amount: Number(amount),
            share: Number(share),
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
            'token { id }',
            'amount',
            'share',
            'block',
            'timestamp'
          ]
        }
      })
        .then(results =>
          results.map(({ id, from, to, token, amount, share, block, timestamp }) => ({
            id: id,
            from: from.id,
            to: to,
            token: token.id,
            amount: Number(amount),
            share: share,
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
            'totalShare',
            'totalAmount',
            'block',
            'timestamp'
          ]
        }
      })
        .then(results =>
          results.map(({ id, totalShare, totalAmount, block, timestamp }) => ({
            id: id,
            totalShare: Number(totalShare),
            totalAmount: Number(totalAmount),
            block: Number(block),
            timestamp: Number(timestamp)
          }))
        )
        .catch(err => console.error(err))
    },

    userInfo({ user = undefined }) {
      return pageResults({
        api: graphAPIEndpoints.bento,
        query: {
          entity: 'users',
          selection: {
            where: {
              id: user ? `\\"${user.toLowerCase()}\\"` : undefined,
            }
          },
          properties: [
            'id',
            'lendingPairs { id, lendingPair { id, asset }, userCollateralShare, balanceOf, userBorrowFraction, transactions { id, type, lendingPair { id, asset }, token { id }, amount, share, fraction, poolPercentage, block, timestamp } }',
            'bentoData { id, token { id, totalShare, totalAmount }, share }',
            'withdrawals { id, from { id }, to, token { id }, amount, share, block, timestamp }',
            'deposits { id, from { id }, to { id }, token { id }, amount, share, block, timestamp }',
            'flashloans { id, token { id }, amount, feeAmount, block, timestamp }',
            'block',
            'timestamp'
          ]
        }
      })
        .then(results =>
          results.map(({ id, lendingPairs, bentoData, withdrawals, deposits, flashloans, block, timestamp }) => ({
            id: id,
            leandingPairs: lendingPairs.map(({ id, lendingPair, userCollateralShare, balanceOf, userBorrowFraction, transactions }) => ({
              userLendingPairId: id,
              lendingPairId: lendingPair.id,
              asset: asset,
              userCollateralShare: Number(userCollateralShare),
              balanceOf: Number(balanceOf),
              userBorrowFraction: Number(userBorrowFraction),
              transactions: transactions.map(({ id, type, lendingPair, token, amount, share, fraction, poolPercentage, block, timestamp }) => ({
                id: id,
                type: type,
                lendingPairId: lendingPair.id,
                lendingPairAsset: lendingPair.asset,
                token: token.id,
                amount: Number(amount),
                share: Number(share),
                fraction: Number(fraction),
                poolPercentage: Number(poolPercentage),
                block: Number(block),
                timestamp: Number(timestamp)
              }))
            })),
            bentoData: bentoData.map(({ id, token, share }) => ({
              id: id,
              tokenId: id,
              tokenTotalShare: Number(token.totalShare),
              tokenTotalAmount: Number(token.totalAmount),
              share: Number(share)
            })),
            withdrawals: withdrawals.map(({ id, from, to, token, amount, share, block, timestamp }) => ({
              id: id,
              from: from.id,
              to: to,
              amount: Number(amount),
              share: Number(share),
              block: Number(block),
              timestamp: Number(timestamp)
            })),
            deposits: deposits.map(({ id, from, to, token, amount, share, block, timestamp }) => ({
              id: id,
              from: from.id,
              to: to.id,
              token: token.id,
              amount: Number(amount),
              share: Number(share),
              block: Number(block),
              timestamp: Number(timestamp)
            })),
            flashloans: flashloans.map(({ id, token, amount, feeAmount, block, timestamp }) => ({
                id: id,
                token: token.id,
                amount: Number(amount),
                feeAmount: Number(feeAmount),
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
      return pageResults({
        api: graphAPIEndpoints.bento,
        query: {
          entity: 'userBentoTokenDatas',
          selection: {
            where: {
              id: user && token ?  `\\"${user.toLowerCase()}-${token.toLowerCase()}\\"` : undefined,
            }
          },
          properties: [
            'id',
            'owner { id }',
            'token { id, totalShare, totalAmount, block, timestamp }',
            'share'
          ]
        }
      })
        .then(results =>
          results.map(({ id, owner, token, share }) => ({
            id: id,
            user: owner.id,
            token: token.id,
            tokenTotalShare: Number(token.totalShare),
            tokenTotalAmount: Number(token.totalAmount),
            tokenLastBlock: Number(token.block),
            tokenLastTimestamp: Number(token.timestamp),
            userShare: Number(share)
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
