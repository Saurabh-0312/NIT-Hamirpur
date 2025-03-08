// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract PatientData {
    address public owner;

    struct Patient {
        bytes32 dataHash;
        bool exists;
    }

    mapping(address => bool) public isDoctor;
    mapping(address => Patient) public patients;

    event DoctorAdded(address doctor);
    event PatientDataAdded(address patient, bytes32 dataHash);
    event DataVerified(address doctor, address patient, bool success);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyDoctor() {
        require(isDoctor[msg.sender], "Not a doctor");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addDoctor(address _doctor, bool status) external onlyOwner {
        isDoctor[_doctor] = status;
        emit DoctorAdded(_doctor);
    }

    function addPatientData(address _patient, string calldata _jsonData) external onlyDoctor {
        require(!patients[_patient].exists, "Data already exists");
        bytes32 dataHash = keccak256(abi.encodePacked(_jsonData));
        patients[_patient] = Patient(dataHash, true);
        emit PatientDataAdded(_patient, dataHash);
    }

    function verifyPatientData(address _patient, string calldata _jsonData) external onlyDoctor {
        require(patients[_patient].exists, "Patient not found");
        require(keccak256(abi.encodePacked(_jsonData)) == patients[_patient].dataHash, "Invalid patient data");
        emit DataVerified(msg.sender, _patient, true);
    }
}
