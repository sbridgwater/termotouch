/* configure faunaDB Client with our secret */
const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_IDP,
  timeout: 4,
  keepAlive: true
})

/* jsonwebtoken module */
jwt = require('jsonwebtoken');

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
  user_str = postdata.user;
  console.log(postdata);
    
  client.query(
     q.Get(
       q.Match(q.Index('all_users'), user_str)
     )
  )
  .then((response) => {
    /* console.log("success", response); */
    /* Success! return the response with statusCode 200 */
    
    /* Encrypt
    text_jwt = "put_jwtkey_here";
    text_pwd_enc = encrypt(text_jwt);
    console.log("Enc_Jwt");
    console.log(text_pwd_enc);
    */ 
    
    text_pwd_enc = response.data.password;
    text_jwt_enc = response.data.key;
    console.log('Encrypted Password->',text_pwd_enc);
    console.log('Encrypted JWT key->',text_jwt_enc);
    
    text_pwd_dec = decrypt(text_pwd_enc);
    text_jwt_dec = decrypt(text_jwt_enc);
    // console.log(text_pwd_dec);
    // console.log(text_jwt_dec);
    
    
    if (text_pwd_dec == postdata.password)
    {
      /* jsondata = JSON.stringify(querystring.parse(event.body)); */
      jsondata="Password Matched";
      
      /* Generate jwt with expiration in 1 hour*/
      token = jwt.sign({
       exp: Math.floor(Date.now() / 1000) + (60 * 60),
       data: postdata.uid
      }, text_jwt_dec);
      console.log('JWT->',token);
      console.log('UUID->',response.data.uid);
      jsondata = { message: "ok", name: response.data.user, token: token, id: response.data.uid, host: response.data.host };
    }
    else {
      jsondata="Password NOT Matched";
    }
    return callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      },
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
