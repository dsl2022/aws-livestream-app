import IVSBroadcastClient, { AmazonIVSBroadcastClient } from 'amazon-ivs-web-broadcast';

// This is a utility class to manage IVS Broadcast Client
class BroadcastClientUtil {
    private client: AmazonIVSBroadcastClient | null = null;

    constructor() {
        this.initializeClient();
    }

    private initializeClient() {
        this.client = IVSBroadcastClient.create({
            streamConfig: IVSBroadcastClient.STANDARD_LANDSCAPE,
        });
    }

    public getClient(): AmazonIVSBroadcastClient | null {
        return this.client;
    }

    // Add any other methods you need to interact with the client
    // For example, startBroadcast, stopBroadcast, etc.
}

export default BroadcastClientUtil;
