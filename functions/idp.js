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
  
  httpmethod=JSON.parse(JSON.stringify(event.httpMethod));
  
  if (httpmethod == "POST") {
  
  postdata = JSON.stringify(querystring.parse(event.body));
  console.log(postdata.password);
    
  client.query(
     q.Get(
       q.Match(q.Index('all_users'), 'simon@bridgwaters.net')
     )
  )
  .then((response) => {
    console.log("success", response);
    console.log(response.data.password);
    console.log(postdata.password);
    /* Success! return the response with statusCode 200 */
    if (response.data.password == postdata.password)
    {
      console.log(response.data.password);
      jsondata = JSON.stringify(querystring.parse(event.body));
      jsondata="Passwords Match";
    }
    else {
    /* expects Content-Type = application/x-www-form-urlencoded */
    jsondata = querystring.parse(event.body);
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
