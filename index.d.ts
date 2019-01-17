declare module 'pinata-sdk' {

    export interface PinataConfig {
        apiKey: string,
        privateApiKey: string,
        apiURL: string;
    }

    export interface PinHashToIPFSResponseJS {
        ipfsHash: string
    }

    export function configure(apiKey: string, privateApiKey: string, apiURL?: string): PinataConfig;
    export function pinHashToIPFS(config: PinataConfig, hash: string): Promise<PinHashToIPFSResponseJS>
}