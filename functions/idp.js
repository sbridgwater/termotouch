/*
exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: "Hello, World"
  });
};
*/

/* code from functions/todos-create.js */
import faunadb from 'faunadb' /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_IDP
})

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body)
  console.log("Function `idp` invoked", data)
  const todoItem = {
    data: data
  }
  /* construct the fauna query */
  
  
  client.query(
  q.Get(q.Ref(q.Collection('termotouch'), '252467483202552331'))
)
.then((ret) => console.log(ret))
  
  
  
  return client.query(q.Get(q.Ref(q.Collection"termotouch"), '252467483202552331'))
  .then((response) => {
    console.log("success", response)
    /* Success! return the response with statusCode 200 */
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }).catch((error) => {
    console.log("error", error)
    /* Error! return the error with statusCode 400 */
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}
