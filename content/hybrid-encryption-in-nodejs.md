---
title: Hybrid Encryption in Node.js
description: I recently learned how to implement what is called hybrid
  encryption in Node.js.
date: 2023-10-21T18:59:10.263Z
taxonomies:
  category:
    - Blog
extra: {}
---
I don't get much exposure to encryption in my day-to-day engineering work, but learned recently how to implement what is called [hybrid encryption](https://en.wikipedia.org/wiki/Hybrid_cryptosystem) in Node.js, and wanted to jot down my learnings.

## Asymmetric encryption
Asymmetric encryption, where you have a _public key_ used to encrypt data, and a separate, _private key_ to decrypt the data, has a lot of really great advantages. It doesn't require you to share the decryption key with the other party, whilst the public key on its own can be freely shared.

One of the easy ways of doing this in Node.js is by using RSA:

```js
import crypto from "crypto";

// encrypy
const data = "Hello, world!";
const encrypted = crypto.publicEncrypt(publicKey, data).toString('hex');

// decrypt
const decrypted = crypto.privateDecrypt(privateKey, Buffer.from(encrypted, 'hex'))
```

However, this method has a big drawback: you can only encrypt as much data as the modulus length of your key allows, which usually is quite small (256 - 1024 chars).

## Symmetric encryption

Symmetric encryption algorithms don't have this limitation, by implementing all sorts of [mixing and shifting](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) operations to ensure there are less repeated blocks of bits as the amount of encrypted data increases.

They - as the name implies - operate with a single key, however.

```js
import crypto from "crypto";

// create a key and an 'initialisation vector'
let key = crypto.randomBytes(32);
let iv = crypto.randomBytes(16);

// encrypt
const data = "Hello, world!";
let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
let encrypted = cipher.update(data, "utf8", "hex");
encrypted += cipher.final("hex");

// decrypt
const decipher = crypto.createDecipheriv("aes-256-cbc", kk, iv2);
let decrypted = decipher.update(encrypted, "hex", "utf8");
decrypted += decipher.final("utf8");
```

## Hybrid encryption

To get the best of both worlds, we can combine these methods:

1. Create a random key for our AES/symmetric encryption
2. Encrypt this key using RSA/assymetric encryption with the public key 
3. Send the RSA encrypted key along with our AES encrypted data to the third party

The third party can then use their RSA private key to decrypt the AES key and use it to decrypt the actual data.

In practice, that looks something like this:

```js
const body = "Lorem ipsum dolor sit amet...";

// encrypt (given a publicKey):

let key = crypto.randomBytes(32);
let iv = crypto.randomBytes(16);

let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
let encrypted = cipher.update(body, "utf8", "hex");
encrypted += cipher.final("hex");

const data = {
  d: encrypted,
  k: crypto.publicEncrypt(publicKey, key).toString("hex"),
  i: iv.toString("hex"),
};

console.log(`Encrypted: ${JSON.stringify(data)}`);

// decrypt (given a privateKey):
 
const decryptedKey = crypto.privateDecrypt(privateKey, Buffer.from(data.k, "hex"));
const iv2 = Buffer.from(data.i, "hex");

const decipher = crypto.createDecipheriv("aes-256-cbc", decryptedKey, iv2);
let decrypted = decipher.update(data.d, "hex", "utf8");
decrypted += decipher.final("utf8");

console.log(`Decrypted: ${decrypted}`);
```

Now go forth and lock up that data! 😁