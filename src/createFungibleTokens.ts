import {
    TokenType,
    TokenCreateTransaction,
    TokenSupplyType,
} from '@hashgraph/sdk'
import { HederaUtility } from './utils/setupUtils'
import dotenv from 'dotenv'
dotenv.config()

async function createFungibleToken() {
    // Set up the client and accounts
    const hederaUtility = new HederaUtility()

    const client = hederaUtility.getClient()
    const wallets = hederaUtility.getWallets()
    const accounts = hederaUtility.getAccounts()

    // Create the token
    const tokenName = 'FungibleTest'
    const tokenSymbol = 'FNG'

    const tokenSupply = 350.5
    const tokenMaxSupply = 500

    const tokenCreateTransaction = new TokenCreateTransaction()
        .setTokenName(tokenName)
        .setTokenSymbol(tokenSymbol)
        .setTokenType(TokenType.FungibleCommon)
        .setTreasuryAccountId(wallets.myAccount.accountId)
        .setInitialSupply(tokenSupply)
        .setSupplyType(TokenSupplyType.Finite)
        .setAdminKey(wallets.myAccount.publicKey)
        .setSupplyKey(wallets.myAccount.publicKey)
        .setMaxSupply(tokenMaxSupply)
        .freezeWith(client)

    let tokenCreateSign = await tokenCreateTransaction.sign(
        accounts.myAccount.privateKey
    )

    let tokenCreateSubmit = await tokenCreateSign.execute(client)

    let receipt = await tokenCreateSubmit.getReceipt(client)

    const tokenId = receipt.tokenId

    console.log(`Token created with ID: ${tokenId}`)

    process.exit(1)
}

createFungibleToken()
