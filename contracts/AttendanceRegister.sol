// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract AttendanceRegister {
    struct Student {
        string name;
        uint joiningDate;
    }

    string[] presentStudents;

    mapping(uint => Student) public registered; // roll number => student details

    /**
     * @dev Constructor
     */
    constructor() {
        presentStudents = [];
    }

    /**
     * @dev Add student into attendance register
     * @param name Student name
     * @param joiningDate Student joining date
     */
    function add(string memory name, uint joiningDate) public {
        Student memory s = Student(name, joiningDate);
        rollNumber++;
        registered[rollNumber] = s;
        emit Added(name, block.timestamp);
    }
}
