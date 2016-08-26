$(document).ready( function () {

	var cartList = $('#cart-list');
	var draggedElement;
	var dropPosition;

	$('.item').on('dragstart', function (ev) { dragstart(ev); });
	$(cartList).on('drop', function (ev) { drop(ev); });

	function dragstart (e) {

		$(cartList).on('dragover', function (ev) { dragover(ev); });
		e.originalEvent.dataTransfer.setData("item", e.target.id);
		draggedElement = e.target;

	}

	function dragover (e) {

		e.preventDefault();

		var oldDropPosition = dropPosition;
		dropPosition = e.currentTarget;

		if ($(dropPosition).hasClass('in-cart')) {

			$(cartList).off('dragover');
			$(oldDropPosition).removeClass('dropzone');
			$(dropPosition).addClass('dropzone');

		}

	}

	function drop (e) {

		e.preventDefault();

		var data = e.originalEvent.dataTransfer.getData("item");
		var itemInCart = $(cartList).find('#' + data);

		if(itemInCart.length) {

			if ($(draggedElement).hasClass('in-cart')) {

				$(draggedElement).insertBefore($(dropPosition));
				$(dropPosition).removeClass('dropzone');

			} else {
				console.log('multiple item - increment');
			}

		} else {

			$(e.target).append($('#' + data).clone(true));

			var element = $(e.target).find('#' + data);

			$(element).toggleClass('in-cart');
			$(element).on('dragover', function (ev) { dragover(ev); });

		}

	}

});
