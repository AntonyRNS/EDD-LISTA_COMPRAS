import { LinkedList } from './linked-list.js';
import produtosLista from './populate.js';

const container = document.getElementById("produtos");
const carrinhoBtn = document.getElementById("toggleCarrinho");
const carrinhoDiv = document.getElementById("carrinho");
const listaCarrinho = document.getElementById("listaCarrinho");
const carrinho = new LinkedList();

function renderizarProdutos() {
    const produtos = produtosLista.linkedListToArray();
    produtos.forEach(produto => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
      <img src="${produto.img}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button data-id="${produto.id}">Adicionar ao Carrinho</button>
    `;
        container.appendChild(card);
    });

 
    container.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
            adicionarAoCarrinho(parseInt(btn.dataset.id));
        });
    });
}


function adicionarAoCarrinho(id) {
    const produtos = produtosLista.linkedListToArray();
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        carrinho.append(produto);
        atualizarCarrinho();
    } else {
        console.warn("Produto não encontrado com id:", id);
    }
}


function removerDoCarrinho(id) {
    carrinho.removeById(id); 
    atualizarCarrinho();
}



function atualizarCarrinho() {
    const itens = carrinho.linkedListToArray();
    listaCarrinho.innerHTML = "";

    itens.forEach(produto => {
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
    });
}













carrinhoBtn.addEventListener("click", () => {
    carrinhoDiv.classList.toggle("hidden");
});
renderizarProdutos();
