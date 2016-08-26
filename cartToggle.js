$(document).ready( function () {

	var cartBtn = $('#cart-btn');
	var cartList = $('#cart-list');

	$(cartBtn).click( function (e) {

		e.preventDefault();

		$(cartList).toggle();

	});

});
