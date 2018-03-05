const fs = require('fs')

const fetchMembers = () => {
  try {
    const members = JSON.parse(fs.readFileSync('./data/members.json'));
    return members;
  } catch (e) {
    return [];
  }
}

const storeMembers = (members) => {
  fs.writeFileSync('./data/members.json', JSON.stringify(members));
}

const add = (member) => {
  console.log('adding a member');
  console.log(member);
  const members = fetchMembers();
  //console.log(members);
  const duplicateMember = members.filter(({mobile}) => mobile === member.mobile);
  if(duplicateMember.length === 0){
    members.push(member);
    storeMembers(members);
  }

  return duplicateMember.length === 0 ;
}

const remove = (todo) => {
  const members = fetchmembers();
  const filteredmembers = members.filter(({title}) => title !== todo.title);
  storemembers(filteredmembers);
  return members.length !== filteredmembers.length
}

const list = () => {
  const members = fetchMembers();
  console.log(`Prininting ${members.length} members(s).`)
  //members.map((todo)=>log(todo));
  return members;
}

const read = (search) => {
  const members = fetchmembers();

  return(members.filter( todo => search.title === todo.title )[0])
}

const log = (todo) => {
  console.log('--');
  console.log('Todo: ',todo.title);
  console.log('Body: ', todo.body);
}


module.exports = {
  add,
  remove,
  list,
  read,
  log
}
