#!/bin/bash
#
# SPDX-License-Identifier: Apache-2.0
# Author Justin J Daniel
# Date: 2022-07-30
# Description: Install dependencies for the network
# Usage: ./installDependencies.sh
# ----------------------------------------------------------------------------
#

# Welcome text for the user
echo -e "\e[1;33m"
echo "######################################################################################"
echo " ___  _   _  ____  _____   _     _      _"
echo "|_ _|| \ | |/ ___||_   _| / \   | |    | |"
echo " | | |  \| |\___ \  | |  / _ \  | |    | |"
echo " | | | |\  | ___) | | | / ___ \ | |___ | |___"
echo "|___||_| \_||____/  |_|/_/   \_\|_____||_____|"
echo ""
echo " ____   _____  ____   _____  _   _  ____   _____  _   _   ____  ___  _____  ____"
echo "|  _ \ | ____||  _ \ | ____|| \ | ||  _ \ | ____|| \ | | / ___||_ _|| ____|/ ___|"
echo "| | | ||  _|  | |_) ||  _|  |  \| || | | ||  _|  |  \| || |     | | |  _|  \___ \ "
echo "| |_| || |___ |  __/ | |___ | |\  || |_| || |___ | |\  || |___  | | | |___  ___) | "
echo "|____/ |_____||_|    |_____||_| \_||____/ |_____||_| \_| \____||___||_____||____/ "
echo ""
echo -e "\e[0m"

# install dependencies
function program_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  type $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

# check if program is installed
function echo_if {
  if [ $1 == 1 ]; then
    echo_pass $2
  else
    echo_fail $2
  fi
}

# check if program is installed then if true change the color of the output to green
function echo_pass {
  # echo first argument in green
  printf "\e[32m✔ ${1}"
  # reset colours back to normal
  printf "\033\e[0m"
}

# check if program is installed then if true change the color of the output to red
function echo_fail {
  # echo first argument in red
  printf "\e[31m✘ ${1}"
  # reset colours back to normal
  printf "\033\e[0m"
}

# installing Jq
installJq(){
    echo "Checking if jq is installed"
    local return_=1
    type jq >/dev/null 2>&1 || { local return_=0; }
    if [ $return_ -eq 0 ]; then
        printf "\e[91m✘ jq is not installed"
        echo "Installing jq"
        sudo apt install jq -y
        echo "Installed jq"
        type jq
        printf "\e[32m✔ jq installed \\n \\n"
    else 
        type jq
        printf "\e[34m✔ jq is installed, skipping... \\n \\n"
    fi
}

# installing Sponge
installSponge(){
    echo "Checking if sponge is installed"
    local return_=1
    type sponge >/dev/null 2>&1 || { local return_=0; }
    if [ $return_ -eq 0 ]; then
        printf "\e[91m✘ sponge is not installed"
        echo "Installing Sponge"
        sudo apt install moreutils -y
        echo "Installed Sponge"
        type sponge
        printf "\e[32m✔ sponge installed \\n \\n"
    else 
        type sponge
        printf "\e[34m✔ sponge is installed, skipping... \\n \\n"
    fi
}

# installing curl
installCurl(){
    echo "Checking if curl is installed"
    local return_=1
    type curl >/dev/null 2>&1 || { local return_=0; }
    if [ $return_ -eq 0 ]; then
        printf "\e[91m✘ curl is not installed"
        echo "Installing curl"
        sudo apt install curl -y
        echo "Installed curl"
        type curl
        printf "\e[32m✔ curl installed \\n \\n"
    else 
        type curl
        printf "\e[34m✔ curl is installed, skipping... \\n \\n"
    fi
}

# installing nvm
installNvm(){
    echo "Checking if nvm is installed"
    local return_=1
    type nvm --version >/dev/null 2>&1 || { local return_=0; }
    if [ $return_ -eq 0 ]; then
        printf "\e[91m✘ nvm is not installed \\n \\n"
        echo "Installing nvm"
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
        echo "Installed nvm"
        type nvm
        printf "\e[32m✔ nvm installed \\n \\n"
    else 
        type nvm
        printf "\e[34m✔ nvm is installed, skipping... \\n \\n"
    fi
}

# installing nodeJs
installNodeJs(){
    echo "Checking if node.js is installed"
    local return_0=1
    type node >/dev/null 2>&1 || { local return_0=0; }
    if [ $return_0 -eq 0 ]; then
        printf "\e[91m✘ nodejs is not installed"
        echo "Installing nodejs"
        installNvm
        sleep 1
        nvm install --lts
        echo "Installed nodejs"
        node -v
        type node
        printf "\e[32m✔ nodejs installed \\n \\n"
    else
        node -v
        type node
        printf "\e[34m✔ nodejs is installed, skipping... \\n \\n"
    fi
}

# installing npm
installNpm(){
    echo "Checking if npm is installed"
    local return_=1
    type npm >/dev/null 2>&1 || { local return_=0; }
    if [ $return_ -eq 0 ]; then
        printf "\e[91m✘ npm is not installed"
        echo "Installing npm"
        npm install -g npm
        echo "Installed npm"
        type npm
        printf "\e[32m✔ npm installed \\n \\n"
    else 
        type npm
        printf "\e[34m✔ npm is installed, skipping... \\n \\n"
    fi
}

installMinifab(){
    echo "Checking if Minifab is installed"
    local return_=1
    type minifab >/dev/null 2>&1 || { local return_=0; }
    if [ $return_ -eq 0 ]; then
        printf "\e[91m✘ Minifab is not installed"
        echo "Installing Minifab"
        curl -o minifab -sL https://tinyurl.com/yxa2q6yr && chmod +x minifab
        echo "Downloaded Minifab"
        sudo cp minifab /usr/local/bin
        echo "Installed Minifab"
        printf "\e[32m✔ Minifab installed \\n \\n"
        minifab
    else 
        type minifab
        printf "\e[34m✔ Minifab is installed, skipping... \\n \\n"
    fi
}


installDependencies(){
    installCurl
    sleep 1
    installJq
    sleep 1
    installSponge
    sleep 1
    installNodeJs
    sleep 1
    installNpm
    sleep 1
    installMinifab
    sleep 1
    echo "jq    $(echo_if $(program_is_installed jq))"
    echo "sponge    $(echo_if $(program_is_installed sponge))"
    echo "node    $(echo_if $(program_is_installed node))"
    echo "npm    $(echo_if $(program_is_installed npm))"
    echo -e "Installation Successfull !!"
    echo -e "\e[1;33m"
    echo " _____  ___  _   _  ___  ____   _   _  _____  ____ "
    echo "|  ___||_ _|| \ | ||_ _|/ ___| | | | || ____||  _ \ "
    echo "| |_    | | |  \| | | | \___ \ | |_| ||  _|  | | | | "
    echo "|  _|   | | | |\  | | |  ___) ||  _  || |___ | |_| | "
    echo "|_|    |___||_| \_||___||____/ |_| |_||_____||____/ "
    echo " "
    echo "######################################################################################"
    echo -e "\e[0m"


}

installDependencies $1
