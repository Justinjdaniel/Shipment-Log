#!/bin/bash
#
# SPDX-License-Identifier: Apache-2.0
# Author Justin J Daniel
# Date: 2022-08-01
# Description: Script to start the network
# Usage: ./startNetwork.sh
# ----------------------------------------------------------------------------
#

# Welcome text for the user
echo -e "\e[1;33m"
echo "######################################################################################"
echo "  ____  _____   _     ____  _____  ___  _   _   ____ "
echo " / ___||_   _| / \   |  _ \|_   _||_ _|| \ | | / ___| "
echo " \___ \  | |  / _ \  | |_) | | |   | | |  \| || |  _ "
echo "  ___) | | | / ___ \ |  _ <  | |   | | | |\  || |_| | "
echo " |____/  |_|/_/   \_\|_| \_\ |_|  |___||_| \_| \____| "
echo "" 
echo "  _   _  _____  _____ __        __ ___   ____   _  __ "
echo " | \ | || ____||_   _|\ \      / // _ \ |  _ \ | |/ / "
echo " |  \| ||  _|    | |   \ \ /\ / /| | | || |_) || ' / "
echo " | |\  || |___   | |    \ V  V / | |_| ||  _ < | . \ "
echo " |_| \_||_____|  |_|     \_/\_/   \___/ |_| \_\|_|\_\ "
echo ""
echo -e "\e[0m"

# show the text in the terminal in green
printf "\e[32m"
echo "Bootstrapping ......."
echo -e "\e[0m"
# setup a couchdb database for the network
minifab netup -s couchdb -e true -o auth.shipping.com

sleep 5

# Show the text in the terminal in blue
echo -e "\e[1;34m"
echo "Creating channel"
echo -e "\e[0m"

# Create the channel
# ref: https://hyperledger.github.io/minifabric/latest/network/create-channel.html
# details: channel name = shipping
minifab create -c shipping

sleep 2

# Show the text in the terminal in magenta
echo -e "\e[1;35m"
echo "Joining channel"
echo -e "\e[0m"

# Join the channel
minifab join -c shipping

sleep 2

# Show the text in the terminal in cyan
echo -e "\e[1;36m"
echo "Anchor Update"
echo -e "\e[0m"

# Anchor the channel
minifab anchorupdate

sleep 2


echo -e "\e[1;33m"
echo "  _   _  _____  _____ __        __ ___   ____   _  __ "
echo " | \ | || ____||_   _|\ \      / // _ \ |  _ \ | |/ / "
echo " |  \| ||  _|    | |   \ \ /\ / /| | | || |_) || ' / "
echo " | |\  || |___   | |    \ V  V / | |_| ||  _ < | . \ "
echo " |_| \_||_____|  |_|     \_/\_/   \___/ |_| \_\|_|\_\ "
echo ""
echo "  ____   _____  _____  _   _  ____ "
echo " / ___| | ____||_   _|| | | ||  _ \ "
echo " \___ \ |  _|    | |  | | | || |_) | "
echo "  ___) || |___   | |  | |_| ||  __/ "
echo " |____/ |_____|  |_|   \___/ |_| "
echo "" 
echo "   ____  ___   __  __  ____   _      _____  _____  _____ "
echo "  / ___|/ _ \ |  \/  ||  _ \ | |    | ____||_   _|| ____| "
echo " | |   | | | || |\/| || |_) || |    |  _|    | |  |  _| "
echo " | |___| |_| || |  | ||  __/ | |___ | |___   | |  | |___ "
echo "  \____|\___/ |_|  |_||_|    |_____||_____|  |_|  |_____| "
echo ""
echo "######################################################################################"
echo -e "\e[0m"

echo "Generating Required Materials"
# Generate the required materials
minifab profilegen -c shipping
