# Hedera Playground
Basic setup to play around with hedera

## Setup
Create some testnet accounts and create the .env based on the example. The first account will assumed to be your "main" one.
The script expects at least one set to be present.

The .env entries need to follow this structure where `x` represents a number
```
ACCOUNT_ID_0x = 
PRIVATE_KEY_0x = 
PUBLIC_KEY_0x = 
```

You can access account and wallet information like this:
```typescript
import { HederaUtility } from './utils/setupUtils'


const hederaUtility = new HederaUtility()
const client = hederaUtility.getClient()
const wallets = hederaUtility.getWallets()
const accounts = hederaUtility.getAccounts()

wallets.myAccount.publicKey // first in your .env
wallets.account01.accountId

accounts.myAccount.accountId
accounts.account05.privateKey
```

## Run the script
Execute `npm run create:token:fungible` to create a fungible token
