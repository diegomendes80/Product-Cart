// Seletores dos elementos do DOM
const elements = {
    addCartButtons: document.querySelectorAll('.banner__button'),
    adcCartButtons: document.querySelectorAll('.banner__button-adc'),
    cards: document.querySelectorAll('.menu__card'),
    cartEmpty: document.querySelector('.cart__empty'),
    cartSelected: document.querySelector('.cart__selected'),
    decrementButtons: document.querySelectorAll('.decrement'),
    incrementButtons: document.querySelectorAll('.increment'),
    removeItemCartButton: document.querySelectorAll('.item__remove'),
    qtdItems: document.querySelectorAll('.qtd-item'),
    titleQtd: document.querySelector('.title__qtd'),
    pratos: document.querySelectorAll('.prato'),
    descriptionPrice: document.querySelectorAll('.description__price'),
    descriptionQtd: document.querySelectorAll('.description__qtd'),
    descriptionTotal: document.querySelectorAll('.description__total'),
    precoTotal: document.querySelector('.price__number'),
    orderItems: document.querySelectorAll('.order-item'),
    qtdModal: document.querySelectorAll('.qtd-modal__numb'),
    totalItemModal: document.querySelectorAll('.item__total-modal'),
    orderTotal: document.querySelector('.order__total-value')
  };
  
  let totalGasto = 0;
  let totalItems = 0;
  
  function atualizarPrecoTotal() {
    elements.precoTotal.textContent = `$${totalGasto.toFixed(2)}`;
    elements.orderTotal.textContent = `$${totalGasto.toFixed(2)}`;
  }
  
  function updateCart(qtd, item) {
    const pratoAtual = elements.pratos[item];
    const valorUnitario = parseFloat(elements.descriptionPrice[item].textContent.replace('$', ''));
    let contadorSelecao = 0; // Contabiliza quantos itens estão sendo exibidos no carrinho
  
    if (qtd > 0) {
      pratoAtual.classList.remove('remove');
      elements.descriptionQtd[item].textContent = `${qtd}x`;
      elements.descriptionTotal[item].textContent = `$${(valorUnitario * qtd).toFixed(2)}`;
      elements.orderItems[item].style.display = "flex";
      elements.qtdModal[item].textContent = `${qtd}x`;
      elements.totalItemModal[item].textContent = `$${(valorUnitario * qtd).toFixed(2)}`;
    } else {
      pratoAtual.classList.add('remove');
      elements.descriptionQtd[item].textContent = '1x';
      elements.descriptionTotal[item].textContent = `$${valorUnitario.toFixed(2)}`;
      elements.orderItems[item].style.display = "none";
      elements.qtdModal[item].textContent = '1x';
      elements.totalItemModal[item].textContent = `$${valorUnitario.toFixed(2)}`;
    }
  
    totalGasto = 0;
    totalItems = 0;
    for (let i = 0; i < elements.pratos.length; i++) {
      if (!elements.pratos[i].classList.contains('remove')) {
        const quantidade = parseFloat(elements.descriptionQtd[i].textContent.replace('x', ''));
        const valor = parseFloat(elements.descriptionPrice[i].textContent.replace('$', ''));
        totalItems += quantidade;
        totalGasto += quantidade * valor;
        contadorSelecao++;
      }
    }
  
    if (contadorSelecao < 1) {
      elements.cartEmpty.style.display = "flex";
      elements.cartSelected.style.display = "none";
      elements.addCartButtons.forEach((button, i) => {
        elements.qtdItems[i].textContent = 1;
        button.style.display = "flex";
        elements.adcCartButtons[i].style.display = "none";
        elements.cards[i].classList.remove('selected');
      });
    } else {
      elements.cartEmpty.style.display = "none";
      elements.cartSelected.style.display = "block";
    }
  
    atualizarPrecoTotal();
    elements.titleQtd.textContent = totalItems;
  }
  
  // Função do botão de diminuir um item do carrinho
  elements.decrementButtons.forEach((button, i) => {
    button.onclick = function () {
      let valorAtual = parseInt(elements.qtdItems[i].textContent);
      valorAtual--;
      elements.qtdItems[i].textContent = valorAtual;
  
      if (valorAtual === 0) {
        elements.addCartButtons[i].style.display = "flex";
        elements.adcCartButtons[i].style.display = "none";
        elements.cards[i].classList.remove('selected');
        elements.qtdItems[i].textContent = 1;
      }
  
      updateCart(valorAtual, i);
    }
  });
  
  // Função para adicionar um item ao carrinho
  elements.incrementButtons.forEach((button, i) => {
    button.onclick = function () {
      let valorAtual = parseInt(elements.qtdItems[i].textContent);
      valorAtual++;
      elements.qtdItems[i].textContent = valorAtual;
      updateCart(valorAtual, i);
    }
  });
  
  // Função para remover o pedido do carrinho quando clicar no x
  elements.removeItemCartButton.forEach((button, i) => {
    button.onclick = function () {
      updateCart(0, i);
    }
  });
  
  // Função para mostrar os itens do carrinho ao adicionar pelo menos um
  elements.addCartButtons.forEach((button, i) => {
    button.onclick = function () {
      elements.cartEmpty.style.display = "none";
      elements.cartSelected.style.display = "block";
      button.style.display = "none";
      elements.adcCartButtons[i].style.display = "flex";
      elements.cards[i].classList.add('selected');
      updateCart(1, i);
    }
  });
  
  // Função para esconder o carrinho e acionar a janela modal de confirmação de pedido
  document.querySelector('.order__confirm').onclick = function () {
    document.querySelector('.janela-modal').style.display = "flex";
    document.querySelector('.body').style.overflow = "hidden";
  }
  
  // Função que volta tudo ao início quando clica em iniciar nova compra
  document.querySelector('.modal__new-order').onclick = function () {
    document.querySelector('.janela-modal').style.display = "none";
    elements.cartSelected.style.display = "none";
    elements.cartEmpty.style.display = "flex";
    document.querySelector('.body').style.overflow = "visible";
  
    elements.addCartButtons.forEach((button, i) => {
      elements.qtdItems[i].textContent = 1;
      button.style.display = "flex";
      elements.adcCartButtons[i].style.display = "none";
      elements.cards[i].classList.remove('selected');
      updateCart(0, i);
    });
  }
  