// ページが読み込まれたらアニメーションを発動 //

window.addEventListener("DOMContentLoaded", () => {
    //1.ファーストビュー内の要素はページ読み込み時に順番に表示
    const fadeElements = document.querySelectorAll(".fv .fade-up");
    fadeElements.forEach((el,index) => {
        // 少しタイミングをずらして表示させる //
        setTimeout(() => {
            el.classList.add("is-active");
        },index * 200); //0.2秒ずつずらす//
    });

//2.スクロールして見えてくる要素は画面内に入ったら表示
const scrollElements = document.querySelectorAll("section:not(.fv) .fade-up");

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-active");
            observer.unobserve(entry.target); //一度表示されたら監視終了//
        }
    });
},{
    rootMargin:"0px 0px -80px 0px" //画面下部から80px手前で発動//
});
scrollElements.forEach(element => {
    observer.observe(element);
});



//3.スムーススクロール（＃から始まるリンクをクリックしたときの動き）//
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach(link => {
    link.addEventListener("click", (e) =>{
        e.preventDefault();//通常のパッと切り替わる挙動をキャンセル//
        const href =link.getAttribute("href");
        const targetElement = href ==="#"|| href === "" ? document.documentElement : document.querySelector(href);

        if(targetElement) {
            targetElement.scrollIntoView({
                behavior:"smooth"//滑らかに移動//
            });
        }
     });
    });
});