/* configure faunaDB Client with our secret */
const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_IDP
})

/* define encrypt/decrypt functions */
crypto = require('crypto');
algorithm = 'aes-256-cbc';
inputEncoding = 'utf8';
outputEncoding = 'utf8';
const IV_LENGTH = 16; // For AES, this is always 16
ENCRYPT_KEY =  process.env.ENCRYPT_KEY; // Must be 32 characters

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
    console.log("Ciphering:", postdata.password, ENCRYPT_KEY, algorithm);
    iv = crypto.randomBytes(IV_LENGTH);
    cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPT_KEY), iv);
    ciphered = cipher.update(postdata.password, inputEncoding, outputEncoding);
    ciphered += cipher.final(outputEncoding);
    
    
    if (response.data.password == postdata.password)
    {
      /* jsondata = JSON.stringify(querystring.parse(event.body)); */
      jsondata="Password Matched";
      console.log("Cipher Result:", outputEncoding, ciphered);
      /* console.log(response.data.key); */
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
