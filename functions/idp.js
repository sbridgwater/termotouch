/* configure faunaDB Client with our secret */
const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_IDP
})

const querystring = require("querystring");

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  const data = JSON.parse(JSON.stringify(event.httpMethod))
  /* const data = querystring.parse(event); */
  console.log("Function `idp` invoked by method ", data)
  const todoItem = {
    data: data
  }
  
  /* construct the fauna query */
  
  /*return client.query(q.Get(q.Ref(q.Collection('termotouch'), '252467483202552331')))*/
  /*return client.query(q.Get(q.Ref(q.Match(q.Index('idp/all_users'), 'simon.bridgwater@yahoo.it'))))*/
  
  httpmethod=JSON.parse(JSON.stringify(event.httpMethod));
  
  if (httpmethod == "GET") {
  
  client.query(
     q.Get(
       q.Match(q.Index('all_users'), 'simon@bridgwaters.net')
     )
  )
  .then((response) => {
    console.log("success", response)
    /* Success! return the response with statusCode 200 */
    if (response.data.password == "simon3210")
    {
    jsondata=response.data
    }
    else {
    jsondata=JSON.parse(JSON.stringify(event.httpMethod))
    }
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(jsondata)
    })
  }).catch((error) => {
    console.log("error", error)
    /* Error! return the error with statusCode 400 */
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
  } /* end httpmethod POST section */
  else /* NOT Allowed */
  {
   return callback(null, {
      statusCode: 200,
      body: JSON.stringify("Method Not Allowed")
   })
  }
}
