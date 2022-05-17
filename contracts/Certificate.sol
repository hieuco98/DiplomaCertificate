pragma solidity ^ 0.4.23;
contract Certificate{

  // Mapping from user address to boolean type
  mapping(address => bool) isAuthorized;

  // Define struct
  struct Diploma {
    string _hashDiploma;
    uint _timestamp;
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
  function diplomaRegister( string hashDiploma) public onlyAdmin {

     //require(uint(_productCodeToId[hashDiploma]).length == 0);

    // require(bytes(productName).length >= 3 && bytes(productName).length <= 64);
    // require(bytes(productCode).length == 13);
    // require(bytes(rawMaterials).length >= 9);

    
    _productCodeToId[hashDiploma] = _numberOfDiplomas;
    //_productNametoId[hashDiploma] = _numberOfDiplomas;
    
    
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