$(document).ready( function () {

	var cartList = $('#cart-list');
	var draggedElement;

	$('.item').on('dragstart', function (ev) { dragstart(ev); });
	$(cartList).on('dragover', function (ev) { dragover(ev); });
	$(cartList).on('drop', function (ev) { drop(ev); });

	function dragstart (e) {
		e.originalEvent.dataTransfer.setData("item", e.target.id);
		draggedElement = e.target;
	}

	function dragover (e) {
		e.preventDefault();
	}

	function drop (e) {

		e.preventDefault();

		var data = e.originalEvent.dataTransfer.getData("item");
		var itemInCart = $(cartList).find('#' + data);

		if(itemInCart.length) {

			if ($(draggedElement).hasClass('in-cart')) {
				console.log('changing the order - no increment');
			} else {
				console.log('multiple item - increment');
			}

		} else {

			console.log('new item');
			$(e.target).append($('#' + data).clone(true));
			$(e.target).find('#' + data).toggleClass('in-cart');
			
		}

	}

});
