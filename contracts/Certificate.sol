pragma solidity ^ 0.4.23;
contract Certificate{

  // Mapping from user address to boolean type
  mapping(address => bool) isAuthorized;

  // Define struct
  struct Diploma {
    string _nameStudent;
    string _nameSchool;
    string _nameDiploma;
    string _yearStart;
    string _urlDiploma;
    string _hashDiploma;
    string _diplomaCode;
    string _urlScoreBoard;
  }


  mapping(uint => Diploma) _Diplomas;


  mapping(string => uint) _productCodeToId;
  mapping(string => uint) _productNametoId;


  uint _numberOfDiplomas;
 

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
  }

  // Register product information
  function diplomaRegister(string nameStudent, string nameSchool,string nameDiploma, string yearStart,string urlDiploma,string hashDiploma,string diplomaCode,string urlScoreBoard) public onlyAdmin {

    // require(bytes(_productCodeToName[productCode]).length == 0);

    // require(bytes(productName).length >= 3 && bytes(productName).length <= 64);
    // require(bytes(productCode).length == 13);
    // require(bytes(rawMaterials).length >= 9);

    
    _productCodeToId[diplomaCode] = _numberOfDiplomas;
    _productNametoId[hashDiploma] = _numberOfDiplomas;
    
    _Diplomas[_numberOfDiplomas]._nameStudent = nameStudent;
    _Diplomas[_numberOfDiplomas]._nameSchool = nameSchool;
    _Diplomas[_numberOfDiplomas]._nameDiploma = nameDiploma;
    _Diplomas[_numberOfDiplomas]._yearStart = yearStart;
    _Diplomas[_numberOfDiplomas]._urlDiploma = urlDiploma;
    _Diplomas[_numberOfDiplomas]._hashDiploma = hashDiploma;
    _Diplomas[_numberOfDiplomas]._diplomaCode = diplomaCode;
     _Diplomas[_numberOfDiplomas]._urlScoreBoard = urlScoreBoard;
    _numberOfDiplomas++;

  }

  // Register raw material information
//   function materialRegister(string materialName, string materialCode, address BACAddress) public onlyAdmin {

//     require(bytes(_productCodeToName[materialCode]).length == 0);

//     require(bytes(materialName).length >= 3 && bytes(materialName).length <= 64);
//     require(bytes(materialCode).length == 9);

//     _productCodeToName[materialCode] = materialName;
//     _productCodeToId[materialCode] = _numberOfProducts;
//     _productCodeToBACAddress[materialCode] = BACAddress;

//     _products[_numberOfProducts]._productName = materialName;
//     _products[_numberOfProducts]._productCode = materialCode;
//     _products[_numberOfProducts]._rawMaterials = "/";
//     _products[_numberOfProducts]._productOwner = msg.sender;
//     _products[_numberOfProducts]._timestamp = now;
//     _products[_numberOfProducts]._BACAddress = BACAddress;

//     _numberOfProducts++;

//   }

  // Get the number of products
 

  // Get product information by id
  function getDiplomaOfId(uint id) constant public returns(string nameStudent, string nameSchool, string nameDiploma, string yearStart, string urlDiploma,string diplomaCode,string urlScoreBoard){

    nameStudent = _Diplomas[id]._nameStudent;
    nameSchool = _Diplomas[id]._nameSchool;
    nameDiploma = _Diplomas[id]._nameDiploma;
    yearStart = _Diplomas[id]._yearStart;
    urlDiploma = _Diplomas[id]._urlDiploma;
    diplomaCode = _Diplomas[id]._diplomaCode;
    urlScoreBoard = _Diplomas[id]._urlScoreBoard;
  }

  function getIdOfCode(string diplomaCode) constant public returns(uint id) {
    id = _productCodeToId[diplomaCode];
  }
  function getIdOfName(string hashDiploma) constant public returns(uint id)
  {
    id = _productNametoId[hashDiploma];
  }

//   function getAddressOfCode(string productCode) constant public returns(address addr) {
//     addr = _productCodeToBACAddress[productCode];
//   }

  // Add user to authorization list
  function addUser(address addr) public onlyAdmin {
    isAuthorized[addr] = true;
  }

  // Remove user
  function removeUser(address addr) public onlyAdmin {
    isAuthorized[addr] = false;
  }

  // Check if the user is authorized
  function checkUser(address addr) constant public returns(bool result) {
    result = isAuthorized[addr];
  }

  // Destroy the contract
  function deleteContract() public onlyAdmin {
    selfdestruct(_admin);
  }

}