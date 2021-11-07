/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const privateDataCollection = 'PrivateData';

class ShipmentContract extends Contract {
    // ========================================================================== //
    //                      Private Data Transactions
    // ========================================================================== //

    /**
     * Check privateAsset exists or not
     * @async
     * @function privateAssetExists
     * @param {context}  ctx Contract Context
     * @param {number} privateAssetId Private Asset Id
     * @returns {boolean} Exists or not
     */
    async privateAssetExists(ctx, privateAssetId) {
        const buffer = await ctx.stub.getPrivateDataHash(
            privateDataCollection,
            privateAssetId
        );
        return !!buffer && buffer.length > 0;
    }

    /**
     * Creates a private asset
     * @async
     * @function createPrivateAsset
     * @param {context}  ctx Contract Context
     * @param {number} privateAssetId PrivateAsset Id
     * @returns Nothing
     */
    async createPrivateAsset(ctx, privateAssetId) {
        const exists = await this.privateAssetExists(ctx, privateAssetId);
        if (exists) {
            throw new Error(
                `The asset my private asset ${privateAssetId} already exists`
            );
        }
        const privateAsset = {};
        const transientData = ctx.stub.getTransient();
        if (transientData.size === 0 || !transientData.has('privateData')) {
            throw new Error(
                'The privateData key was not specified in transient data. Please try again.'
            );
        }
        privateAsset.privateData = transientData
            .get('privateData')
            .toString('utf8');
        await ctx.stub.putPrivateData(
            privateDataCollection,
            privateAssetId,
            Buffer.from(JSON.stringify(privateAsset))
        );
    }

    /**
     * Retrieve private asset
     * @async
     * @function readPrivateAsset
     * @param {context}  ctx Contract Context
     * @param {number} privateAssetId Private Asset ID
     * @returns {String} Private Data
     */
    async readPrivateAsset(ctx, privateAssetId) {
        const exists = await this.privateAssetExists(ctx, privateAssetId);
        if (!exists) {
            throw new Error(
                `The asset my private asset ${privateAssetId} does not exist`
            );
        }
        let privateDataString;
        const privateData = await ctx.stub.getPrivateData(
            privateDataCollection,
            privateAssetId
        );
        privateDataString = JSON.parse(privateData.toString());
        return privateDataString;
    }

    /**
     * Checks shipment id exist or not
     * @async
     * @function shipmentExists
     * @param {context}  ctx Contract Context
     * @param {number}  shipmentId  Shipment Id
     * @returns {boolean}  returns boolean
     */
    async shipmentExists(ctx, shipmentId) {
        const buffer = await ctx.stub.getState(shipmentId);
        return !!buffer && buffer.length > 0;
    }

    /**
     * Create Shipment data
     * @async
     * @function createShipment
     * @param {context}  ctx Contract Context
     * @param {number}  shipmentId - Shipment Id
     * @param {object}  sender - Shipment Data
     * @returns Nothing
     */
    async createShipment(ctx, shipmentId, sender) {
        const exists = await this.shipmentExists(ctx, shipmentId);
        if (exists) {
            throw new Error(`The shipment ${shipmentId} already exists`);
        }
        const shipmentTimestamp = new Date().toUTCString();
        const asset = {
            sender: { sender, shipmentTimestamp },
            approval: {},
            dispatch: {},
            arrival: {},
            receipt: {},
        };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(shipmentId, buffer);
    }

    /**
     * Retrieve Shipment data
     * @async
     * @function readShipment
     * @param {context}  ctx Contract Context
     * @param {number} shipmentId - Shipment Id
     * @returns {json} Asset
     */
    async readShipment(ctx, shipmentId) {
        const exists = await this.shipmentExists(ctx, shipmentId);
        if (!exists) {
            throw new Error(`The shipment ${shipmentId} does not exist`);
        }
        const buffer = await ctx.stub.getState(shipmentId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    /**
     * Update shipment data with new data. This feature is not using in this version, Hopefully available from version 2.x
     * @async
     * @function updateShipment
     * @param {context}  ctx Contract Context
     * @param {number} shipmentId - Shipment Id
     * @param {object} newData - Updated data of shipment
     * @returns Nothing
     */
    async updateShipment(ctx, shipmentId, newData) {
        const exists = await this.shipmentExists(ctx, shipmentId);
        if (!exists) {
            throw new Error(`The shipment ${shipmentId} does not exist`);
        }
        const newShipmentTimestamp = new Date().toUTCString();
        let asset = {
            sender: {
                sender: newData,
                shipmentTimestamp: newShipmentTimestamp,
            },
            approval: {},
            dispatch: {},
            arrival: {},
            receipt: {},
        };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(shipmentId, buffer);
    }

    /**
     * Delete shipment data. This feature is not using in this version, Hopefully available from version 2.x
     * @async
     * @function deleteShipment
     * @param {context}  ctx Contract Context
     * @param {number} shipmentId Shipment Id
     * @returns Nothing
     */
    async deleteShipment(ctx, shipmentId) {
        const exists = await this.shipmentExists(ctx, shipmentId);
        if (!exists) {
            throw new Error(`The shipment ${shipmentId} does not exist`);
        }
        await ctx.stub.deleteState(shipmentId);
    }

    // ========================================================================== //
    //                                    Customs
    // ========================================================================== //
    /**
     * Add approval data
     * @async
     * @function addApproval
     * @param {context}  ctx Contract Context
     * @param {number} shipmentId Shipment Id
     * @param {number} approvalID Approval Id
     * @param {string} approvedBy Name of approved official
     * @returns Nothing
     */
    async addApproval(ctx, shipmentId, approvalID, approvedBy) {
        // const CID = new shim.ClientIdentity(ctx.stub);
        // const mspID = CID.getMSPID();
        // logger.info(`MSPID : ${mspID}`);
        // if (mspID == 'CustomsMSP') {
        const exists = await this.shipmentExists(ctx, shipmentId);
        if (!exists) {
            throw new Error(`The shipment ${shipmentId} does not exist`);
        }
        const approvalTimestamp = new Date().toUTCString();
        const newBuffer = await ctx.stub.getState(shipmentId);
        let asset = JSON.parse(newBuffer.toString());
        asset.approval = {
            approvalID,
            approvedBy,
            approvalTimestamp,
        };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(shipmentId, buffer);
        // } else {
        //     logger.info(
        //         `Users under the following MSP : ${mspID} cannot perform this action`
        //     );
        //     return `Users under the following MSP : ${mspID} cannot perform this action`;
        // }
    }

    // ========================================================================== //
    //                                  Dispatch-Port
    // ========================================================================== //

    /**
     * Add shipment verification details
     * @async
     * @function addVerification
     * @param {context}  ctx Contract Context
     * @param {number} shipmentId Shipment Id
     * @param {number} verificationID Verification Id
     * @param {object} portData Port Details
     * @returns Nothing
     */
    async addVerification(ctx, shipmentId, verificationID, portData) {
        const exists = await this.shipmentExists(ctx, shipmentId);
        if (!exists) {
            throw new Error(`The shipment ${shipmentId} does not exist`);
        }
        const dispatchTimestamp = new Date().toUTCString();
        const newBuffer = await ctx.stub.getState(shipmentId);
        let asset = JSON.parse(newBuffer.toString());
        asset.dispatch = {
            verificationID,
            portData,
            dispatchTimestamp,
        };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(shipmentId, buffer);
    }

    // ========================================================================== //
    //                                  Arrival-Port
    // ========================================================================== //

    /**
     * Add shipment clearance details
     * @async
     * @function addClearance
     * @param {context}  ctx Contract Context
     * @param {number} shipmentId Shipment Id
     * @param {object} arrivalPortData Arrival Port Details
     * @param {object} arrivalTimestamp Arrival time details
     * @param {number} clearanceID clearance ID
     * @returns Nothing
     */
    async addClearance(
        ctx,
        shipmentId,
        arrivalPortData,
        arrivalTimestamp,
        clearanceID
    ) {
        const exists = await this.shipmentExists(ctx, shipmentId);
        if (!exists) {
            throw new Error(`The shipment ${shipmentId} does not exist`);
        }
        const clearanceTimestamp = new Date().toUTCString();
        const newBuffer = await ctx.stub.getState(shipmentId);
        let asset = JSON.parse(newBuffer.toString());
        asset.arrival = {
            arrivalPortData,
            arrivalTimestamp,
            clearanceID,
            clearanceTimestamp,
        };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(shipmentId, buffer);
    }

    // ========================================================================== //
    //                                  Receiver
    // ========================================================================== //

    /**
     * Add receipt
     * @async
     * @function addReceipt
     * @param {context}  ctx Contract Context
     * @param {number} shipmentId Shipment Id
     * @param {object} receiver Receiver Data
     * @returns Nothing
     */
    async addReceipt(ctx, shipmentId, receiver) {
        const exists = await this.shipmentExists(ctx, shipmentId);
        if (!exists) {
            throw new Error(`The shipment ${shipmentId} does not exist`);
        }
        const receiptTimestamp = new Date().toUTCString();
        const newBuffer = await ctx.stub.getState(shipmentId);
        let asset = JSON.parse(newBuffer.toString());
        asset.receipt = {
            receiver,
            receiptTimestamp,
        };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(shipmentId, buffer);
    }
}

module.exports = ShipmentContract;
