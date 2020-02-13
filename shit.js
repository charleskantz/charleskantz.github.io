function extractValue(arr, key){
    let arr2 = [];
    arr2 = arr.reduce((total, amount) => {
      for(let keys in amount){
        if(amount[keys] === key){
          return total[keys];
        }
      }
    },[]);
    return arr2;
  }
  
  var arr = [
    {firstName: 'Elie', lastName: 'Schoppik'},
    {firstName: 'Matt', lastName: 'Lane', dogOwner: true},
    {firstName: 'Michael', lastName: 'Hueter'}
  ]
  
  extractValue(arr,'firstName') // ['Elie', 'Matt', 'Michael']