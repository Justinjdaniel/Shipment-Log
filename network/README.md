# Shipping Network

To run this Ansible playbook, follow these steps:

1. Ensure that you have all of the pre-requisites installed: https://github.com/IBM-Blockchain/ansible-role-blockchain-platform-manager#requirements

2. Install all required roles, including the `ibm.blockchain_platform_manager` role, from Ansible Galaxy:

    `ansible-galaxy install -r requirements.yml --force`


3. Run the Ansible playbook:

    `ansible-playbook shipping.yml`

4. Information on the available nodes (peers, orderers, and certificate authorities) will be created under the `nodes` subdirectory.

    1. If you wish to use this network for development purposes, you can import these JSON files into a Fabric Environment using the IBM Blockchain Platform extension for Visual Studio Code.

        For more information on this task, follow the process to create a new Fabric Environment documented here: https://github.com/IBM-Blockchain/blockchain-vscode-extension#connecting-to-another-instance-of-hyperledger-fabric

    2. If you are using the IBM Blockchain Platform on IBM Cloud, you do not need to import these JSON files. All of the nodes will already be present in your web console.

5. The `wallets` subdirectory will contain all of the identities (certificates and private keys) enrolled by this playbook. You must be careful to persist all of these files for the next time you run this playbook, otherwise you will be unable to administer your IBM Blockchain Platform network.

    1. If you wish to use this network for development purposes, you can import these JSON files into a wallet using the IBM Blockchain Platform extension for Visual Studio Code.

        For more information on this task, follow the process to create a new Fabric Environment documented here: https://github.com/IBM-Blockchain/blockchain-vscode-extension#connecting-to-another-instance-of-hyperledger-fabric

    2. If you are using the IBM Blockchain Platform on IBM Cloud, you do need to import these JSON files into your wallet using the web console. You will then need to associate each node with the correct identity. If you do not do this, then you will be unable to administer the nodes using the web console.



```yaml
---
- name: Deploy Blockchain Integration In Freight Shipping Infrastructure
  hosts: localhost
  vars:
    # Configuration for the target infrastructure.
    infrastructure:

      type: docker
      # Docker specific configuration.
      docker:
        # The name of the Docker network to use for all containers.
        network: shipping
    # The list of organizations.
    organizations:
      # The organization Shipper.
      - &Shipper
        # MSP configuration for this organization.
        msp:
          # The unique ID of this MSP.
          id: "ShipperMSP"
          # The admin identity and secret to register and enroll for this MSP.
          # This user will be registered on the CA specified for this organization,
          # and used as the administrator for the MSP, and any peers or orderers
          # that belong to this organization.
          admin:
            identity: "senderAdmin"
            secret: "senderAdminpw"
          # IBM Blockchain Platform on IBM Cloud specific configuration.
          ibp:
            # The display name of this MSP.
            display_name: "Shipper MSP"
        # CA configuration for this organization.
        ca: &ShipperCA
          # The unique ID of this CA.
          id: "ShipperCA"
          # The default admin identity and secret to set for this CA.
          admin_identity: "admin"
          admin_secret: "adminpw"
          # TLS configuration for this CA.
          tls:
            # Should TLS be enabled for this CA?
            enabled: false
          # Docker specific configuration.
          docker:
            # The name to use for this Docker container and associated Docker volumes.
            name: ca.shipper.shipping.com
            # The hostname to use for this Docker container.
            hostname: ca.shipper.shipping.com
            # The external port to use for this Docker container.
            port: 18050
          # IBM Blockchain Platform on IBM Cloud specific configuration.
          ibp:
            # The display name of this CA.
            display_name: "Shipper CA"
        # The list of peers for this organization.
        peers:
          # First peer for this organization.
          - &ShipperPeer1
            # The unique ID of this peer.
            id: "ShipperPeer1"
            # The identity and secret to register and enroll for this peer.
            # This user will be registered on the CA specified for this organization,
            # and will be used as the peers identity.
            identity: "senderPeer1"
            secret: "senderPeer1pw"
            # The database type to use to store this peers world state and private data
            database_type: leveldb
            # TLS configuration for this peer.
            tls:
              # Should TLS be enabled for this peer?
              enabled: false
              identity: "senderpeer1tls"
              secret: "senderpeer1tlspw"
            # Docker specific configuration.
            docker:
              # The name to use for this Docker container and associated Docker volumes.
              name: peer0.shipper.shipping.com
              # The hostname to use for this Docker container.
              hostname: peer0.shipper.shipping.com
              # The external request port to use for this Docker container.
              port: 18051
              # The external chaincode port to use for this Docker container.
              chaincode_port: 18052
              # The external operations port to use for this Docker container.
              operations_port: 18053
            # IBM Blockchain Platform on IBM Cloud specific configuration.
            ibp:
              # The display name of this peer.
              display_name: "Shipper Peer1"
        # The directory to store generated JSON files for each CA, peer, and orderer in this organization.
        nodes: "{{ playbook_dir }}/nodes/Shipper"
        # The directory to store all identities (certificate and private key pairs) for this organization.
        wallet: "{{ playbook_dir }}/wallets/Shipper"
        # The directory to store all gateways for this organization.
        gateways: "{{ playbook_dir }}/gateways/Shipper"

      - &Auth1
        msp:
          id: 'Auth1MSP'
          admin:
            identity: 'Auth1Admin'
            secret: 'Auth1Adminpw'
          ibp:
            display_name: 'Auth1 MSP'
        ca: &Auth1CA
          id: 'Auth1CA'
          admin_identity: 'admin'
          admin_secret: 'adminpw'
          tls:
            enabled: false
          docker:
            name: ca.Auth1.shipping.com
            hostname: ca.Auth1.shipping.com
            port: 21050
          ibp:
            display_name: 'Auth1 CA'

        peers:
          - &Auth1Peer1
            id: 'Auth1Peer1'
            identity: 'Auth1Peer1'
            secret: 'Auth1Peer1'
            database_type: leveldb
            tls:
              enabled: false
              identity: 'Auth1peer1tls'
              secret: 'Auth1peer1tlspw'
            docker:
              name: peer0.Auth1.shipping.com
              hostname: peer0.Auth1.shipping.com
              port: 21051
              chaincode_port: 21052
              operations_port: 21053
            ibp:
              display_name: 'Auth1 Peer1'

        nodes: '{{ playbook_dir }}/nodes/Auth1'
        wallet: '{{ playbook_dir }}/wallets/Auth1'
        gateways: '{{ playbook_dir }}/gateways/Auth1'

      - &Auth2
        msp:
          id: 'Auth2MSP'
          admin:
            identity: 'auth2Admin'
            secret: 'auth2Adminpw'
          ibp:
            display_name: 'Auth2 MSP'
        ca: &Auth2CA
          id: 'Auth2CA'
          admin_identity: 'admin'
          admin_secret: 'adminpw'
          tls:
            enabled: false
          docker:
            name: ca.auth2.shipping.com
            hostname: ca.auth2.shipping.com
            port: 22050
          ibp:
            display_name: 'Auth2 CA'

        peers:
          - &Auth2Peer1
            id: 'Auth2Peer1'
            identity: 'auth2Peer1'
            secret: 'auth2Peer1'
            database_type: leveldb
            tls:
              enabled: false
              identity: 'auth2peer1tls'
              secret: 'auth2peer1tlspw'
            docker:
              name: peer0.auth2.shipping.com
              hostname: peer0.auth2.shipping.com
              port: 22051
              chaincode_port: 22052
              operations_port: 22053
            ibp:
              display_name: 'Auth2 Peer1'

        nodes: '{{ playbook_dir }}/nodes/Auth2'
        wallet: '{{ playbook_dir }}/wallets/Auth2'
        gateways: '{{ playbook_dir }}/gateways/Auth2'



      # The organization that manages the ordering service.
      - &OrdererOrg
        # MSP configuration for this organization.
        msp:
          # The unique ID of this MSP.
          id: "OrdererMSP"
          # The admin identity and secret to register and enroll for this MSP.
          # This user will be registered on the CA specified for this organization,
          # and used as the administrator for the MSP, and any peers or orderers
          # that belong to this organization.
          admin:
            identity: "ordererAdmin"
            secret: "ordererAdminpw"
          # IBM Blockchain Platform on IBM Cloud specific configuration.
          ibp:
            display_name: "Orderer MSP"
        # CA configuration for this organization.
        ca: &OrdererCA
          # The unique ID of this CA.
          id: "OrdererCA"
          # The default admin identity and secret to set for this CA.
          admin_identity: "admin"
          admin_secret: "adminpw"
          # TLS configuration for this CA.
          tls:
            # Should TLS be enabled for this CA?
            enabled: false
          # Docker specific configuration.
          docker:
            # The name to use for this Docker container and associated Docker volumes.
            name: ca.orderer.shipping.com
            # The hostname to use for this Docker container.
            hostname: ca.orderer.shipping.com
            # The external port to use for this Docker container.
            port: 17050
          # IBM Blockchain Platform on IBM Cloud specific configuration.
          ibp:
            # The display name of this CA.
            display_name: "Orderer CA"
        # Orderer configuration for this organization.
        orderer: &Orderer
          # The unique ID of this orderer.
          id: "Orderer1"
          # The identity and secret to register and enroll for this orderer.
          # This user will be registered on the CA specified for this organization,
          # and will be used as the orderers identity.
          identity: "orderer1"
          secret: "orderer1pw"
          # TLS configuration for this orderer.
          tls:
            # Should TLS be enabled for this orderer?
            enabled: false
            # The TLS identity and secret to register and enroll for this orderer.
            # This user will be registered on the CA specified for this organization,
            # and will be used as the orderers TLS identity.
            identity: "orderer1tls"
            secret: "orderer1tlspw"
          # Consortium configuration for this orderer.
          consortium:
            # The list of consortium members.
            members:
              # Reference to the organization Shipper.
              - *Shipper
              - *Auth1
              - *Auth2
          # Docker specific configuration.
          docker:
            # The name to use for this Docker container and associated Docker volumes.
            name: orderer.shipping.com
            # The hostname to use for this Docker container.
            hostname: orderer.shipping.com
            # The external port to use for this Docker container.
            port: 17051
            # The external operations port to use for this Docker container.
            operations_port: 17052
          # IBM Blockchain Platform on IBM Cloud specific configuration.
          ibp:
            # The display name of this orderer.
            display_name: "Orderer1"
            # The cluster name of this orderer.
            cluster_name: "OrdererCluster"
        # The directory to store generated JSON files for each CA, peer, and orderer in this organization.
        nodes: "{{ playbook_dir }}/nodes/Orderer"
        # The directory to store all identities (certificate and private key pairs) for this organization.
        wallet: "{{ playbook_dir }}/wallets/Orderer"
        # The directory to store all gateways for this organization.
        gateways: "{{ playbook_dir }}/gateways/Orderer"
    # The list of channels.
    channels:
      # The channel Shipping.
      - &Shipping
        # The name of the channel.
        name: shipping
        # The orderer to use for this channel.
        orderer: *Orderer
        # The list of channel members.
        members:
          # Reference to the organization Shipper.
          - <<: *Shipper
            # The list of committing peers for this organization.
            committing_peers:
              # Reference to the first peer for this organization.
              - *ShipperPeer1
            # The list of anchor peers for this organization.
            anchor_peers:
              # Reference to the first peer for this organization.
              - *ShipperPeer1
          - <<: *Auth1
            committing_peers:
              - *Auth1Peer1
            anchor_peers:
              - *Auth1Peer1
          - <<: *Auth2
            committing_peers:
              - *Auth2Peer1
            anchor_peers:
              - *Auth2Peer1

    # The list of gateways.
    gateways:
      # The gateway Shipper gateway.
      - name: Shipper gateway
        # The organization that owns the gateway.
        organization:
          # Reference to the organization Shipper.
          <<: *Shipper
          # The list of gateway peers for this organization.
          gateway_peers:
            # Reference to the first peer for this organization.
            - *ShipperPeer1
      - name: Auth1 gateway
        organization:
          <<: *Auth1
          gateway_peers:
            - <<: *Auth1Peer1
      - name: Auth2 gateway
        organization:
          <<: *Auth2
          gateway_peers:
            - <<: *Auth2Peer1
  roles:
    - ibm.blockchain_platform_manager
```