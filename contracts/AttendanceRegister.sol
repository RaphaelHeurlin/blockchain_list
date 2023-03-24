// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract AttendanceRegister {
    string[] presentStudents;
    uint[] dates;

    /**
     * @dev Constructor
     */
    constructor() {
        presentStudents = new string[](30);
        dates = new uint[](30);
    }

    /**
     * @dev Get all students present in the class
     * @return Array of student names
     */
    function getNames() public view returns (string[] memory) {
        return presentStudents;
    }

    /**
     * @dev Get all dates when the class was held
     * @return Array of dates
     */
    function getDates() public view returns (uint[] memory) {
        return dates;
    }

    /**
     * @dev Add student into attendance register
     * @param name Student name
     */
    function add(string memory name) public {
        presentStudents.push(name);
        dates.push(block.timestamp);
    }

    /**
     * @dev Reset the attendance register
     */
    function reset() public {
        presentStudents = new string[](30);
        dates = new uint[](30);
    }
}
