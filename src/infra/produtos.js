import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function inserirProduto(novoProdutos) {
    const docRef = await addDoc(collection(db, "produtos"), novoProdutos);
    return docRef.id;
}

export async function listarProdutos() {
    let retorno;
    await getDocs(collection(db, "produtos"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });
    return retorno;
}

export async function obterProduto(id) {
    const docRef = doc(db, "produtos", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export async function excluirProduto(id) {
    await deleteDoc(doc(db, "produtos", id));
}

export async function alterarProduto(Produtos) {
    await setDoc(doc(db, "produtos", Produtos.id), Produtos);
}