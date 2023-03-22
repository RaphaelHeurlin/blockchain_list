// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

contract AttendanceRegister {
    struct Student {
        string name;
        uint joiningDate;
    }

    address public teacher;
    uint rollNumber;

    event Added(string name, uint time);

    mapping(uint => Student) public registered; // roll number => student details

    modifier isTeacher() {
        require(msg.sender == teacher, "Only teacher can add student");
        _;
    }

    /**
     * @dev Constructor
     */
    constructor() {
        teacher = msg.sender;
    }

    /**
     * @dev Add student into attendance register
     * @param name Student name
     * @param joiningDate Student joining date
     */
    function add(string memory name, uint joiningDate) public isTeacher {
        Student memory s = Student(name, joiningDate);
        rollNumber++;
        registered[rollNumber] = s;
        emit Added(name, block.timestamp);
    }
}
