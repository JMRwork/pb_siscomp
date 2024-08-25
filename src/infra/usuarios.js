import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function logarUsuario(email, senha) {
    let retorno = new Object();
    console.log(`${email}, ${senha}`);
    await signInWithEmailAndPassword(auth, email, senha)
        .then(async (credenciais) => {
            console.log(credenciais);
            retorno.id = credenciais.user.uid;
            retorno.email = email;
            const usuarioSnap = await getDoc(doc(db, 'usuarios', credenciais.user.uid));
            const usuario = usuarioSnap.data();
            retorno.isAdmin = usuario.isAdmin;
            retorno.isActive = usuario.isActive;
        })
        .catch((error) => {
            console.log(`${error.code} = ${error.message}`);
            retorno.erro = "Login Inválido";
        });
    return retorno;
}

export async function criarUsuario(email, senha) {
    let retorno = new Object();
    await createUserWithEmailAndPassword(auth, email, senha)
        .then((credenciais) => {
            console.log(credenciais);
            let user = { id: credenciais.user.uid, email: credenciais.user.email };
            retorno.id = credenciais.user.uid;
            retorno.email = email;
            retorno.senha = senha;
            geraUsuarios(user);
        })
        .catch((error) => {
            console.log(`${error.code} = ${error.message}`);
            retorno.erro = "Erro ao cadastrar";
        });
    return retorno;
}

export async function deslogarUsuario() {
    await signOut(auth);
    return { id: "", email: "", senha: "", isAdmin: "" };
}

export async function geraUsuarios(user) {
    return await setDoc(doc(db, 'usuarios', user.id), { id: user.id, email: user.email, isActive: true, isAdmin: false });
}

export async function listarUsuarios() {
    let retorno;
    await getDocs(collection(db, "usuarios"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });
    return retorno;
}

export async function alterarUsuario(usuario) {
    await setDoc(doc(db, "usuarios", usuario.id), usuario);
}