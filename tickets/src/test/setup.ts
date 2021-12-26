import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from 'jsonwebtoken'

declare global {
  namespace NodeJS {
    interface Global { 
      signin(): string[];
    }
  }
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "dupa";
  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => { 
  //build jwt payload
  const payload = {
    id: 'bruh32131',
    email: 'bruh@br.uh'
  }
  //create jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!)

  //build session object
  const session = {jwt: token}

  //turn session into json 
  const sessionJSON = JSON.stringify(session)

  //take json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64')
  const res = [`express:sess=${base64}`]

  //return a string cookie + data
  return res;
};
 