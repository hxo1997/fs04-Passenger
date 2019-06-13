const _= require("lodash");

const obj = {}
console.log("TCL: Object.keys(obj).length" , Object.keys(obj).length === 0)

console.log("check empty with lodash: ", _.isEmpty(obj))

let obj2 = {}
//obj2 = result
const id = obj2.content && obj2.content.attribute && obj2.content.attribute.id;
console.log(id)

console.log("lay id voi lodash: ", _.get(obj2, "conttent.attributes.id"));

_.set(obj2, "content.attributes.id", "2")