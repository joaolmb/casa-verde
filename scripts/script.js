// Mapeamento de produtos para nomes de imagens
const productImages = {
    "Alface crespa": "alface.png",
    "Cenoura 700g": "cenoura.png",
    "Cebola 360g": "cebola.png",
    "Tomate 750g": "tomate.png",
    "Batata 1kg": "batata.png",
    "Batata Doce 1kg": "batata-doce.png",
    "Repolho": "repolho.png",
    "Abóbora": "abobora.png",
    "Mandioca 1kg": "mandioca.png",
    "Pimentão": "pimentao.png",
    "Beterraba 500g": "beterraba.png",
    "Abobrinha 500g": "abobrinha.png",
    "Couve-flor": "couve-flor.png"
};

// Função para mostrar o controle de quantidade e esconder o botão "Adicionar ao Carrinho"
function showQuantityControl(productId) {
    document.getElementById(`${productId}-add-btn`).style.display = "none"; // Esconde o botão "Adicionar ao Carrinho"
    document.getElementById(`${productId}-control`).style.display = "flex"; // Mostra o controle de quantidade
}

// Função para aumentar a quantidade
function increaseQuantity(quantityId) {
    let quantityElement = document.getElementById(quantityId);
    let quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;
}

// Função para diminuir a quantidade
function decreaseQuantity(quantityId) {
    let quantityElement = document.getElementById(quantityId);
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantityElement.textContent = quantity - 1;
    }
}

// Função para mostrar a notificação
function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");

    // Oculta a notificação após 3 segundos
    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

// Função para adicionar um item ao carrinho e salvar no sessionStorage
function addToCart(productId, itemName, price) {
    const quantity = parseInt(document.getElementById(`${productId}-quantity`).textContent);

    // Obter o carrinho do sessionStorage ou inicializar como vazio
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        
        existingItem.quantity += quantity;
    } else {
        // Adicionar um novo item ao carrinho com imagem
        const image = productImages[itemName] || "default.png"; // Usa uma imagem padrão se o produto não tiver imagem mapeada
        cart.push({ name: itemName, price: price, quantity: quantity, image: image });
    }

    // Salvar o carrinho atualizado no sessionStorage
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Exibe a notificação
    showNotification(`${quantity}x ${itemName} adicionado(s) ao carrinho!`);

    document.getElementById(`${productId}-control`).style.display = "none"; // Esconde o controle de quantidade
    document.getElementById(`${productId}-add-btn`).style.display = "block"; // Mostra o botão "Adicionar ao Carrinho" novamente
}
