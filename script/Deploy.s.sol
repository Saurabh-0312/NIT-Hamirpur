// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {PatientData} from "../src/Doctor.sol";

contract DeployDoctor is Script {
    PatientData public data;

    function run() public {
        vm.startBroadcast();

        data = new PatientData();

        vm.stopBroadcast();
    }
}
