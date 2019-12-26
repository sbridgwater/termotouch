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
outputEncoding = 'hex';
const IV_LENGTH = 16; // For AES, this is always 16
ENCRYPT_KEY =  process.env.ENCRYPT_KEY; // Must be 32 characters

function encrypt(text) {
 iv = crypto.randomBytes(IV_LENGTH);
 cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPT_KEY), iv);
 encrypted = cipher.update(text);

 encrypted = Buffer.concat([encrypted, cipher.final()]);

 return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
 textParts = text.split(':');
 iv = Buffer.from(textParts.shift(), 'hex');
 encryptedText = Buffer.from(textParts.join(':'), 'hex');
 decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPT_KEY), iv);
 decrypted = decipher.update(encryptedText);

 decrypted = Buffer.concat([decrypted, decipher.final()]);

 return decrypted.toString();
}

/* end encrypt/decrypt functions */

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
    
    /* Encrypt
    text_pwd_enc = encrypt(postdata.password);
    console.log(text_pwd_enc);
    */
    
    response_data = JSON.parse(response.data);
    text_pwd_dec = decrypt(response_data.password);
    console.log(text_pwd_dec);
    
    if (response.data.password == postdata.password)
    {
      /* jsondata = JSON.stringify(querystring.parse(event.body)); */
      jsondata="Password Matched";
      
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
