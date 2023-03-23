// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract AttendanceRegister {
    string[] presentStudents;

    /**
     * @dev Constructor
     */
    constructor() {
        presentStudents = new string[](30);
    }

    /**
     * @dev Get all students present in the class
     * @return Array of student names
     */
    function get() public view returns (string[] memory) {
        return presentStudents;
    }

    /**
     * @dev Add student into attendance register
     * @param name Student name
     */
    function add(string memory name) public {
        presentStudents.push(name);
    }

    function reset() public {
        presentStudents = new string[](30);
    }
}
