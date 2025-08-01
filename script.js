import { LinkedList } from './linked-list.js';
import produtosLista from './populate.js';
const container = document.getElementById("produtos");
const carrinhoBtn = document.getElementById("toggleCarrinho");
const carrinhoDiv = document.getElementById("carrinho");
const listaCarrinho = document.getElementById("listaCarrinho");
const carrinho = new LinkedList();
const FormProduto = document.getElementById("FormProduto");
FormProduto.addEventListener('submit', adicionarProduto)
FormProduto.addEventListener('submit', adicionarProduto);
function adicionarProduto(e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const preco = parseFloat(document.getElementById("preco").value);
    if (!nome || isNaN(preco)) {
        alert("Preencha corretamente o nome e o preço.");
        return;
    }
    produtosLista.append({
        id: produtosLista.lastIdPlusOne(),
        nome,
        preco,
        img: "https://via.placeholder.com/150"
    });
    document.getElementById("nome").value = "";
    document.getElementById("preco").value = "";
    container.innerHTML = "";
    renderizarProdutos();
}
function renderizarProdutos() {
    let current = produtosLista.head;
    while (current !== null) {
        const produto = current.element;
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${produto.img}" alt="${produto.nome}">
          <h3>${produto.nome}</h3>
          <p>R$ ${produto.preco.toFixed(2)}</p>
          <button data-id="${produto.id}">Adicionar ao Carrinho</button>
        `;
        container.appendChild(card);
        current = current.next;
    }
    container.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
            adicionarAoCarrinho(parseInt(btn.dataset.id));
        });
    });
}
function adicionarAoCarrinho(id) {
    const produto = produtosLista.getById(id);
    console.log(produtosLista.lastIdPlusOne())
    if (!produto) {
        console.warn("Produto não encontrado com id:", id);
        return;
    }
    carrinho.append(produto);
    atualizarCarrinho();
}
function removerDoCarrinho(id) {
    carrinho.removeById(id);
    atualizarCarrinho();
}
function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";
    let current = carrinho.head;
    while (current !== null) {
        const produto = current.element;
        if (!produto) {
            console.warn("Nó inválido encontrado no carrinho, ignorando...");
            current = current.next;
            continue;
        }
        const card = document.createElement("div");
        card.className = "card cart-card";
        card.innerHTML = `
            <img src="${produto.img}" alt="${produto.nome}" class="card-img-top" style="width:100%; height:150px; object-fit:cover;">
            <div class="card-body" style="padding: 10px;">
                <h4 class="card-title">${produto.nome}</h4>
                <p class="card-text">R$ ${produto.preco.toFixed(2)}</p>
                <button data-id="${produto.id}" class="btn btn-remove">Remover</button>
            </div>
        `;
        card.querySelector("button").addEventListener("click", () => {
            removerDoCarrinho(produto.id);
        });
        listaCarrinho.appendChild(card);
        current = current.next;
    }
}
carrinhoBtn.addEventListener("click", () => {
    carrinhoDiv.classList.toggle("hidden");
});
renderizarProdutos();
