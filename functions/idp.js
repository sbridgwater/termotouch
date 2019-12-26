/* configure faunaDB Client with our secret */
const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_IDP
})

/* define encrypt/decrypt functions */
var crypto = require('crypto');
var algorithm = 'aes256';
var inputEncoding = 'utf8';
var outputEncoding = 'hex';
var key =  process.env.ENCRYPT_KEY;

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
    
  /* expects Content-Type = application/x-www-form-urlencoded */
  postdata = JSON.parse(JSON.stringify(querystring.parse(event.body)));
    
  client.query(
     q.Get(
       q.Match(q.Index('all_users'), 'simon@bridgwaters.net')
     )
  )
  .then((response) => {
    /* console.log("success", response); */
    /* Success! return the response with statusCode 200 */
    
    /* encrypt */
    console.log("Ciphering:", postdata.password, key, algorithm);
    var cipher = crypto.createCipher(algorithm, key);
    var ciphered = cipher.update(text, inputEncoding, outputEncoding);
    ciphered += cipher.final(outputEncoding);
    console.log("Result:", outputEncoding, ciphered);
    
    if (response.data.password == postdata.password)
    {
      /* jsondata = JSON.stringify(querystring.parse(event.body)); */
      jsondata="Password Matched";
      console.log(response.data.key);
    }
    else {
      jsondata="Password NOT Matched";
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
