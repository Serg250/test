window.onload = function() {


    let rat = Number.parseInt(document.getElementById("rat").textContent), rating = new MyRating("rating", rat, !0),
        a = document.querySelectorAll(".star"), cookie = rating.get_cookie();

    function jsClick() {
        let e = document.getElementById("sel"), t = Number.parseInt(e.value) / 64 * 100;
        document.getElementById("fill").style.width = t + "%", document.getElementById("num").innerHTML = t + "%", document.getElementById("num").style.right = "10px"
    }

    "yes" !== cookie ? [].forEach.call(a, function (n) {
        n.onclick = function (e) {
            if (id = document.getElementById("rating"), id.classList.contains("on")) {
                rating.newRating(n.value);
                rating.set_cookie();
                let t = Number.parseInt(document.getElementById("count").textContent);
                rating.send(n.value, t)
            }
            return !1
        }
    }) : (document.getElementById("rating").classList.remove("on"), document.getElementById("rating").classList.add("off"), rating.newRating(rat), cookie = "yes");

};