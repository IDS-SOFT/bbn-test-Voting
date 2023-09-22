//SPDX-License-Identifier:GPL-3.0

pragma solidity ^0.8.0;

contract Voting {
    // Define the terms of the contract
    string public electionName;
    uint public numCandidates;

    // Define the parties involved
    address public owner;
    mapping(address => bool) public voters;

    // Define the struct for candidates
    struct Candidate {
        string name;
        uint voteCount;
    }

    // Define the array of candidates
    Candidate[] public candidates;

    // Define the constructor function
    constructor(string memory _electionName) {
        owner = msg.sender;
        electionName = _electionName;
    }

    // Define the function for adding candidates
    function addCandidate(string memory _candidateName) public {
        require(msg.sender == owner, "Only the owner can add candidates");
        candidates.push(Candidate(_candidateName, 0));
        numCandidates++;
    }

    // Define the function for authorizing voters
    function authorizeVoter(address _voterAddress) public {
        require(msg.sender == owner, "Only the owner can authorize voters");
        voters[_voterAddress] = true;
    }

    // Define the function for voting
    function vote(uint _candidateIndex) public {
        require(voters[msg.sender], "You are not authorized to vote");
        require(_candidateIndex < numCandidates, "Invalid candidate index");
        candidates[_candidateIndex].voteCount++;
        voters[msg.sender] = false;
    }

    // Define the function for checking the winning candidate
    function winningCandidate() public view returns (string memory) {
        uint winningVoteCount = 0;
        string memory winner;
        for (uint i = 0; i < numCandidates; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winner = candidates[i].name;
            }
        }
        return winner;
    }
}

