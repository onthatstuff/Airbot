const bottoneApri = document.getElementById("apri_btn");
const bottoneChiudi = document.getElementById("chiudi_btn");

bottoneApri.addEventListener("click", function() {
    bottoneApri.style.backgroundColor = "rgb(132, 247, 75)";
    bottoneChiudi.style.backgroundColor = "rgb(255, 191, 191)";
});

bottoneChiudi.addEventListener("click", function() {
    bottoneChiudi.style.backgroundColor = "rgb(247, 84, 66)";
    bottoneApri.style.backgroundColor = "rgb(166, 246, 166)";
});
