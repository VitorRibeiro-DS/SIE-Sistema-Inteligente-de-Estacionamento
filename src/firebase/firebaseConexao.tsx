import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
 apiKey: "AIzaSyC5DxW1B1EeVNUFou9QZ64Q2qKsLXtkdEo",
  authDomain: "sie-01.firebaseapp.com",
  databaseURL: "https://sie-01-default-rtdb.firebaseio.com",
  projectId: "sie-01",
  storageBucket: "sie-01.firebasestorage.app",
  messagingSenderId: "700612652059",
  appId: "1:700612652059:web:c4cbd0e420d1fd4ddb1cbe",
  measurementId: "G-B2Q4K2M0BH"
};

const conexao = initializeApp(firebaseConfig)

const autenticacao = getAuth(conexao)
const bancoDados = getFirestore(conexao)

export {conexao, autenticacao, bancoDados}