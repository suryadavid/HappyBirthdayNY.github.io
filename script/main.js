window.addEventListener("load", () => {
  showInputPopup();
});

function showInputPopup() {
  Swal.fire({
    title: "Kalau mau lanjut, masukkan nama orang spesial 🎶💗",
    html: `
      <p>Jangan lupa juga masukkan tanggal pentingnya ✨</p>
      <input type="text" id="swal-name" class="swal2-input" placeholder="Nama">
      <input type="text" id="swal-date" class="swal2-input" placeholder="Tanggal">
    `,
    showCancelButton: true,
    confirmButtonColor: "#ff69b4",
    cancelButtonColor: "#d1d1d1",
    confirmButtonText: "Putar sekarang 💕",
    cancelButtonText: "Nanti dulu 🤍",
    backdrop: "rgba(255,182,193,0.35)",
    allowOutsideClick: false,
    allowEscapeKey: false,
    preConfirm: () => {
      const name = document.getElementById("swal-name").value.trim();
      const date = document.getElementById("swal-date").value.trim();
      if (!name || !date) {
        Swal.showValidationMessage("Nama dan tanggal harus diisi woy!! 😡😡😡");
        return false;
      }
      return { name, date };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const { name, date } = result.value;
      const correctName = "Naila Oxandiya";
      const correctDate = "23 Desember 2002";

      if (name === correctName && date === correctDate) {
        // kedua benar → jalankan animasi
        const song = document.querySelector(".song");
        if (song) {
          song.volume = 0.6;
          song.play().catch(() => {});
        }
        animationTimeline();
      } else {
        // validasi masing-masing
        let message = "";
        if (name !== correctName && date !== correctDate) {
          message = "Apaaa coba dua duanya salah siapaaa kamu 😏😏😏";
        } else if (name === correctName && date !== correctDate) {
          message = "Ayooo coba lagi ahahahahaha 😜😜😜";
        } else if (name !== correctName && date === correctDate) {
          message = "Dih masa gak tau 😏😏😏";
        }

        Swal.fire({
          title: "Ups!",
          html: message,
          icon: "warning",
          confirmButtonText: "Coba lagi 💡",
          backdrop: "rgba(255,182,193,0.35)",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(() => {
          showInputPopup(); // kembali ke input
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "JIAH PAYAHHHHHHH BANGET",
        text: "Segitu doang nyerah????",
        icon: "info",
        confirmButtonText: "Coba lagi 💡",
        backdrop: "rgba(255,182,193,0.35)",
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then(() => {
        showInputPopup();
      });
    }
  });
}

// Animation timeline
const animationTimeline = () => {
  const textBox = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  const text = textBox.innerHTML;
  textBox.innerHTML = "";

  [...text].forEach(char => {
    if (char === "\n") {
      textBox.innerHTML += "<br>";
    } else {
      textBox.innerHTML += `<span style="visibility:hidden">${char}</span>`;
    }
  });

  hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;

  const ideaTextIn = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
  const ideaTextOut = { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" };

  const tl = new TimelineMax();

  tl.to(".container", 0.6, { visibility: "visible" })
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .from(".two", 0.4, { opacity: 0, y: 10 })
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=3.5")
    .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
    .from(".three", 0.7, { opacity: 0, y: 10 })
    .to(".three", 0.7, { opacity: 0, y: 10 }, "+=3")
    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
    .staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.06)
    .to(".fake-btn", 0.2, { backgroundColor: "#ff8acb" }, "+=3")
    .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=1")
    .from(".idea-1", 0.7, ideaTextIn)
    .to(".idea-1", 0.7, ideaTextOut, "+=2.5")
    .from(".idea-2", 0.7, ideaTextIn)
    .to(".idea-2", 0.7, ideaTextOut, "+=2.5")
    .from(".idea-3", 0.7, ideaTextIn)
    .to(".idea-3 strong", 0.5, { scale: 1.2, backgroundColor: "#ff69b4", color: "#fff" })
    .to(".idea-3", 0.7, ideaTextOut, "+=2.5")
    .from(".idea-4", 0.7, ideaTextIn)
    .to(".idea-4", 0.7, ideaTextOut, "+=2.5")
    .from(".idea-5", 0.7, { rotationX: 15, rotationZ: -10, y: 50, opacity: 0 }, "+=1")
    .to(".idea-5 span", 0.7, { rotation: 90, x: 8 }, "+=1")
    .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2")
    .staggerFrom(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: 15, ease: Expo.easeOut }, 0.2)
    .staggerTo(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: -15 }, 0.2, "+=1.5")
    .staggerFromTo(".baloons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)
    .from(".profile-picture", 0.5, { scale: 3, opacity: 0, rotationZ: -45 }, "-=2")
    .from(".hat", 0.5, { x: -100, y: 300, rotation: -180, opacity: 0 })
    .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, ease: Elastic.easeOut.config(1, 0.5) }, 0.1)
    .staggerFromTo(".wish-hbd span", 0.7, { scale: 1.4 }, { scale: 1, color: "#ff69b4" }, 0.1, "party")
    .from(".wish h5", 0.5, { opacity: 0, y: 10 }, "party")
    .staggerTo(".eight svg", 1.5, { visibility: "visible", opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.4 }, 0.3)
    .to(".six", 0.5, { opacity: 0, y: 30, zIndex: -1 })
    .staggerFrom(".nine p", 1, ideaTextIn, 1.2)
    .to(".last-smile", 0.5, { rotation: 90 }, "+=1");

  document.getElementById("replay").addEventListener("click", () => {
    tl.restart();
  });
};
