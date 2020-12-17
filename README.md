# bento-data

## Current Queries Supported

```javascript
import bentoData from '@sushiswap/bento-data';

bentoData.bento
    .info()
    .then(info => console.log(info))

  bentoData.bento
    .masterContractApproval()
    .then(approvals => console.log(approvals))

  bentoData.bento
    .lendingPairs()
    .then(pairs => console.log(pairs))

  bentoData.bento
    .deposits()
    .then(deposits => console.log(deposits))

  bentoData.bento
    .withdrawals()
    .then(withdrawals => console.log(withdrawals))

  bentoData.bento
    .tokens()
    .then(tokens => console.log(tokens))

  bentoData.bento
    .userInfo("0x4f65e6157b6083b1121552c288ad938e394f144a")
    .then(user => console.log(user))

```
