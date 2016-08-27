$(document).ready( function () {

	var cartBtn = $('#cart-btn');
	var cartList = $('#cart-list');
	var draggedElement;
	var dropPosition;

	var cartItems = [];

	$('.item').on('dragstart', function (ev) { dragstart(ev); });
	$('.item').on('dragend', function (ev) { dragend(ev); });
	$(cartBtn).on('drop', function (ev) { drop(ev); });
	$(cartList).on('drop', function (ev) { drop(ev); });

	function dragstart (e) {

		$(cartList).on('dragover', function (ev) { dragover(ev); });
		$(cartBtn).on('dragover', function (ev) { dragover(ev); });
		e.originalEvent.dataTransfer.setData("item", e.target.id);
		draggedElement = e.target;

	}

	function dragover (e) {

		e.preventDefault();

		var oldDropPosition = dropPosition;
		dropPosition = e.currentTarget;

		if ($(draggedElement).hasClass('in-cart')) {

			$(cartList).off('dragover');
			$(cartBtn).off('dragover');
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

				swapCartItems();

			} else {

				var item = $.grep(cartItems, function (e) { return e.id == $(draggedElement).attr('id') });
				
				item[0].quantity += 1;

				$('#cart-list #' + $(draggedElement).attr('id') + ' .quantity').text(item[0].quantity);

				$(cartList).show();

			}

			//IF WE HAVE A WEB SERVER THEN RUN THE PUT REQUEST
			//sendItems();

		} else {

			$(cartList).append($('#' + data).clone(true));
			$('#cart-list #' + $(draggedElement).attr('id') + ' .quantity').text('1');

			$(cartList).show();

			var element = $(cartList).find('#' + data);
			
			var itemObj = {
				id: $(element[0]).attr('id'),
				quantity: 1
			};
			
			cartItems.push(itemObj);

			$(element).toggleClass('in-cart');
			$(element).on('dragover', function (ev) { dragover(ev); });

			//IF WE HAVE A WEB SERVER THEN RUN THE PUT REQUEST
			//sendItems();

		}

	}

	function dragend (e) {

		$(e.target).removeClass('dropzone');
		$(dropPosition).removeClass('dropzone');

	}

	function swapCartItems () {

		var draggedIndex = $.map(cartItems, function(obj, index) {
			if(obj.id == $(draggedElement).attr('id')) {
				return index;
			}
		});

		var dropIndex = $.map(cartItems, function(obj, index) {
			if(obj.id == $(dropPosition).attr('id')) {
				if (draggedIndex < index) {
					return index-1;
				} else {
					return index;
				}
			}
		});

		var draggedItem = cartItems[draggedIndex[0]];

		cartItems.splice(draggedIndex[0], 1);
		cartItems.splice(dropIndex[0], 0, draggedItem);

	}

	//IF WE HAVE A WEB SERVER THEN HERE IS THE PUT REQUEST
	function sendItems () {

		var cartJsonData = JSON.stringify(cartItems);

		$.ajax({
			url: '/cart',
			type: 'PUT',
			data: cartJsonData,
			success: function (data) {
				console.log('done');
			},
			error: function (error) {
				console.log('something is wrong');
			}
		});

	}

});
