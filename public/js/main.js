document.addEventListener("DOMContentLoaded", function () {
    var $grid = $(".container-canvas").isotope({
        itemSelector: ".modal__graphic__canvas",
        layoutMode: "masonry",
        percentPosition: true,
        masonry: {
            columnWidth: ".modal__graphic__canvas",
        },
    })

    $grid.isotope("layout")
})