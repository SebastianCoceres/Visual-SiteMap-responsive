//icontains ignore letter case
jQuery.expr[':'].icontains = function (a, i, m) {
    return jQuery(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
};

//highlight each item that contains the search word displaying only the corresponding branch 
const searcher = () => {
    $('.collapse').collapse('hide');
    seachInput = $('#search').val().trim()

    if (seachInput != "") {
        console.log($('#search').val())
        let matches = $('.vsitemap ul').find('a:icontains(' + seachInput + ')');
        let parents = matches.parents('*')
        filtredParents = parents.filter('.collapse, .collapsing, .collapse.in');

        $('*').removeClass('found')
        matches.addClass('found')

        setTimeout(function () {
            filtredParents.collapse('show');
        }, 300);

        //just animation
        if (matches.length == 1) {
            $('html, body').animate({
                scrollTop: matches.offset().top - $("body").innerHeight() / 2
            }, 500);
        }

        setTimeout(checkState, 200);

    } else {
        $('*').removeClass('found')
        $('.collapse').collapse('hide');
        setTimeout(checkState, 200);
    }

    

}

const mainNode = document.querySelector(".main-node");
const opener = document.querySelectorAll(".vsitemap > ul > li > ul > li > .link-box > small .link.collapsed");
arrayOpeners = [...opener]

arrayOpeners.forEach(el => {
    el.addEventListener('click', checkState);
})

const isCollapsed = el => {
    return el.classList.contains("collapsed") ? true : false;
}

function checkState() {
    setTimeout(function () {
        if (arrayOpeners.every(isCollapsed)) {
            mainNode.classList.remove("hideCustome");
        } else if (arrayOpeners.some(isCollapsed)) {
            mainNode.classList.add("hideCustome");
        }
    }, 100);

}


//Controls
$('#showAll').click(function () {
    $('.collapse').collapse('show');
})
$('#HideAll').click(function () {
    $('.collapse').collapse('hide');
})
$(".input-group-btn").click(searcher);
$(document).on('keypress', e => e.which == 13 ? searcher() : null);