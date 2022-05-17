pragma solidity ^ 0.4.23;
contract Certificate2{

  // Mapping from user address to boolean type
  mapping(address => bool) isAuthorized;

  // Define struct
  struct Diploma {
    string _hashDiploma;
    uint _timestamp;
  }
   struct ScoreBoard {
    string _hashScoreBoard;
    uint _timestamp;
  }


  mapping(uint => Diploma) _Diplomas;
  mapping(uint => ScoreBoard) _ScoreBoards;


  mapping(string => uint) _productCodeToId;
  mapping(string => uint) _productBoardCodetoId;


  uint _numberOfDiplomas;
  uint _checkCount;
  uint _numberOfScoreBoards;
 

  address _admin;
  //mapping(string => address) _productCodeToBACAddress;

  // As a prerequisite for some functions
  modifier onlyAdmin {
    require(msg.sender == _admin);
    _;
  }

  modifier onlyAuthorized(address addr) {
    require(isAuthorized[addr] == true);
    _;
  }

  // Constructor function
  constructor() public {
    _admin = msg.sender;
    _numberOfDiplomas = 1;
    _numberOfScoreBoards=1;
    _checkCount=0;
  }

  // Register product information
  //diploma
  function diplomaRegister( string hashDiploma) public onlyAdmin {

     //require(uint(_productCodeToId[hashDiploma]).length == 0);



    
    _productCodeToId[hashDiploma] = _numberOfDiplomas;
    
    
    _Diplomas[_numberOfDiplomas]._hashDiploma = hashDiploma;
    _Diplomas[_numberOfDiplomas]._timestamp = now;
    _numberOfDiplomas++;

  }


  // Get the number of products
  function getNumberOfProducts() constant public returns(uint numberOfDiplomas) {
    numberOfDiplomas = _numberOfDiplomas - 1;
  }

  // Get product information by id
  function getDiplomaOfId(uint id) constant public returns(string hashDiploma,uint timestamp){


    hashDiploma = _Diplomas[id]._hashDiploma;
    timestamp =  _Diplomas[id]._timestamp;
  }

  function getIdOfCode(string diplomaCode) constant public returns(uint id) {
    id = _productCodeToId[diplomaCode];
    
  }



  // -----------------------------ScoreBoard------------------------------
  //scoreBoard




   function scoreBoardRegister( string hashScoreBoard) public onlyAdmin {

     //require(uint(_productBoardCodetoId[hashScoreBoard]).length == 0);

    
    _productBoardCodetoId[hashScoreBoard] = _numberOfScoreBoards;

    
    
    _ScoreBoards[_numberOfScoreBoards]._hashScoreBoard = hashScoreBoard;
    _ScoreBoards[_numberOfScoreBoards]._timestamp = now;
    _numberOfScoreBoards++;

  }
function checkCount() public onlyAdmin {

     //require(uint(_productBoardCodetoId[hashScoreBoard]).length == 0);
    _checkCount++;

  }

  // Get the number of products
  function getNumberOfScoreBoard() constant public returns(uint numberOfScoreBoards) {
    numberOfScoreBoards = _numberOfScoreBoards - 1;
  }
   function getNumberOfCountCheck() constant public returns(uint numberOfCountCheck) {
    numberOfCountCheck = _checkCount;
  }

  // Get product information by id
  function getScoreBoardOfId(uint id) constant public returns(string hashScoreBoard,uint timestamp){


    hashScoreBoard = _ScoreBoards[id]._hashScoreBoard;
    timestamp =  _ScoreBoards[id]._timestamp;
  }

  function getIdOfBoardScore(string ScoreBoardCode) constant public returns(uint id) {
    id = _productBoardCodetoId[ScoreBoardCode];
  }

//   function getAddressOfCode(string productCode) constant public returns(address addr) {
//     addr = _productCodeToBACAddress[productCode];
//   }

  // Add user to authorization list
  function addUser(address addr) public onlyAdmin {
    isAuthorized[addr] = true;
  }
}
