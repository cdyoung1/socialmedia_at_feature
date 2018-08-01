let  unsortedList=[],nameList=[],filteredList=[];
let sortedName,tempName, tempIndex,personA, personB,cursorIndex, searchIndex, textString, searchString, spaceCount, tempString,isSearching=false,stringTest, listLength, searchBody, personSearched, person, firstName, lastName, personPix, tableItem;
$.ajax({
  url: 'https://randomuser.me/api/?results=5000&inc=name,picture',
  dataType: 'json',
  success: function(data) {
    unsortedList=data.results;
    unsortedList.forEach(function(item,index){
      tempName = '';
      tempIndex = index;
      tempName += unsortedList[tempIndex].name.first + unsortedList[tempIndex].name.last;
      tempName.toUpperCase();
      sortedName = {
        name: tempName,
        index: tempIndex
      }
      nameList.push(sortedName);
    })    
    nameList.sort(function(a,b){
      personA = a.name;
      personB = b.name;
      if(personA>personB)
        return 1;
      else if (personA<personB)
        return -1;
      else
        return 0;
    })
    console.log(nameList);
  }
});
$(function(){
  searchBody = $('#search-body');
});
function generatePersonItem(person){
  return `<tr>
  <td class="person-thumbnail"><img src="${person.pix}" /></td>
  <td class="person-name">${person.first} ${person.last}</td>
  </tr>
  `;
}
$('#content').on('keyup',function(e){
  cursorIndex = $('#content').prop('selectionStart');
  textString = $('#content').val();
  for(let i = cursorIndex-1; i>0;i--){
    if(textString.charAt(i)=='@'){
      searchIndex=i;
      break;
    }
  }
  if(textString.includes('@')){
    searchString = textString.slice(searchIndex, cursorIndex);
    searchString = searchString.toLowerCase();
  } else{
    searchString = '';
  }
  spaceCount=0;
  for(let i = 0; i<searchString.length;i++){
    if(searchString.charAt(i)==' '){
      spaceCount++;
    } 
  }
  console.log(spaceCount);
  if(spaceCount<=1){
    isSearching=true;
    tempString = searchString.slice(1,searchString.length);
    tempString = tempString.toLowerCase();
    tempString = tempString.replace(' ','');
  }
  //keypress parts
  if(event.which==13 ){
    console.log(tempString);
    isSearching=false;
  }
  searchBody.empty();
  if(isSearching==true && tempString.length>0){
    filteredList=[];
    nameList.forEach(function(item,index){
      let tempItem = item.name;
      tempIndex = item.index;
      if(tempItem.indexOf(tempString)==0){
        let tempMatch = {
          name: tempItem,
          index: tempIndex
        };
        filteredList.push(tempMatch);
      }
    })
    listLength = (filteredList.length>4) ? 4 : filteredList.length;
    for(let i = 0;i<listLength;i++){
      personSearched = unsortedList[filteredList[i].index];
      firstName = personSearched.name.first;
      firstName.charAt(0).toUpperCase();
      lastName = personSearched.name.last;
      lastName.charAt(0).toUpperCase();
      personPix = personSearched.picture.thumbnail;
      person = {
        first : firstName,
        last : lastName,
        pix : personPix
      }
      tableItem = generatePersonItem(person);
      searchBody.append(tableItem);
    }
  }
});


