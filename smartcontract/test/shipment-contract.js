/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { ShipmentContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {
    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon
                .stub()
                .returns(
                    sinon.createStubInstance(winston.createLogger().constructor)
                ),
            setLevel: sinon.stub(),
        };
    }
}

describe('ShipmentContract', () => {
    let contract;
    let ctx;

    beforeEach(() => {
        contract = new ShipmentContract();
        ctx = new TestContext();
        ctx.stub.getState
            .withArgs('1001')
            .resolves(
                Buffer.from(
                    '{"sender":{"sender":"Shipment 1001 data","shipmentTimestamp":"1624197368215"}}'
                )
            );
        ctx.stub.getState
            .withArgs('1002')
            .resolves(
                Buffer.from(
                    '{"sender":{"sender":"Shipment 1002 data","shipmentTimestamp":"1624197368215"}}'
                )
            );
    });

    describe('#shipmentExists', () => {
        it('should return true for a shipment', async () => {
            await contract.shipmentExists(ctx, '1001').should.eventually.be
                .true;
        });

        it('should return false for a shipment that does not exist', async () => {
            await contract.shipmentExists(ctx, '1003').should.eventually.be
                .false;
        });
    });

    describe('#createShipment', () => {
        it('should create a shipment', async () => {
            await contract.createShipment(ctx, '1003', 'Shipment 1003 data');
            const timestamp = new Date().toUTCString();
            ctx.stub.putState.should.have.been.calledOnceWithExactly(
                '1003',
                Buffer.from(
                    `{"sender":{"sender":"Shipment 1003 data","shipmentTimestamp":"${timestamp}"},"approval":{},"dispatch":{},"arrival":{},"receipt":{}}`
                )
            );
        });

        it('should throw an error for a Shipment that already exists', async () => {
            await contract
                .createShipment(ctx, '1001', 'data')
                .should.be.rejectedWith('The shipment 1001 already exists');
        });
    });

    describe('#readShipment', () => {
        it('should return a Shipment', async () => {
            await contract
                .readShipment(ctx, '1001')
                .should.eventually.deep.equal({
                    sender: {
                        sender: 'Shipment 1001 data',
                        shipmentTimestamp: '1624197368215',
                    },
                });
        });

        it('should throw an error for a Shipment that does not exist', async () => {
            await contract
                .readShipment(ctx, '1003')
                .should.be.rejectedWith('The shipment 1003 does not exist');
        });
    });

    describe('#updateShipment', () => {
        it('should update a Shipment', async () => {
            await contract.updateShipment(
                ctx,
                '1001',
                'Shipment 1001 new data'
            );
            const timestamp = new Date().toUTCString();
            ctx.stub.putState.should.have.been.calledOnceWithExactly(
                '1001',
                Buffer.from(
                    `{"sender":{"sender":"Shipment 1001 new data","shipmentTimestamp":"${timestamp}"},"approval":{},"dispatch":{},"arrival":{},"receipt":{}}`
                )
            );
        });

        it('should throw an error for a shipping that does not exist', async () => {
            await contract
                .updateShipment(ctx, '1003', 'Shipment 1003 new data')
                .should.be.rejectedWith('The shipment 1003 does not exist');
        });
    });

    describe('#deleteShipment', () => {
        it('should delete a Shipment', async () => {
            await contract.deleteShipment(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a Shipment that does not exist', async () => {
            await contract
                .deleteShipment(ctx, '1003')
                .should.be.rejectedWith('The shipment 1003 does not exist');
        });
    });

    describe('#addApproval', () => {
        it('should add shipment Approval', async () => {
            await contract.addApproval(ctx, '1001', '101', 'John Doe');
            const timestamp = new Date().toUTCString();
            ctx.stub.putState.should.have.been.calledOnceWithExactly(
                '1001',
                Buffer.from(
                    `{"sender":{"sender":"Shipment 1001 data","shipmentTimestamp":"1624197368215"},"approval":{"approvalID":"101","approvedBy":"John Doe","approvalTimestamp":"${timestamp}"}}`
                )
            );
        });

        it('should throw an error for a shipping that does not exist', async () => {
            await contract
                .addApproval(ctx, '1003', '101', 'John Doe')
                .should.be.rejectedWith('The shipment 1003 does not exist');
        });
    });

    describe('#addVerification', () => {
        it('should add shipment Verification', async () => {
            await contract.addVerification(ctx, '1001', '101', 'Data');
            const timestamp = new Date().toUTCString();
            ctx.stub.putState.should.have.been.calledOnceWithExactly(
                '1001',
                Buffer.from(
                    `{"sender":{"sender":"Shipment 1001 data","shipmentTimestamp":"1624197368215"},"dispatch":{"verificationID":"101","portData":"Data","dispatchTimestamp":"${timestamp}"}}`
                )
            );
        });

        it('should throw an error for a shipping that does not exist', async () => {
            await contract
                .addVerification(ctx, '1003', '101', 'Data')
                .should.be.rejectedWith('The shipment 1003 does not exist');
        });
    });

    describe('#addClearance', () => {
        it('should add shipment Clearance', async () => {
            await contract.addClearance(ctx, '1001', 'portData', 'time', '101');
            const timestamp = new Date().toUTCString();
            ctx.stub.putState.should.have.been.calledOnceWithExactly(
                '1001',
                Buffer.from(
                    `{"sender":{"sender":"Shipment 1001 data","shipmentTimestamp":"1624197368215"},"arrival":{"arrivalPortData":"portData","arrivalTimestamp":"time","clearanceID":"101","clearanceTimestamp":"${timestamp}"}}`
                )
            );
        });

        it('should throw an error for a shipping that does not exist', async () => {
            await contract
                .addClearance(ctx, '1003', 'portData', 'time', '101')
                .should.be.rejectedWith('The shipment 1003 does not exist');
        });
    });

    describe('#addReceipt', () => {
        it('should add shipment Receipt', async () => {
            await contract.addReceipt(ctx, '1001', 'Data');
            const timestamp = new Date().toUTCString();
            ctx.stub.putState.should.have.been.calledOnceWithExactly(
                '1001',
                Buffer.from(
                    `{"sender":{"sender":"Shipment 1001 data","shipmentTimestamp":"1624197368215"},"receipt":{"receiver":"Data","receiptTimestamp":"${timestamp}"}}`
                )
            );
        });

        it('should throw an error for a shipping that does not exist', async () => {
            await contract
                .addReceipt(ctx, '1003', 'Data')
                .should.be.rejectedWith('The shipment 1003 does not exist');
        });
    });
});
