/* configure faunaDB Client with our secret */
const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_IDP
})

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  /* parse the string body into a useable JS object */
  /* const data = JSON.parse(event.body); */
  const data = "without error";
  console.log("Function `idp` invoked", data)
  const todoItem = {
    data: data
  }
  /* construct the fauna query */
  
  /*return client.query(q.Get(q.Ref(q.Collection('termotouch'), '252467483202552331')))*/
  /*return client.query(q.Get(q.Ref(q.Match(q.Index('idp/all_users'), 'simon.bridgwater@yahoo.it'))))*/
  
  client.query(
    q.Get(
       q.Match(q.Index('all_users'), 'simon@bridgwaters.net')
      )
  )
  .then((response) => {
    console.log("success", response)
    /* Success! return the response with statusCode 200 */
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response).password
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
