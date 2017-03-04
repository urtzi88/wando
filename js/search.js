$(function() {

    $('#search_form').submit(function(e) {
        e.preventDefault();
        $('#spinner').removeClass('hidden');
        var term = $('#search_term').val();
        var token = "1234567890abcd.12345678";
        $.ajax({
            url: "http://exercise.wandome.com/offer/list",
            data: {keyword: term, token: token},
            crossDomain: true,
            success: function(data) {
                loadData(data, term);
            }
        })
    });

    $('body').delegate('.pagination_link', 'click', function(e) {
        e.preventDefault();
        var term = $(this).attr('data-term');
        var token = "1234567890abcd.12345678";
        var page = $(this).attr('data-hook');
        $.ajax({
            url: "http://exercise.wandome.com/offer/list",
            data: {keyword: term, page: page, token: token},
            crossDomain: true,
            success: function(data) {
                $(window).scrollTop(0);
                loadData(data, term);
            }
        })
    })

});

function loadData(data, term) {
    $('#spinner').addClass('hidden');
    var elements = data.data.offers.list;
    $('#element_container').empty();
    for(var i = 0; i < elements.length; i++) {
        $('#element_container').append(generatehtml(elements[i]));
    }
    var elementdivs = $("#element_container .col-lg-3");
    for(var i = 0; i < elementdivs.length; i += 4) {
      elementdivs.slice(i, i+4).wrapAll('<div class="row"></div>');
    }
    $('#pagination').empty();
    $('#pagination').append(generatePagination(data.data.paginate, term));
}

function generatehtml(element) {
    var url = 'http://products-i-want.co.uk' + '/' + element.redirect_url;
    return html = '<div class="col-sm-6 col-lg-3">'
                + '<a href="' + url + '" target="_blank"><div class="wando-card">'
                + '<img class="product-img" src="' + element.photo.main_url + '">'
                + '<h3>' + element.title + '</h3>'
                + '<img class="merchant-logo" src="' + element.merchant_logo_url + '">'
                + '<img class="rating" src="img/' + Math.round(element.rating) + 'star.svg">'
                + '<p class="price">' + element.price + '</p>'
                + '<button class="btn btn-primary btn-store-link">'
                + 'Go to store <span class="glyphicon glyphicon-chevron-right"></span>'
                + '</button></div></a></div>';
}

function generatePagination(data, term) {
    var current = data.page;
    var total = data.last_page;
    var html = '<ul class="pagination">';
    for(var i = 1; i <= total; i++) {
        if(i == current) {
            html += '<li class="active"><a class="pagination_link" data-hook="' + i + '" data-term="' + term + '">' + i + '</a></li>';
        } else {
            html += '<li><a class="pagination_link" data-hook="' + i + '" data-term="' + term + '">' + i + '</a></li>';
        }
    }
    html += '</ul>';
    return html;
}
