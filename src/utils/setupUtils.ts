import { Client, AccountId, PrivateKey, Wallet } from '@hashgraph/sdk'
import dotenv from 'dotenv'
dotenv.config()

type Account = {
    accountId: AccountId
    publicKey: string
    privateKey: PrivateKey
}

type Wallets = {
    [key: string]: Wallet
}

export class HederaUtility {
    private accountsConfig: {
        envAccountId: string
        envPublicKey: string
        envPrivateKey: string
        alias: string
    }[]

    private accounts: { [key: string]: Account } = {}
    private wallets: Wallets = {}

    constructor() {
        this.accountsConfig = Object.keys(process.env)
            .filter((envKey) => envKey.startsWith('ACCOUNT_ID'))
            .map((envKey) => {
                const accountIndex = envKey.split('_')[2]
                return {
                    envAccountId: envKey,
                    envPublicKey: `PUBLIC_KEY_${accountIndex}`,
                    envPrivateKey: `PRIVATE_KEY_${accountIndex}`,
                    alias:
                        accountIndex == '00'
                            ? 'myAccount'
                            : `account${accountIndex}`,
                }
            })
        this.accountsConfig.forEach((config) => {
            const accountId = AccountId.fromString(
                process.env[config.envAccountId]!
            )
            const publicKey = process.env[config.envPublicKey]!
            const privateKey = PrivateKey.fromString(
                process.env[config.envPrivateKey]!
            )

            if (!accountId || !publicKey || !privateKey) {
                throw new Error(
                    `Environment variables for ${config.envAccountId} must be present`
                )
            }

            const accountInfo = {
                accountId,
                publicKey,
                privateKey,
            }

            const wallet = new Wallet(accountId, privateKey)

            this.accounts[config.alias] = accountInfo
            this.wallets[config.alias] = wallet
        })
    }

    getClient() {
        const client = Client.forTestnet()
        client.setOperator(
            this.accounts.myAccount.accountId,
            this.accounts.myAccount.privateKey
        )

        return client
    }

    getWallets() {
        return this.wallets
    }

    getAccounts() {
        return this.accounts
    }
}
