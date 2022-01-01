# Shipping Network

To run follow these steps:

1. Ensure that you have all of the pre-requisites installed: https://github.com/IBM-Blockchain/microfab#requirements

2. Run `docker run -p 8080:8080 -e MICROFAB_CONFIG ibmcom/ibp-microfab`


```yaml
export MICROFAB_CONFIG='{
    "endorsing_organizations":[
        {
            "name": "Shipper"
        },
        {
            "name": "Auth1"
        },
        {
            "name": "Auth2"
        }
    ],
    "channels":[
        {
            "name": "shipping",
            "endorsing_organizations":[
                "Shipper", "Auth1", "Auth2"
            ]
        }
    ]
}'
```