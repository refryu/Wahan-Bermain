let slider = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let dots = document.querySelectorAll(".slider .dots li");

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function () {
  active = active + 1 <= lengthItems ? active + 1 : 0;
  reloadSlider();
};
prev.onclick = function () {
  active = active - 1 >= 0 ? active - 1 : lengthItems;
  reloadSlider();
};
let refreshInterval = setInterval(() => {
  next.click();
}, 3000);
function reloadSlider() {
  slider.style.left = -items[active].offsetLeft + "px";
  //
  let last_active_dot = document.querySelector(".slider .dots li.active");
  last_active_dot.classList.remove("active");
  dots[active].classList.add("active");

  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 3000);
}

dots.forEach((li, key) => {
  li.addEventListener("click", () => {
    active = key;
    reloadSlider();
  });
});
window.onresize = function (event) {
  reloadSlider();
};

document.addEventListener("DOMContentLoaded", function () {
  const contents = document.querySelectorAll(".content");

  const handleScroll = () => {
    contents.forEach((content) => {
      const contentTop = content.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (contentTop < windowHeight - 100) {
        content.classList.add("show");
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
});

window.addEventListener("scroll", function () {
  let navbar = document.getElementById("mainNav");
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    navbar.style.transition = "background-color 0.3s ease";
  } else {
    navbar.style.backgroundColor = "transparent";
  }
});

// script.js POPUP TIKET
document.addEventListener("DOMContentLoaded", function () {
  const rideSelect = document.getElementById("ride");
  const quantityInput = document.getElementById("quantity");
  const totalPriceElement = document.getElementById("total");
  const ticketForm = document.getElementById("ticket-form");
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  const closePopupButton = document.getElementById("close-popup");

  const calculateTotal = () => {
    const pricePerTicket = parseInt(rideSelect.value) || 0;
    const quantity = parseInt(quantityInput.value) || 0;
    const totalPrice = pricePerTicket * quantity;

    totalPriceElement.textContent = `Rp ${totalPrice.toLocaleString()}`;
  };

  rideSelect.addEventListener("change", calculateTotal);
  quantityInput.addEventListener("input", calculateTotal);

  ticketForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const rideName = rideSelect.options[rideSelect.selectedIndex].dataset.name;
    const quantity = quantityInput.value;
    const total = totalPriceElement.textContent;

    if (rideName && quantity > 0) {
      // Tampilkan pop-up animasi
      popupMessage.textContent = `Berhasil membeli ${quantity} tiket untuk ${rideName} dengan total ${total}`;
      popup.classList.add("show");

      // Reset form
      ticketForm.reset();
      totalPriceElement.textContent = "Rp 0";
    } else {
      alert("Mohon lengkapi pilihan wahana dan jumlah tiket.");
    }
  });

  // Tutup pop-up saat tombol "Tutup" diklik
  closePopupButton.addEventListener("click", () => {
    popup.classList.remove("show");
  });
});
